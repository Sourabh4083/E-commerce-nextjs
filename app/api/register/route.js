
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
    try {

        const { name, email, password } = await req.json()
        
        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }
        
        await dbConnect()
        
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400})
        }
        
        
        const hashedPassword = await bcrypt.hash(password, 10)
        
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        })
        
        return NextResponse.json({ message: "User registered successfully" })
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500})
    }
}