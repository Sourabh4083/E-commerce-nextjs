import { getCurrentUser } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import "@/models/User";
import "@/models/Product"


export async function GET(req) {
    await dbConnect()
    const user = await getCurrentUser()
    


    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const cart = await Cart.findOne({ user: user.id })
        .populate("cartItem", "title price")
        .lean()

    return NextResponse.json({ cart: cart || { cartItem: [] } }, { status: 200 })
}




export async function POST(req) {
    await dbConnect()
    const user = await getCurrentUser(req)
    

 if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    const body = await req.json()
    const { items } = body

    if (!items || items.length === 0)
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 })

    const updateCart = await Cart.findOneAndUpdate(
        { user: user.id },
        { cartItem: items },
        { upsert: true, new: true }
    )

    
    return NextResponse.json({ message: "Cart saved", cart: updateCart })
}



export async function DELETE(req) {
    await dbConnect()
    const user = await getCurrentUser()

    if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized"}, {status: 401})
    }

    await Cart.findOneAndUpdate(
        {user: user.id},
        {cartItem: [] }
    )

    return NextResponse.json({message: "Cart cleared"}, { status: 200})

}
