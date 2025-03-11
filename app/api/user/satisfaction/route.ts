import { NextResponse } from "next/server"
import { updateUserSatisfaction } from "@/lib/user-data"

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { userId, satisfaction } = body

    await updateUserSatisfaction(userId, satisfaction)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update satisfaction" }, { status: 500 })
  }
}

