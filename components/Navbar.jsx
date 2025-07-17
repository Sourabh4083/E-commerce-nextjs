"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { LogOut, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { totalItem, logout, user } = useCart();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white text-black shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Left Logo */}
      <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
        🛒 ShopMate
      </Link>

      {/* Right Links */}
      <div className="flex items-center gap-6 text-sm md:text-base">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        {user?.role === "admin" && (
          <>
            <Link href="/admin" className="hover:text-blue-600 transition">
              Admin Dashboard
            </Link>
            <Link href="/admin/manage-products" className="hover:text-blue-600 transition">
              Manage Products
            </Link>
            <Link href="/admin/orders" className="hover:text-blue-600 transition">
              View Orders
            </Link>
          </>
        )}

        {user ? (
          <>
            <span className="text-gray-600 hidden md:inline">Welcome, <span className="font-semibold">{user.name}</span></span>
            <Link href="/my-orders" className="hover:text-blue-600 transition">
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-600 transition">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-600 transition">
              Register
            </Link>
          </>
        )}

        <Link href="/cart" className="relative hover:text-blue-600 transition">
          <ShoppingCart className="w-6 h-6" />
          {totalItem > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {totalItem}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
