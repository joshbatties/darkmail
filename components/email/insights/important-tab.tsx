"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function ImportantTab() {
  const importantEmails = [
    {
      subject: "Website Launch Timeline",
      from: "Jane Smith",
      preview: "We need to finalize the timeline for the website launch. The client is expecting...",
      importance: "High priority client project with upcoming deadline",
      date: "2 days ago",
    },
    {
      subject: "Quarterly Budget Review",
      from: "Finance Team",
      preview: "Please review the attached budget report before our meeting on Friday...",
      importance: "Financial planning document requiring your input",
      date: "1 day ago",
    },
    {
      subject: "New Partnership Opportunity",
      from: "Alex Johnson",
      preview: "I wanted to discuss a potential partnership opportunity with Company XYZ...",
      importance: "Strategic business opportunity with potential high value",
      date: "3 days ago",
    },
  ]

  return (
    <div className="pt-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Important Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {importantEmails.map((email, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{email.subject}</p>
                  <p className="text-xs text-muted-foreground">{email.date}</p>
                </div>
                <p className="text-sm">From: {email.from}</p>
                <p className="text-sm text-muted-foreground">{email.preview}</p>
                <div className="flex items-center gap-2 mt-2 text-sm bg-muted/50 p-2 rounded">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <p>{email.importance}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
