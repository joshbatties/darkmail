"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // This is a simple auth check - in a real app, you would check the session/token
  useEffect(() => {
    // Mock auth check - in a real app, you would verify the user's session
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="flex flex-1">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
