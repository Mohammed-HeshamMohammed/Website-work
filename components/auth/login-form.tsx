"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Temporary: directly log in as admin if credentials match
      if (email === "admin@123.com" && password === "admin123") {
        await login({
          email,
          password,
          isAdmin: true, // Force admin status
        })
        onSuccess()
        router.refresh()
        return
      }

      // Regular login flow for non-admin users
      await login({ email, password, isAdmin: false })
      onSuccess()
      router.refresh()
    } catch (error) {
      setError("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </form>
  )
}

