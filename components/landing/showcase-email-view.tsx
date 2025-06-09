"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Reply, Forward, Star, Sparkles } from "lucide-react"

// Mock email data
const showcaseEmail = {
  id: "1",
  from: "John Doe",
  email: "john@example.com",
  to: "me@example.com",
  subject: "Website Redesign Project",
  body: `<p>Hi there,</p>
         <p>I've reviewed the latest mockups for the website redesign, and I think we're on the right track. The new layout looks great, and I particularly like the improved navigation.</p>
         <p>Here are a few thoughts:</p>
         <ul>
           <li>The color scheme works well with our brand identity</li>
           <li>The mobile responsiveness is much better than the previous version</li>
           <li>We might want to reconsider the placement of the call-to-action buttons</li>
         </ul>
         <p>Let's discuss the timeline for the next phase during our meeting tomorrow.</p>
         <p>Best regards,<br>John</p>`,
  date: new Date(2023, 3, 15),
  attachments: [{ name: "website-mockups.pdf", size: "3.2 MB" }],
}

export function ShowcaseEmailView() {
  return (
    <div className="flex flex-col h-full rounded-md border bg-background overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{showcaseEmail.subject}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-auto flex-1">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{showcaseEmail.from.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{showcaseEmail.from}</p>
                <p className="text-sm text-muted-foreground">{showcaseEmail.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">{format(showcaseEmail.date, "PPP p")}</p>
            </div>
            <p className="text-sm text-muted-foreground">To: me@example.com</p>
          </div>
        </div>

        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: showcaseEmail.body }}
        />

        {showcaseEmail.attachments && showcaseEmail.attachments.length > 0 && (
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-medium">Attachments</h3>
            <div className="grid grid-cols-1 gap-2">
              {showcaseEmail.attachments.map((attachment: any, index: number) => (
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
          <Button variant="outline" size="sm" className="gap-2">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Reply
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Forward className="h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  )
}

