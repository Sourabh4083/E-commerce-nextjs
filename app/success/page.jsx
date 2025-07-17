"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl text-center animate-fade-in">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4 animate-ping-once" />
        <h1 className="text-3xl font-extrabold text-green-600 mb-2">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. A confirmation email has been sent to you with your order details.
        </p>

        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md">
            🛍️ Continue Shopping
          </button>
        </Link>
      </div>
    </main>
  );
}
