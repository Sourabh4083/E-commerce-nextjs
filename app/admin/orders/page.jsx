"use client";

import { useEffect, useState } from "react";
import { formateCurrency } from "@/utils/formatCurrency";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Invalid data received from API:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📦 Customer Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border text-black border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <p><span className="font-semibold">📅 Order Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><span className="font-semibold">👤 Customer:</span> {order.userInfo?.name}</p>
                  <p><span className="font-semibold">✉️ Email:</span> {order.userInfo?.email}</p>
                  <p><span className="font-semibold">🏠 Address:</span> {order.userInfo?.address}</p>
                </div>

                <div>
                  <p><span className="font-semibold">💳 Payment Status:</span> {order.paymentStatus}</p>
                  <p><span className="font-semibold">🚚 Delivery Status:</span> {order.deliveryStatus}</p>
                  <p><span className="font-semibold">💰 Total:</span> {formateCurrency(order.totalAmount)}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-1">🛒 Items:</p>
                <ul className="ml-4 list-disc text-sm text-gray-700">
                  {order.cartItem.map((item, i) => (
                    <li key={i}>
                      {item?.title || "Unnamed Product"} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 