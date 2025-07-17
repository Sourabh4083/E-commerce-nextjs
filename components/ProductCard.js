"use client";

import { formateCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="group bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-1 duration-300">
        <div className="relative h-56 w-full">
          <Image
            src={product.image}
            alt={product.name || product.title || "Product image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h3>
          <p className="text-blue-600 font-bold text-xl mt-1">
            {formateCurrency(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
