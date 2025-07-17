"use client"
import { useState, useEffect } from "react";

export default function ViewOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded p-4 shadow">
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>User:</strong> {orders.user?.email}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Delivery Status:</strong> {order.deliveryStatus}</p>
            <p><strong>Total Price:</strong> ${Number(order.totalAmount).toFixed(2)}</p>
            <div>
              <strong>Items:</strong>
              <ul className="ml-4 list-disc">
                {Array.isArray(order.items) ? (
                  order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.userInfo.name} × {item.quantity}
                    </li>
                  ))

                ) : (
                  <li>No items found</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}