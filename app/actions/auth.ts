"use server"

import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function checkIsAdmin() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return false
  }

  try {
    const decoded = await verifyToken(token)
    return decoded.isAdmin === true
  } catch {
    return false
  }
}

