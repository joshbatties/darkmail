"use client"

import { useState } from "react"
import { EmailToolbar } from "./email-toolbar"
import { EmailTabs } from "./email-tabs"
import { EmailView } from "./email-view"
import { ComposeEmail } from "./compose-email"

export function EmailClient() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [isComposing, setIsComposing] = useState(false)

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden rounded-lg border bg-background shadow">
      <EmailToolbar onComposeClick={() => setIsComposing(true)} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 border-r overflow-hidden flex flex-col">
          <EmailTabs onSelectEmail={setSelectedEmail} />
        </div>

        <div className="hidden md:block md:w-2/3 overflow-auto">
          {selectedEmail ? (
            <EmailView emailId={selectedEmail} onClose={() => setSelectedEmail(null)} />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">Select an email to view</div>
          )}
        </div>
      </div>

      {isComposing && <ComposeEmail onClose={() => setIsComposing(false)} />}
    </div>
  )
}

