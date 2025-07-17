import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { amount } = body;


        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await instance.orders.create({
            amount: amount * 100, 
            currency: "INR",
            receipt: "receipt_order_" + Math.random(),
        });

        
        return NextResponse.json(order);
    } catch (err) {
        console.error("❌ Razorpay Error (full):", err); 
        return NextResponse.json(
            { error: "Failed to create Razorpay order", details: err.message || err },
            { status: 500 }
        );
    }
}
