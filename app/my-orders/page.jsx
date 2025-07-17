import { getCurrentUser } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import Order from "@/models/Order";

export default async function MyOrdersPage() {
  await dbConnect();
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">
        ❌ You must be logged in to view your orders.
      </div>
    );
  }

  const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 });

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        🛒 You haven’t placed any orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🧾 My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <div>
                <p className="font-semibold text-gray-800">
                  📦 Order ID: <span className="text-sm">{order._id.toString()}</span>
                </p>
                <p className="text-sm text-gray-500">
                  📅 Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right mt-2 sm:mt-0">
                <p className="text-xl font-extrabold text-blue-600">
                  Total: ₹{order.totalAmount}
                </p>
                <p
                  className={`text-sm font-medium mt-1 ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus.toUpperCase()}
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2 text-gray-700">🛒 Items:</p>
              <ul className="divide-y divide-gray-100 text-sm">
                {order.cartItem.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between text-black">
                    <span>{item.title} × {item.quantity}</span>
                    <span className="text-gray-600">₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
