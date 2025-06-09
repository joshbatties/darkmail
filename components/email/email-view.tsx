"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Reply, Forward, Trash, Archive, Star, Sparkles } from "lucide-react"
import { ComposeEmail } from "./compose-email"

// Mock data for a single email
const getMockEmail = (id: string) => {
  const mockEmails = {
    "1": {
      id: "1",
      from: "John Doe",
      email: "john@example.com",
      to: "me@example.com",
      subject: "Welcome to DarkMail",
      body: `<p>Hello,</p>
             <p>Thank you for signing up for DarkMail. We are excited to have you on board!</p>
             <p>With DarkMail, you can enjoy secure, encrypted email communications with a beautiful dark interface designed for privacy and comfort.</p>
             <p>Here are a few things you can do to get started:</p>
             <ul>
               <li>Customize your profile settings</li>
               <li>Import your contacts</li>
               <li>Set up email filters</li>
               <li>Explore our mobile apps</li>
             </ul>
             <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
             <p>Best regards,<br>The DarkMail Team</p>`,
      date: new Date(2023, 3, 15),
      attachments: [],
    },
    "2": {
      id: "2",
      from: "Jane Smith",
      email: "jane@example.com",
      to: "me@example.com",
      subject: "Project Update",
      body: `<p>Hi there,</p>
             <p>I wanted to share the latest updates on our project. We have made significant progress in the last week.</p>
             <p>The team has completed the following tasks:</p>
             <ul>
               <li>Finalized the design mockups</li>
               <li>Implemented the core functionality</li>
               <li>Started the initial testing phase</li>
             </ul>
             <p>We're still on track to meet our deadline. I've attached the latest project timeline for your review.</p>
             <p>Let me know if you have any questions or concerns.</p>
             <p>Thanks,<br>Jane</p>`,
      date: new Date(2023, 3, 14),
      attachments: [{ name: "project-timeline.pdf", size: "2.4 MB" }],
    },
    "3": {
      id: "3",
      from: "Alex Johnson",
      email: "alex@example.com",
      to: "me@example.com",
      subject: "Meeting Request",
      body: `<p>Hello,</p>
             <p>I'd like to schedule a meeting with you to discuss the upcoming marketing campaign. Would you be available sometime next week?</p>
             <p>I'm generally free on Tuesday and Thursday afternoons, but I can be flexible if those times don't work for you.</p>
             <p>Looking forward to your response.</p>
             <p>Best,<br>Alex</p>`,
      date: new Date(2023, 3, 13),
      attachments: [],
    },
    // Add more mock emails as needed
  }

  return mockEmails[id as keyof typeof mockEmails]
}

interface EmailViewProps {
  emailId: string
  onClose: () => void
}

export function EmailView({ emailId, onClose }: EmailViewProps) {
  const [email, setEmail] = useState<any>(null)
  const [isStarred, setIsStarred] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the email from an API
    setEmail(getMockEmail(emailId))
  }, [emailId])

  const handleReply = () => {
    setIsReplying(true)
  }

  const handleAIReply = () => {
    // In a real implementation, this would generate an AI response
    // For now, we'll just open the compose window with a pre-filled message
    setIsReplying(true)
  }

  if (!email) {
    return <div className="flex h-full items-center justify-center">Loading email...</div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{email.subject}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsStarred(!isStarred)}>
            <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-auto flex-1">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{email.from.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{email.from}</p>
                <p className="text-sm text-muted-foreground">{email.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">{format(email.date, "PPP p")}</p>
            </div>
            <p className="text-sm text-muted-foreground">To: me@example.com</p>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: email.body }} />

        {email.attachments && email.attachments.length > 0 && (
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-medium">Attachments</h3>
            <div className="grid grid-cols-1 gap-2">
              {email.attachments.map((attachment: any, index: number) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-muted p-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleReply}>
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleAIReply}>
            <Sparkles className="h-4 w-4" />
            AI Reply
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Forward className="h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>

      {isReplying && (
        <ComposeEmail
          onClose={() => setIsReplying(false)}
          initialRecipient={email.email}
          initialSubject={`Re: ${email.subject}`}
        />
      )}
    </div>
  )
}
