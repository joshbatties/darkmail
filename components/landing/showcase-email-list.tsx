"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Star, StarOff } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for showcase emails
const showcaseEmails = [
  {
    id: "1",
    from: "John Doe",
    email: "john@example.com",
    subject: "Website Redesign Project",
    preview: "I've reviewed the latest mockups and I think we're on the right track. Let's discuss the timeline...",
    date: new Date(2023, 3, 15),
    read: false,
    starred: true,
  },
  {
    id: "2",
    from: "Marketing Team",
    email: "marketing@example.com",
    subject: "Campaign Results",
    preview: "The Q1 marketing campaign exceeded our expectations. Here are the key metrics and insights...",
    date: new Date(2023, 3, 14),
    read: true,
    starred: false,
  },
  {
    id: "3",
    from: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Meeting Tomorrow",
    preview: "Just confirming our meeting tomorrow at 10:00 AM to discuss the new product features...",
    date: new Date(2023, 3, 13),
    read: true,
    starred: false,
  },
]

export function ShowcaseEmailList() {
  const [emails, setEmails] = useState(showcaseEmails)

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(emails.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email)))
  }

  return (
    <div className="divide-y rounded-md border bg-background overflow-hidden">
      {emails.map((email) => (
        <div
          key={email.id}
          className={cn(
            "flex cursor-pointer items-start p-4 hover:bg-muted/50",
            !email.read && "bg-muted/30 font-medium",
          )}
        >
          <button className="mr-2 mt-1" onClick={(e) => toggleStar(email.id, e)}>
            {email.starred ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between">
              <p className="font-medium">{email.from}</p>
              <p className="text-xs text-muted-foreground">{formatDistanceToNow(email.date, { addSuffix: true })}</p>
            </div>
            <p className="text-sm truncate">{email.subject}</p>
            <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
