"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, X } from "lucide-react"

export interface MeetingDetails {
  date: string
  time: string
  topic: string
  participants: string[]
}

interface MeetingCoordinatorProps {
  onClose: () => void
  recipients: string
  onSchedule: (meetingDetails: MeetingDetails) => void
}

export function MeetingCoordinator({ onClose, recipients, onSchedule }: MeetingCoordinatorProps) {
  const [topic, setTopic] = useState("")
  const [duration, setDuration] = useState("30")
  const [participants, setParticipants] = useState<string[]>(
    recipients
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean),
  )
  const [newParticipant, setNewParticipant] = useState("")
  const [datePreference, setDatePreference] = useState<string>("next-week")
  const [timePreference, setTimePreference] = useState<string>("morning")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestedSlots, setSuggestedSlots] = useState<Array<{ date: string; time: string }>>([])
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null)

  const addParticipant = () => {
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant])
      setNewParticipant("")
    }
  }

  const removeParticipant = (email: string) => {
    setParticipants(participants.filter((p) => p !== email))
  }

  const analyzeMeetingAvailability = async () => {
    setIsAnalyzing(true)

    try {
      // In a real implementation, this would call an API to check calendars
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate some mock meeting slots based on preferences
      const slots = []

      // Generate dates based on preference
      const startDate = new Date()
      if (datePreference === "this-week") {
        // Start from tomorrow
        startDate.setDate(startDate.getDate() + 1)
      } else if (datePreference === "next-week") {
        // Start from next Monday
        const day = startDate.getDay() // 0 = Sunday, 1 = Monday, etc.
        const daysUntilNextMonday = day === 0 ? 1 : 8 - day
        startDate.setDate(startDate.getDate() + daysUntilNextMonday)
      } else if (datePreference === "next-month") {
        // Start from 1st of next month
        startDate.setMonth(startDate.getMonth() + 1)
        startDate.setDate(1)
      }

      // Generate 3 dates starting from the computed start date
      for (let i = 0; i < 3; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) {
          continue
        }

        // Format the date
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })

        // Generate times based on preference
        let times = []
        if (timePreference === "morning") {
          times = ["9:00 AM", "10:30 AM"]
        } else if (timePreference === "afternoon") {
          times = ["1:00 PM", "2:30 PM"]
        } else if (timePreference === "evening") {
          times = ["4:00 PM", "5:30 PM"]
        } else {
          // Any time
          times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "4:30 PM"]
        }

        // Add slots for this date
        for (const time of times) {
          slots.push({
            date: formattedDate,
            time,
          })
        }
      }

      setSuggestedSlots(slots)
    } catch (error) {
      console.error("Error analyzing availability:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSchedule = () => {
    if (selectedSlot && topic) {
      onSchedule({
        date: selectedSlot.date,
        time: selectedSlot.time,
        topic,
        participants,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-[60]">
      <div className="bg-background rounded-lg shadow-lg border w-full max-w-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h3 className="font-medium">AI Meeting Coordinator</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Meeting Topic</label>
            <Input
              type="text"
              placeholder="e.g., Project Review, Weekly Sync"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Participants</label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Add participant email"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addParticipant()
                  }
                }}
              />
              <Button type="button" onClick={addParticipant}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {participants.map((email, index) => (
                <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                  <span>{email}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeParticipant(email)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Preference</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={datePreference}
                onChange={(e) => setDatePreference(e.target.value)}
              >
                <option value="this-week">This week</option>
                <option value="next-week">Next week</option>
                <option value="next-month">Next month</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Preference</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={timePreference}
                onChange={(e) => setTimePreference(e.target.value)}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="any">Any time</option>
              </select>
            </div>
          </div>

          {!suggestedSlots.length && (
            <Button
              type="button"
              className="w-full gap-2"
              onClick={analyzeMeetingAvailability}
              disabled={isAnalyzing || participants.length === 0 || !topic}
            >
              <Calendar className="h-4 w-4" />
              {isAnalyzing ? "Analyzing Availability..." : "Find Available Times"}
            </Button>
          )}

          {suggestedSlots.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Suggested Meeting Times</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedSlot && selectedSlot.date === slot.date && selectedSlot.time === slot.time
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <div className="font-medium">{slot.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {slot.time} ({duration} min)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-between">
          {suggestedSlots.length > 0 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSuggestedSlots([])
                  setSelectedSlot(null)
                }}
              >
                Back
              </Button>
              <Button type="button" onClick={handleSchedule} disabled={!selectedSlot}>
                Schedule Meeting
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" disabled={isAnalyzing} onClick={analyzeMeetingAvailability}>
                Continue
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
