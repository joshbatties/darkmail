"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Email } from "@/types/email"

export function DemoAutoReply() {
  const { toast } = useToast()
  const [testEmail, setTestEmail] = useState({
    from: {
      name: "John Doe",
      email: "john@example.com",
    },
    to: ["user@example.com"],
    subject: "Question about support",
    content: "Hello, I have a question about your product support options.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "fromName" || name === "fromEmail") {
      setTestEmail((prev) => ({
        ...prev,
        from: {
          ...prev.from,
          [name === "fromName" ? "name" : "email"]: value,
        },
      }))
    } else {
      setTestEmail((prev) => ({
        ...prev,
        [name]: name === "to" ? [value] : value,
      }))
    }
  }

  const handleSendTest = () => {
    // Create a full email object
    const email: Email = {
      id: `test_${Date.now()}`,
      from: testEmail.from,
      to: testEmail.to,
      subject: testEmail.subject,
      content: testEmail.content,
      date: new Date().toISOString(),
      read: false,
      starred: false,
      labels: ["inbox"],
    }

    // Process the email through the auto-reply service
    if (typeof window !== "undefined" && window.__processIncomingEmail) {
      // @ts-ignore - Using the globally exposed function
      window.__processIncomingEmail(email)

      toast({
        title: "Test email processed",
        description: "The test email has been processed by the auto-reply system.",
      })
    } else {
      toast({
        title: "Auto-reply system not available",
        description: "Please make sure the email client is open.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-4 border border-border rounded-md space-y-4">
      <h3 className="font-medium">Test Auto-Reply System</h3>
      <p className="text-sm text-muted-foreground">
        Use this form to simulate an incoming email and test your auto-reply rules.
      </p>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">From Name</label>
            <Input name="fromName" value={testEmail.from.name} onChange={handleChange} placeholder="Sender Name" />
          </div>
          <div>
            <label className="text-sm font-medium">From Email</label>
            <Input
              name="fromEmail"
              value={testEmail.from.email}
              onChange={handleChange}
              placeholder="sender@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">To</label>
          <Input name="to" value={testEmail.to[0]} onChange={handleChange} placeholder="recipient@example.com" />
        </div>

        <div>
          <label className="text-sm font-medium">Subject</label>
          <Input name="subject" value={testEmail.subject} onChange={handleChange} placeholder="Email subject" />
        </div>

        <div>
          <label className="text-sm font-medium">Content</label>
          <Textarea
            name="content"
            value={testEmail.content}
            onChange={handleChange}
            placeholder="Email content"
            className="min-h-[100px]"
          />
        </div>

        <Button onClick={handleSendTest} className="w-full">
          Send Test Email
        </Button>
      </div>
    </div>
  )
}

