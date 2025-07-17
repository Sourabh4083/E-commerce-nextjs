"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formateCurrency } from "@/utils/formatCurrency";

export default function CheckoutPage() {
  const { cartItem, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/current-user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setForm((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
        }));
      }
    };
    fetchUser();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subTotal = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!form.name || !form.email || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay script");
      return;
    }

    const razorpayRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: subTotal }),
    });

    const razorpayData = await razorpayRes.json();
    if (!razorpayRes.ok) {
      alert("Failed to create Razorpay order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: razorpayData.amount,
      currency: "INR",
      name: "ShopMate",
      description: "Order Payment",
      order_id: razorpayData.id,
      handler: async function (response) {
        const saveOrderRes = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItem,
            totalAmount: subTotal,
            paymentInfo: response,
            userInfo: {
              name: form.name,
              email: form.email,
              address: form.address,
            },
          }),
        });

        const saveOrderData = await saveOrderRes.json();

        if (saveOrderRes.ok) {
          await fetch("/api/cart", {
            method: "DELETE",
          });
          clearCart();
          router.push(`/order-success?id=${saveOrderData.orderId}`);
        } else {
          alert("Order failed to save: " + saveOrderData.error);
        }
      },
      prefill: {
        name: form.name,
        email: form.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main className="p-6 sm:p-8 max-w-5xl mx-auto min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-black font-semibold mb-4">🧾 Order Summary</h2>

          {cartItem.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItem.map((item) => (
                <li key={item._id} className="flex justify-between text-gray-800">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>{formateCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          )}

          <hr className="my-4" />
          <p className="text-lg font-semibold text-right text-blue-700">
            Subtotal: {formateCurrency(subTotal)}
          </p>
        </div>

        {/* Shipping Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl text-black font-semibold mb-4">🚚 Shipping Info</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOrder();
            }}
            className="space-y-4 text-black"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
