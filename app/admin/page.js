import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default function AdminDashboard() {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")?.value
    const JWT_SECRET = process.env.JWT_SECRET

    if (!token) {
        return <p>Unauthorized. No token</p>
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        if (decoded.role !== "admin") {
            return <p>Access Denied. Admin only.</p>
        }

        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                <ul className="space-y-2">
                    <li>
                        <Link href="/admin/manage-products" className="text-blue-600 underline">Manage Products</Link>
                    </li>
                    <li>
                        <Link href="/admin/view-orders" className="text-blue-600 underline">View Orders</Link>
                    </li>
                </ul>
            </div>
        )
    } catch (err) {
        return <p>Invalid or expired token</p>

    }
}