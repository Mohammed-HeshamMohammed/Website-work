import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Check for admin credentials
    if (email === "admin@123.com" && password === "admin123") {
      const token = await createToken({
        email,
        name: "Admin User",
        isAdmin: true,
        role: "admin",
      })

      cookies().set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 1 day
      })

      return NextResponse.json({
        success: true,
        user: {
          email,
          name: "Admin User",
          isAdmin: true,
          role: "admin",
        },
      })
    }

    // Regular user authentication
    if (email && password) {
      const token = await createToken({
        email,
        name: "Regular User",
        isAdmin: false,
        role: "user",
      })

      cookies().set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400,
      })

      return NextResponse.json({
        success: true,
        user: {
          email,
          name: "Regular User",
          isAdmin: false,
          role: "user",
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

