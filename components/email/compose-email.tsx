"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComposeForm } from "./compose/compose-form"
import { MeetingCoordinator, type MeetingDetails } from "./compose/meeting-coordinator"

interface ComposeEmailProps {
  onClose: () => void
  initialRecipient?: string
  initialSubject?: string
}

export function ComposeEmail({ onClose, initialRecipient = "", initialSubject = "" }: ComposeEmailProps) {
  const [showMeetingCoordinator, setShowMeetingCoordinator] = useState(false)

  const handleScheduleMeeting = (meetingDetails: MeetingDetails) => {
    // Add meeting details to email body
    const meetingText = `
I've scheduled a meeting for us:
Date: ${meetingDetails.date}
Time: ${meetingDetails.time}
Topic: ${meetingDetails.topic}
`
    // In a real implementation, we would update the email body with this text
    setShowMeetingCoordinator(false)
  }

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-lg border w-full max-w-2xl flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-medium">New Message</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ComposeForm
          initialRecipient={initialRecipient}
          initialSubject={initialSubject}
          onClose={onClose}
          onScheduleMeeting={() => setShowMeetingCoordinator(true)}
        />
      </div>

      {showMeetingCoordinator && (
        <MeetingCoordinator
          onClose={() => setShowMeetingCoordinator(false)}
          recipients={initialRecipient}
          onSchedule={handleScheduleMeeting}
        />
      )}
    </div>
  )
}

