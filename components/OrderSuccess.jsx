"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function OrderSuccessPage() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("id")

    return (
           <main className="p-8 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
            <p className="text-gray-400 mb-6">
                Thank you for your purchase. We'll send you an email your order details shortly.
            </p>
            <p>Youe Order ID: <strong>{orderId || "Not Found"}</strong></p>

            <Link href="/">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                    Continue Shopping
                </button>
            </Link>
        </main>
    )

}