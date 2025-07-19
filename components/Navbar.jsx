"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { LogOut, ShoppingCart, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Navbar() {
  const { totalItem, logout, user } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white text-black shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
          🛒 ShopMate
        </Link>

        
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      
        <div className="hidden md:flex items-center gap-6 text-sm md:text-base">
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
              <span className="text-gray-600 hidden md:inline">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
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
      </div>

      
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm">
          <Link href="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          {user?.role === "admin" && (
            <>
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                Admin Dashboard
              </Link>
              <Link href="/admin/manage-products" onClick={() => setIsOpen(false)}>
                Manage Products
              </Link>
              <Link href="/admin/orders" onClick={() => setIsOpen(false)}>
                View Orders
              </Link>
            </>
          )}

          {user ? (
            <>
              <span className="text-gray-600">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
              <Link href="/my-orders" onClick={() => setIsOpen(false)}>
                My Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-1 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}

          <Link href="/cart" onClick={() => setIsOpen(false)} className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalItem > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {totalItem}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
