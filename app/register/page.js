"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("🎉 Registration successful. Please login.");
      router.push("/login");
    } else {
      toast.error(data.error || "❌ Something went wrong.");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg border">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        ✨ Create Your Account
      </h1>

      <form onSubmit={handlSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
            👤 Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

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
            placeholder="Create a password"
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
          📝 Register
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </main>
  );
}
