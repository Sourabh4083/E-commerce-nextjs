import ProductForm from "@/components/admin/ProductForm";


export default function AddProductPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
            <ProductForm />
        </div>
    )
}