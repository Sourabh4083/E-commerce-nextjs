"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ProductForm({ product }) {
  const router = useRouter();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || "",
    image: product?.image || "",
    stock: product?.stock || "",
    category: product?.category || "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formDataUpload,
    });

    const data = await res.json();

    if (data.url) {
      setFormData((prev) => ({ ...prev, image: data.url }));
    } else {
      alert("Image upload failed");
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      product?._id
        ? `/api/products/${product._id}`
        : "/api/products",
      {
        method: product?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (res.ok) {
      alert(product?._id ? "Product updated" : "Product created");
      router.push("/admin/manage-products");
    } else {
      alert("Failed to submit product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white p-6 rounded-lg shadow text-black">
      <h2 className="text-xl font-bold mb-4">
        {product?._id ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />

      <input
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded"
      />

      <div>
        {formData.image && formData.image.trim() !== "" ? (
          <img
            src={formData.image}
            alt={formData.title || "Product image"}
            className="w-40 h-40 object-cover mx-auto rounded mb-2"
          />
        ) : (
          <p className="text-gray-500 mb-2">No image selected</p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          hidden
        />

        <button
          type="button"
          onClick={handleImageSelect}
          className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600 transition"
        >
          {uploading ? "Uploading..." : "Browse Image"}
        </button>
        <span className="ml-4 text-gray-600 text-sm">Please upload under 1MB</span>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {product?._id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
