import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";
import Cart from "@/models/Cart";


export async function POST(request) {
  try {
    await dbConnect();
    const user = await getCurrentUser(); 

    

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { cartItem, userInfo, totalAmount, paymentInfo } = body;

    const paymentStatus = paymentInfo?.razorpay_payment_id ? "paid" : "unpaid";

    if (!cartItem || cartItem.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    
    const formattedCart = cartItem.map((item) => ({
      product: item._id,         
      title: item.title,         
      price: item.price,         
      image: item.image,         
      quantity: item.quantity    
    }));

    
    


    const newOrder = await Order.create({
      user: user.id, 
      cartItem: formattedCart,
      userInfo,
      totalAmount,
      paymentStatus,
      createdAt: new Date(),
    });

    await Cart.deleteOne({ user: user._id})

    return NextResponse.json({ message: "Order saved", orderId: newOrder._id });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
