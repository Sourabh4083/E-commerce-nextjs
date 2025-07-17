import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";


export async function POST(req) {
    try {
        const body = await req.json()
    
        const newProduct = {
            title: body.title,
            price: Number(body.price),
            image: body.image,
            category: body.category,
            stock: Number(body.stock || 0)

        }
        await dbConnect()

        const savedProduct = await Product.create(newProduct)

        return NextResponse.json({ message: "Product saved successfully", product: savedProduct })

    } catch (err) {
        console.error("Error saving product:", err)
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
    }
}

export async function GET() {
    await dbConnect()

    const products = await Product.find().sort({ createdAt: -1 })
    return new Response(JSON.stringify(products), { status: 200 })
}