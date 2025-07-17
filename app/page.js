"use client"

import products from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react"


export default function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      const data = await res.json()
      if (res.ok) setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen px-4 sm:px-8 py-10 bg-gradient-to-b from-white to-gray-100">
      <h1 className="text-black text-4xl md:text-5xl font-extrabold mb-10 text-center">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
