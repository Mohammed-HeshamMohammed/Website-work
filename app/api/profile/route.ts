import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function PATCH(request: Request) {
  try {
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    const body = await request.json()

    // In a real app, update the user in the database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      user: {
        ...decoded,
        ...body,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

