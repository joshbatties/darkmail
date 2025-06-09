"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, X } from "lucide-react"

export function ShowcaseMeetingCoordinator() {
  const [participants] = useState<string[]>(["john@example.com", "sarah@example.com", "team@example.com"])
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>({
    date: "Tuesday, April 9",
    time: "9:00 AM",
  })

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <CardTitle className="text-lg">AI Meeting Coordinator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Meeting Topic</label>
          <Input
            type="text"
            placeholder="e.g., Project Review, Weekly Sync"
            value="Website Redesign Discussion"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value="30"
            readOnly
          >
            <option value="30">30 minutes</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Participants</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {participants.map((email, index) => (
              <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                <span>{email}</span>
                <Button variant="ghost" size="icon" className="h-5 w-5">
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
              value="next-week"
              readOnly
            >
              <option value="next-week">Next week</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time Preference</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value="morning"
              readOnly
            >
              <option value="morning">Morning</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Suggested Meeting Times</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { date: "Tuesday, April 9", time: "9:00 AM" },
              { date: "Tuesday, April 9", time: "10:30 AM" },
              { date: "Wednesday, April 10", time: "9:00 AM" },
              { date: "Thursday, April 11", time: "10:30 AM" },
            ].map((slot, index) => (
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
                <div className="text-sm text-muted-foreground">{slot.time} (30 min)</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 flex justify-end">
          <Button type="button" disabled={!selectedSlot}>
            Schedule Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

