import { Suspense } from "react"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
    return (
        <Suspense fallback={<p>Loading login....</p>}>
            <LoginForm />
        </Suspense>
    )
}