import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  
    const orders = await Order.create({ user: user._id })
      .sort({ createdAt: -1 })
      .lean();

    const serializedOrders = orders.map((order) => ({
      ...order,
      createdAt: order.createdAt?.toISOString() || null,
    }));

    return NextResponse.json({ orders: serializedOrders });
  } catch (err) {
    console.error("❌ MyOrders API Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
