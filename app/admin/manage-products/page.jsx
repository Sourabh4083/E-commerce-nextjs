import ProductCard from "@/components/admin/ProductCard" 
import { dbConnect } from "@/lib/dbConnect"
import Product from "@/models/Product"
import Link from "next/link"
import ProductForm from "@/components/admin/ProductForm"

export default async function ManageProductsPage() {
    await dbConnect()
    const rawProducts = await Product.find().lean()

    const products = rawProducts.map((p) => ({
        _id: p._id.toString(),
        title: p.title || "",
        price: p.price || 0,
        image: p.image || "",
        category: p.category || "Uncategorized",
        stock: p.stock ?? 0,
        createdAt: p.createdAt?.toISOString?.() || "",
        updatedAt: p.updatedAt?.toISOString?.() || "",
    }))

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

            <Link href="/admin/manage-products/add" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 inline-block mb-4">➕ Add New Product</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            
        </div>
    )
}
