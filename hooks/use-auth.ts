"use client"

import { create } from "zustand"
import { login as loginApi, signup as signupApi } from "@/lib/auth-client"
import type { AuthCredentials } from "@/lib/auth"

interface User {
  email: string
  name: string
  role: string
  isAdmin: boolean
  image?: string
  bio?: string
  description?: string
}

interface AuthState {
  user: User | null
  login: (credentials: AuthCredentials & { isAdmin?: boolean }) => Promise<void>
  signup: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (credentials) => {
    const response = await loginApi(credentials)
    if (response.success) {
      set({ user: response.user })
    } else {
      throw new Error(response.error || "Login failed")
    }
  },
  signup: async (credentials) => {
    const response = await signupApi(credentials)
    if (response.success) {
      set({ user: response.user })
    } else {
      throw new Error(response.error || "Signup failed")
    }
  },
  logout: () => {
    fetch("/api/auth/logout", { method: "POST" })
    set({ user: null })
  },
  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }))
  },
}))

