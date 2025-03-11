"use client"

import type { AuthCredentials } from "./auth"

export async function login(credentials: AuthCredentials) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || "Login failed")
  }

  return data
}

export async function signup(credentials: AuthCredentials) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error("Signup failed")
  }

  return response.json()
}

