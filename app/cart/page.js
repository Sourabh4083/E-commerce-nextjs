"use client";
import { useCart } from "@/context/CartContext";
import { formateCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItem, removeFromCart, totalItem } = useCart();

  const subtotal = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          🛒 Your Cart
        </h1>

        {cartItem.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul className="space-y-6">
              {cartItem.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        Total: {formateCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 font-medium hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Subtotal & Checkout */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-2xl font-bold text-gray-800">
                Subtotal: {formateCurrency(subtotal)}
              </p>

              <Link
                href="/checkout"
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition-all"
              >
                Proceed to Checkout →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
