"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Star, StarOff } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for emails
const mockEmails = [
  {
    id: "1",
    from: "John Doe",
    email: "john@example.com",
    subject: "Welcome to DarkMail",
    preview: "Thank you for signing up for DarkMail. We are excited to have you on board...",
    date: new Date(2023, 3, 15),
    read: false,
    starred: false,
  },
  {
    id: "2",
    from: "Jane Smith",
    email: "jane@example.com",
    subject: "Project Update",
    preview: "I wanted to share the latest updates on our project. We have made significant progress...",
    date: new Date(2023, 3, 14),
    read: true,
    starred: true,
  },
  {
    id: "3",
    from: "Marketing Team",
    email: "marketing@example.com",
    subject: "New Feature Announcement",
    preview: "We are excited to announce a new feature that will be available next week...",
    date: new Date(2023, 3, 13),
    read: true,
    starred: false,
  },
  {
    id: "4",
    from: "Support Team",
    email: "support@example.com",
    subject: "Your Ticket #12345",
    preview: "We have received your support ticket and are working on resolving your issue...",
    date: new Date(2023, 3, 12),
    read: false,
    starred: false,
  },
  {
    id: "5",
    from: "Newsletter",
    email: "news@example.com",
    subject: "Weekly Digest",
    preview: "Here is your weekly digest of the most important news and updates...",
    date: new Date(2023, 3, 11),
    read: true,
    starred: false,
  },
]

interface EmailListProps {
  onSelectEmail: (id: string) => void
}

export function EmailList({ onSelectEmail }: EmailListProps) {
  const [emails, setEmails] = useState(mockEmails)

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(emails.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email)))
  }

  const handleEmailClick = (id: string) => {
    // Mark as read
    setEmails(emails.map((email) => (email.id === id ? { ...email, read: true } : email)))
    onSelectEmail(id)
  }

  return (
    <div className="divide-y">
      {emails.map((email) => (
        <div
          key={email.id}
          className={cn(
            "flex cursor-pointer items-start p-4 hover:bg-muted/50",
            !email.read && "bg-muted/30 font-medium",
          )}
          onClick={() => handleEmailClick(email.id)}
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

