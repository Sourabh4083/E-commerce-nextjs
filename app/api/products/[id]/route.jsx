import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {
    await dbConnect()
    const data = await req.json()

    try {
        const updated = await Product.findByIdAndUpdate(params.id, data, {
            new: true
        })

        if (!updated) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Product updates", product: updated })
    } catch (err) {
        console.error("update error:", err)
        return NextResponse.json({ error: "Failed to update product" }, {status: 500})
    }
}

export async function DELETE(req, { params }) {
    await dbConnect()

    try {
        const deleted = await Product.findByIdAndDelete(params.id)
        if (!deleted) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Product deleted"})
    } catch (err) {
        console.error("Delete error:", err)
        return NextResponse.json({ error: "Failed to delete"}, { status: 500})
    }
} 

