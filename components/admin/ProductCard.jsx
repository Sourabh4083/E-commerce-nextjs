"use client";

import Link from "next/link";
import Image from "next/image";
import { formateCurrency } from "@/utils/formatCurrency";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/products/${product._id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Product deleted");
                window.location.reload();
            } else {
                toast.error("Failed to delete product");
            }
        } catch (err) {
            toast.error("Error deleting product");
            console.error(err);
        }
    };

    return (
        <div className="border rounded p-4 shadow">
            {product.image && product.image !== "" ? (
                <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover rounded mb-2"
                />
            ) : (
                <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center rounded mb-2">
                    <span className="text-gray-400">No Image</span>
                </div>
            )}

            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-400">{formateCurrency(product.price)}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>

            <div className="mt-3 flex gap-2">
                <Link href={`/admin/manage-products/edit/${product._id}`} className="text-blue-600">✏️ Edit</Link>
                <button onClick={handleDelete} className="text-red-600 ml-2">🗑 Delete</button>
            </div>
        </div>
    );
}
