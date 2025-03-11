"use server"

import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secure-secret-key")

export interface AuthCredentials {
  email: string
  password: string
  isAdmin?: boolean
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export async function createToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  return token
}

export async function checkAdminStatus(token: string) {
  try {
    const decoded = await verifyToken(token)
    return decoded.isAdmin === true
  } catch {
    return false
  }
}

