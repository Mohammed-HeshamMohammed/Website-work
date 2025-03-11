import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin")

  if (isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const decoded = await verifyToken(token)
      if (!decoded.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

