import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Mock authentication check - in a real app, you would verify the session/token
  const isAuthenticated = request.cookies.has("auth")
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // If user is not authenticated and trying to access dashboard
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If user is authenticated and trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}

