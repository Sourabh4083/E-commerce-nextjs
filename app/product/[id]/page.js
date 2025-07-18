"use client"

import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formateCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";

export default function ProductDetail(props) {
    const params = use(props.params)
    const router = useRouter()
    const [products, setProducts] = useState([])
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("/api/products")
            const data = await res.json()
            if (res.ok) setProducts(data)
        }
        fetchProducts()
    }, [])


    const product = products.find((item) => item._id === params.id)

    if (!product) return <div className="p-8">Product not found.</div>


    const handleBuyNow = () => {
        addToCart({ ...product, quantity: 1 })
        router.push("/checkout")
    }


    return (
         <main className="p-6 sm:p-8 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img
            src={product.image}
            alt={product.name || product.title}
            className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {product.title}
          </h1>
          <p className="text-2xl text-blue-600 font-semibold">
            {formateCurrency(product.price)}
          </p>

          <p className="text-gray-700 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
            tempora repellat dolores illum corrupti, a pariatur.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all text-center"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all text-center"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
    )
}