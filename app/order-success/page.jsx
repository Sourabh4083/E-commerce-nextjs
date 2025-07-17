import { Suspense } from "react";
import OrderSuccess from "../success/page";

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<p>Loading your order...</p>}>
            <OrderSuccess />
        </Suspense>
    )
}