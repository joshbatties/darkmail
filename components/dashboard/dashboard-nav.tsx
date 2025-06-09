"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Inbox, Send, Archive, Trash, Settings, LogOut, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would clear the auth token/session
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6" />
          <span className="text-xl font-bold">DarkMail</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
            <Inbox className="h-4 w-4" />
            Inbox
          </Link>
          <Link href="/dashboard/sent" className="flex items-center gap-2 text-sm font-medium">
            <Send className="h-4 w-4" />
            Sent
          </Link>
          <Link href="/dashboard/archive" className="flex items-center gap-2 text-sm font-medium">
            <Archive className="h-4 w-4" />
            Archive
          </Link>
          <Link href="/dashboard/trash" className="flex items-center gap-2 text-sm font-medium">
            <Trash className="h-4 w-4" />
            Trash
          </Link>
          <Link href="/dashboard/insights" className="flex items-center gap-2 text-sm font-medium">
            <BarChart2 className="h-4 w-4" />
            Insights
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 text-sm font-medium">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
