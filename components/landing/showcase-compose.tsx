"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ShowcaseCompose() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2 border-b">
        <h3 className="font-medium">New Message</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
          <div>
            <Input type="email" placeholder="To" value="client@example.com" readOnly />
          </div>
          <div>
            <Input type="text" placeholder="Subject" value="Project Update" readOnly />
          </div>
          <div className="relative">
            <Textarea
              placeholder="Compose your message..."
              className="min-h-[150px] resize-none pr-8"
              value="I wanted to follow up on our meeting last week regarding the website redesign project. We've made significant progress on the"
              readOnly
            />

            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute whitespace-pre-wrap break-words"
                style={{
                  top: 0,
                  left: 0,
                  padding: "0.5rem 0.75rem",
                  paddingRight: "2rem",
                  color: "transparent",
                }}
              >
                I wanted to follow up on our meeting last week regarding the website redesign project. We've made
                significant progress on the
                <span className="text-muted-foreground bg-primary/10">
                  {" "}
                  initial mockups and should have them ready for your review by Friday.
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-1 py-0.5 rounded border">
              Press Tab to accept
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button type="button" className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
            <Button type="button" variant="outline" className="gap-2">
              <Paperclip className="h-4 w-4" />
              Attach
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9" title="Generate AI suggestion">
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
          <Button type="button" variant="ghost">
            Discard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

