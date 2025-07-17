"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { refreshUser } = useCart();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      console.warn("No JSON returned");
    }

    if (res.ok) {
      toast.success("✅ Login successful!");
      await refreshUser();
      router.push(redirectPath);
    } else {
      toast.error(data.error || "❌ Invalid credentials");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg border">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        👋 Welcome Back!
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            📧 Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            🔒 Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          🔐 Login
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </main>
  );
}
