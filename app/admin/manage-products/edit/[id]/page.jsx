import ProductForm from "@/components/admin/ProductForm";
import { dbConnect } from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function EditProductPage({ params }) {
    const { id } = await params

    await dbConnect()

    const product = await Product.findById(id).lean()

    if (!product) {
        return <p>Product not found</p>
    }

    const formattedProduct = {
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt?.toISOString?.(),
        updatedAt: product.createdAt?.toISOString?.()
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <ProductForm product={formattedProduct} />
        </div>
    )
}