"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  CalendarIcon,
  Clock,
  Bell,
  Plus,
  Trash2,
  Mail,
  Edit,
  Check,
  X,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  Plane,
  CalendarPlus2Icon,
} from "lucide-react"
import { format, isSameDay, addDays, addMonths, subMonths, startOfWeek, addWeeks, subWeeks } from "date-fns"
import type { Email } from "@/types/email"
import { useMobile } from "@/hooks/use-mobile"

export interface CalendarEvent {
  id: string
  title: string
  description: string
  date: Date
  time?: string
  isAllDay: boolean
  reminderTime?: number // minutes before event
  sourceEmailId?: string
  sourceEmailSubject?: string
  completed: boolean
  category?: "work" | "personal" | "family" | "health" | "travel" | "education" | "other"
  location?: string
  attendees?: string[]
  recurring?: "daily" | "weekly" | "monthly" | "yearly" | null
}

interface CalendarViewProps {
  emails: Email[]
}

// Sample calendar data
const sampleEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Team Weekly Standup",
    description: "Weekly team meeting to discuss progress and blockers",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 0),
    time: "10:00 AM",
    isAllDay: false,
    reminderTime: 15,
    completed: false,
    category: "work",
    location: "Conference Room A",
    attendees: ["alex@example.com", "sarah@example.com", "mike@example.com"],
    recurring: "weekly",
  },
  {
    id: "event-2",
    title: "Doctor's Appointment",
    description: "Annual checkup with Dr. Smith",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 14, 30),
    time: "2:30 PM",
    isAllDay: false,
    reminderTime: 60,
    completed: false,
    category: "health",
    location: "Medical Center, Room 302",
  },
  {
    id: "event-3",
    title: "Project Deadline",
    description: "Final submission for the Q2 project",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
    isAllDay: true,
    reminderTime: 1440, // 1 day before
    completed: false,
    category: "work",
    location: "Office",
  },
  {
    id: "event-4",
    title: "Mom's Birthday",
    description: "Don't forget to call and send flowers!",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    isAllDay: true,
    reminderTime: 1440,
    completed: false,
    category: "family",
  },
  {
    id: "event-5",
    title: "Lunch with Sarah",
    description: "Catch up over lunch at the new Italian restaurant",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, 12, 0),
    time: "12:00 PM",
    isAllDay: false,
    reminderTime: 30,
    completed: false,
    category: "personal",
    location: "Bella Italia Restaurant",
  },
  {
    id: "event-6",
    title: "Flight to New York",
    description: "Business trip for client meeting",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 8, 45),
    time: "8:45 AM",
    isAllDay: false,
    reminderTime: 120,
    completed: false,
    category: "travel",
    location: "Airport, Terminal B, Gate 12",
  },
  {
    id: "event-7",
    title: "Online Course",
    description: "Advanced JavaScript Patterns",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4, 18, 0),
    time: "6:00 PM",
    isAllDay: false,
    reminderTime: 15,
    completed: false,
    category: "education",
    recurring: "weekly",
  },
  {
    id: "event-8",
    title: "Quarterly Review",
    description: "Performance review with manager",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10, 15, 0),
    time: "3:00 PM",
    isAllDay: false,
    reminderTime: 60,
    completed: false,
    category: "work",
    location: "Manager's Office",
  },
]

// Sample reminders
const sampleReminders: CalendarEvent[] = [
  {
    id: "reminder-1",
    title: "Reminder: Submit Expense Report",
    description: "Monthly expense report due today",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 17, 0),
    time: "5:00 PM",
    isAllDay: false,
    reminderTime: 60,
    completed: false,
    category: "work",
  },
  {
    id: "reminder-2",
    title: "Reminder: Call Insurance Company",
    description: "Follow up on claim #12345",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 10, 0),
    time: "10:00 AM",
    isAllDay: false,
    reminderTime: 30,
    completed: false,
    category: "personal",
  },
]

export function CalendarView({ emails }: CalendarViewProps) {
  const isMobile = useMobile()
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([...sampleEvents])
  const [reminders, setReminders] = useState<CalendarEvent[]>([...sampleReminders])
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showReminderDialog, setShowReminderDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    date: new Date(),
    time: "",
    isAllDay: false,
    reminderTime: 30,
    completed: false,
    category: "other",
  })
  const [activeTab, setActiveTab] = useState("calendar")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("week")
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

  // Extract events from emails on component mount
  useEffect(() => {
    const extractedEvents = extractEventsFromEmails(emails)
    setEvents((prev) => {
      // Merge with existing events, avoiding duplicates
      const existingIds = new Set(prev.map((e) => e.id))
      const newEvents = extractedEvents.filter((e) => !existingIds.has(e.id))
      return [...prev, ...newEvents]
    })
  }, [emails])

  // Generate reminders from events
  useEffect(() => {
    const eventReminders = events
      .filter((event) => event.reminderTime !== undefined && !event.completed)
      .map((event) => ({
        ...event,
        id: `reminder-${event.id}`,
        title: `Reminder: ${event.title}`,
        description: `Reminder for event: ${event.title}`,
        isReminder: true,
      }))

    setReminders((prev) => {
      // Keep existing manual reminders, add event-based ones
      const manualReminders = prev.filter((r) => !r.id.startsWith("reminder-event-"))
      return [...manualReminders, ...eventReminders]
    })
  }, [events])

  // Extract events from email content
  const extractEventsFromEmails = (emails: Email[]): CalendarEvent[] => {
    const extractedEvents: CalendarEvent[] = []

    // Regular expressions for date and time patterns
    const datePatterns = [
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/gi,
      /\b(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December),?\s+(\d{4})\b/gi,
      /\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g,
      /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/g,
      /\b(tomorrow|next\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/gi,
      /\b(next\s+week|next\s+month)\b/gi,
    ]

    const timePatterns = [/\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/gi, /\b(\d{1,2})\s*(am|pm)\b/gi, /\b(noon|midnight)\b/gi]

    const meetingKeywords = [
      /\bmeeting\b/i,
      /\bappointment\b/i,
      /\bschedule\b/i,
      /\bcall\b/i,
      /\bconference\b/i,
      /\bwebinar\b/i,
      /\bdeadline\b/i,
      /\bdue\s+date\b/i,
      /\breminder\b/i,
    ]

    emails.forEach((email) => {
      // Check if email content contains meeting-related keywords
      const hasMeetingKeywords = meetingKeywords.some(
        (pattern) => pattern.test(email.subject) || pattern.test(email.content),
      )

      if (hasMeetingKeywords) {
        // Look for dates in the email
        let eventDate: Date | null = null
        let eventTime: string | null = null
        let eventTitle = email.subject

        // Extract date
        for (const pattern of datePatterns) {
          const content = email.subject + " " + email.content
          const matches = [...content.matchAll(pattern)]

          if (matches.length > 0) {
            // For simplicity, just use the first date found
            const match = matches[0]

            // Parse the date based on the pattern
            if (pattern.source.includes("January|February")) {
              // Month name format
              const monthNames = [
                "january",
                "february",
                "march",
                "april",
                "may",
                "june",
                "july",
                "august",
                "september",
                "october",
                "november",
                "december",
              ]
              const monthIndex = monthNames.findIndex((m) => m.toLowerCase() === match[1].toLowerCase())
              const day = Number.parseInt(match[2])
              const year = Number.parseInt(match[3])

              if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
                eventDate = new Date(year, monthIndex, day)
              }
            } else if (pattern.source.includes("\\/")) {
              // MM/DD/YYYY format
              const month = Number.parseInt(match[1]) - 1
              const day = Number.parseInt(match[2])
              const year = Number.parseInt(match[3])

              if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
                const fullYear = year < 100 ? 2000 + year : year
                eventDate = new Date(fullYear, month, day)
              }
            } else if (pattern.source.includes("-")) {
              // YYYY-MM-DD format
              const year = Number.parseInt(match[1])
              const month = Number.parseInt(match[2]) - 1
              const day = Number.parseInt(match[3])

              if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                eventDate = new Date(year, month, day)
              }
            } else if (pattern.source.includes("tomorrow")) {
              // Relative dates
              const lowerMatch = match[0].toLowerCase()
              if (lowerMatch.includes("tomorrow")) {
                eventDate = addDays(new Date(), 1)
              } else if (lowerMatch.includes("next week")) {
                eventDate = addDays(new Date(), 7)
              } else if (lowerMatch.includes("next month")) {
                const today = new Date()
                eventDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
              }
            }

            break
          }
        }

        // Extract time
        for (const pattern of timePatterns) {
          const content = email.subject + " " + email.content
          const matches = [...content.matchAll(pattern)]

          if (matches.length > 0) {
            // For simplicity, just use the first time found
            const timeMatch = matches[0]

            if (pattern.source.includes("noon|midnight")) {
              eventTime = timeMatch[0].toLowerCase() === "noon" ? "12:00 PM" : "12:00 AM"
            } else if (pattern.source.includes(":")) {
              // HH:MM format
              const hour = Number.parseInt(timeMatch[1])
              const minute = timeMatch[2]
              const period = timeMatch[3]?.toUpperCase() || "AM"

              if (!isNaN(hour)) {
                eventTime = `${hour}:${minute} ${period}`
              }
            } else {
              // Hour only format
              const hour = Number.parseInt(timeMatch[1])
              const period = timeMatch[2]?.toUpperCase() || "AM"

              if (!isNaN(hour)) {
                eventTime = `${hour}:00 ${period}`
              }
            }

            break
          }
        }

        // If we found a date, create an event
        if (eventDate) {
          // Extract a better title if possible
          const meetingTitlePatterns = [
            /(?:meeting|call|discussion|conference|appointment)\s+(?:about|regarding|re:|on|for)\s+([^.!?]+)/i,
            /(?:meeting|call|discussion|conference|appointment):\s+([^.!?]+)/i,
          ]

          for (const pattern of meetingTitlePatterns) {
            const content = email.subject + " " + email.content
            const match = content.match(pattern)

            if (match && match[1]) {
              eventTitle = match[1].trim()
              break
            }
          }

          // Determine category based on content
          let category: "work" | "personal" | "family" | "health" | "travel" | "education" | "other" = "other"

          if (/work|project|client|meeting|deadline|report/i.test(email.content)) {
            category = "work"
          } else if (/doctor|medical|health|appointment|checkup/i.test(email.content)) {
            category = "health"
          } else if (/family|mom|dad|sister|brother|parent/i.test(email.content)) {
            category = "family"
          } else if (/travel|flight|trip|vacation/i.test(email.content)) {
            category = "travel"
          } else if (/class|course|lecture|study|learn/i.test(email.content)) {
            category = "education"
          } else if (/lunch|dinner|coffee|movie|friend/i.test(email.content)) {
            category = "personal"
          }

          extractedEvents.push({
            id: `email-event-${email.id}-${Date.now()}`,
            title: eventTitle,
            description: `Extracted from email: ${email.subject}

${email.content.substring(0, 200)}${email.content.length > 200 ? "..." : ""}`,
            date: eventDate,
            time: eventTime || undefined,
            isAllDay: !eventTime,
            reminderTime: 30, // Default 30 minutes before
            sourceEmailId: email.id,
            sourceEmailSubject: email.subject,
            completed: false,
            category: category,
          })
        }
      }
    })

    return extractedEvents
  }

  const handlePrevMonth = () => {
    if (viewMode === "month") {
      setCurrentMonth((prev) => subMonths(prev, 1))
    } else if (viewMode === "week") {
      setCurrentWeek((prev) => subWeeks(prev, 1))
    } else {
      setDate((prev) => addDays(prev, -1))
    }
  }

  const handleNextMonth = () => {
    if (viewMode === "month") {
      setCurrentMonth((prev) => addMonths(prev, 1))
    } else if (viewMode === "week") {
      setCurrentWeek((prev) => addWeeks(prev, 1))
    } else {
      setDate((prev) => addDays(prev, 1))
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      if (viewMode === "month") {
        setViewMode("day")
      }
    }
  }

  const handleAddEvent = () => {
    setSelectedEvent(null)
    setNewEvent({
      title: "",
      description: "",
      date: date,
      time: "",
      isAllDay: false,
      reminderTime: 30,
      completed: false,
      category: "other",
    })
    setShowEventDialog(true)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time || "",
      isAllDay: event.isAllDay,
      reminderTime: event.reminderTime,
      completed: event.completed,
      category: event.category || "other",
      location: event.location,
      attendees: event.attendees,
      recurring: event.recurring,
    })
    setShowEventDialog(true)
  }

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert("Please provide a title and date for the event")
      return
    }

    const eventToSave: CalendarEvent = {
      id: selectedEvent?.id || `event-${Date.now()}`,
      title: newEvent.title || "",
      description: newEvent.description || "",
      date: newEvent.date || new Date(),
      time: newEvent.isAllDay ? undefined : newEvent.time,
      isAllDay: newEvent.isAllDay || false,
      reminderTime: newEvent.reminderTime,
      sourceEmailId: selectedEvent?.sourceEmailId,
      sourceEmailSubject: selectedEvent?.sourceEmailSubject,
      completed: newEvent.completed || false,
      category: newEvent.category || "other",
      location: newEvent.location,
      attendees: newEvent.attendees,
      recurring: newEvent.recurring,
    }

    setEvents((prev) => {
      if (selectedEvent) {
        // Update existing event
        return prev.map((e) => (e.id === selectedEvent.id ? eventToSave : e))
      } else {
        // Add new event
        return [...prev, eventToSave]
      }
    })

    setShowEventDialog(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId))
    setShowEventDialog(false)
  }

  const handleToggleComplete = (eventId: string, completed: boolean) => {
    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, completed } : e)))
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  const getDueReminders = () => {
    const today = new Date()
    return reminders.filter((reminder) => {
      const eventDate = new Date(reminder.date)

      // If the reminder has a time, calculate the reminder time
      if (reminder.time && reminder.reminderTime) {
        const [hours, minutes] = reminder.time.split(":")[0].split(" ")[0].split(":").map(Number)
        const isPM = reminder.time.toLowerCase().includes("pm")

        let eventHours = hours
        if (isPM && hours < 12) eventHours += 12
        if (!isPM && hours === 12) eventHours = 0

        eventDate.setHours(eventHours, minutes || 0)

        // Subtract reminder time (in minutes)
        const reminderDate = new Date(eventDate.getTime() - reminder.reminderTime * 60 * 1000)

        // Check if reminder is due (reminder time is now or in the past, but event is in the future)
        return reminderDate <= today && eventDate > today
      }

      // For all-day events, just check if it's today or tomorrow
      return isSameDay(eventDate, today) || isSameDay(eventDate, addDays(today, 1))
    })
  }

  const formatEventTime = (event: CalendarEvent) => {
    if (event.isAllDay) {
      return "All day"
    }
    return event.time || ""
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "work":
        return <Briefcase className="h-4 w-4 text-blue-500" />
      case "personal":
        return <Coffee className="h-4 w-4 text-purple-500" />
      case "family":
        return <Heart className="h-4 w-4 text-red-500" />
      case "health":
        return <Heart className="h-4 w-4 text-green-500" />
      case "travel":
        return <Plane className="h-4 w-4 text-amber-500" />
      case "education":
        return <GraduationCap className="h-4 w-4 text-indigo-500" />
      default:
        return <CalendarPlus2Icon className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "work":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950"
      case "personal":
        return "border-purple-500 bg-purple-50 dark:bg-purple-950"
      case "family":
        return "border-red-500 bg-red-50 dark:bg-red-950"
      case "health":
        return "border-green-500 bg-green-50 dark:bg-green-950"
      case "travel":
        return "border-amber-500 bg-amber-50 dark:bg-amber-950"
      case "education":
        return "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-900"
    }
  }

  const dueReminders = getDueReminders()
  const eventsForSelectedDate = getEventsForDate(date)

  // Generate days for week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Calendar & Reminders</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "month" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setViewMode("month")}
          >
            Month
          </Button>
          <Button variant={viewMode === "week" ? "secondary" : "outline"} size="sm" onClick={() => setViewMode("week")}>
            Week
          </Button>
          <Button variant={viewMode === "day" ? "secondary" : "outline"} size="sm" onClick={() => setViewMode("day")}>
            Day
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="reminders">
            <Bell className="h-4 w-4 mr-2" />
            Reminders
            {dueReminders.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {dueReminders.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                {viewMode === "month" && format(currentMonth, "MMMM yyyy")}
                {viewMode === "week" && `Week of ${format(currentWeek, "MMM d, yyyy")}`}
                {viewMode === "day" && format(date, "EEEE, MMMM d, yyyy")}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth} className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDate(new Date())
                    setCurrentMonth(new Date())
                    setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))
                  }}
                  size="sm"
                >
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "month" && (
                <div className="mb-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    className="rounded-md border"
                    components={{
                      DayContent: (props) => {
                        const eventsOnDay = getEventsForDate(props.date)
                        return (
                          <div className="relative">
                            {props.children}
                            {eventsOnDay.length > 0 && (
                              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                {eventsOnDay.length > 3 ? (
                                  <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                                    {eventsOnDay.length}
                                  </Badge>
                                ) : (
                                  <div className="flex space-x-0.5">
                                    {eventsOnDay.slice(0, 3).map((event, i) => (
                                      <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          event.category === "work"
                                            ? "bg-blue-500"
                                            : event.category === "personal"
                                              ? "bg-purple-500"
                                              : event.category === "family"
                                                ? "bg-red-500"
                                                : event.category === "health"
                                                  ? "bg-green-500"
                                                  : event.category === "travel"
                                                    ? "bg-amber-500"
                                                    : event.category === "education"
                                                      ? "bg-indigo-500"
                                                      : "bg-gray-500"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      },
                    }}
                  />
                </div>
              )}

              {viewMode === "week" && (
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day, i) => (
                      <div key={i} className="text-center">
                        <div className="text-sm font-medium">{format(day, "EEE")}</div>
                        <div
                          className={`text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto cursor-pointer hover:bg-accent ${
                            isSameDay(day, date) ? "bg-primary text-primary-foreground" : ""
                          }`}
                          onClick={() => setDate(day)}
                        >
                          {format(day, "d")}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {weekDays.map((day, i) => {
                      const dayEvents = events.filter((event) => isSameDay(event.date, day))
                      return (
                        <div key={i} className="min-h-[150px] border rounded-md p-1 overflow-y-auto">
                          {dayEvents.length > 0 ? (
                            <div className="space-y-1">
                              {dayEvents.map((event, j) => (
                                <div
                                  key={j}
                                  className={`text-xs p-1 rounded cursor-pointer border-l-2 ${getCategoryColor(event.category)} ${
                                    event.completed ? "opacity-50" : ""
                                  }`}
                                  onClick={() => handleEditEvent(event)}
                                >
                                  <div className="font-medium truncate flex items-center">
                                    {getCategoryIcon(event.category)}
                                    <span className="ml-1">{event.title}</span>
                                  </div>
                                  <div className="text-muted-foreground">{event.time || "All day"}</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                              No events
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {viewMode === "day" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Morning</h3>
                      {events
                        .filter(
                          (event) =>
                            isSameDay(event.date, date) && event.time && event.time.toLowerCase().includes("am"),
                        )
                        .sort((a, b) => {
                          const aTime = a.time?.toLowerCase() || ""
                          const bTime = b.time?.toLowerCase() || ""
                          return aTime.localeCompare(bTime)
                        })
                        .map((event, i) => (
                          <div
                            key={i}
                            className={`p-2 mb-2 rounded border-l-2 cursor-pointer ${getCategoryColor(event.category)} ${
                              event.completed ? "opacity-50" : ""
                            }`}
                            onClick={() => handleEditEvent(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium flex items-center">
                                  {getCategoryIcon(event.category)}
                                  <span className="ml-1">{event.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {event.time}
                                  {event.location && (
                                    <>
                                      <span className="mx-1">•</span>
                                      {event.location}
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleComplete(event.id, !event.completed)
                                  }}
                                  className="h-6 w-6"
                                >
                                  {event.completed ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                                </Button>
                              </div>
                            </div>
                            {event.attendees && event.attendees.length > 0 && (
                              <div className="text-xs text-muted-foreground flex items-center mt-1">
                                <Users className="h-3 w-3 mr-1" />
                                {event.attendees.length} attendee{event.attendees.length !== 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        ))}
                      {events.filter(
                        (event) => isSameDay(event.date, date) && event.time && event.time.toLowerCase().includes("am"),
                      ).length === 0 && (
                        <div className="text-sm text-muted-foreground p-2 border border-dashed rounded-md text-center">
                          No morning events
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Afternoon</h3>
                      {events
                        .filter(
                          (event) =>
                            isSameDay(event.date, date) && event.time && event.time.toLowerCase().includes("pm"),
                        )
                        .sort((a, b) => {
                          const aTime = a.time?.toLowerCase() || ""
                          const bTime = b.time?.toLowerCase() || ""
                          return aTime.localeCompare(bTime)
                        })
                        .map((event, i) => (
                          <div
                            key={i}
                            className={`p-2 mb-2 rounded border-l-2 cursor-pointer ${getCategoryColor(event.category)} ${
                              event.completed ? "opacity-50" : ""
                            }`}
                            onClick={() => handleEditEvent(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium flex items-center">
                                  {getCategoryIcon(event.category)}
                                  <span className="ml-1">{event.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {event.time}
                                  {event.location && (
                                    <>
                                      <span className="mx-1">•</span>
                                      {event.location}
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleComplete(event.id, !event.completed)
                                  }}
                                  className="h-6 w-6"
                                >
                                  {event.completed ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                                </Button>
                              </div>
                            </div>
                            {event.attendees && event.attendees.length > 0 && (
                              <div className="text-xs text-muted-foreground flex items-center mt-1">
                                <Users className="h-3 w-3 mr-1" />
                                {event.attendees.length} attendee{event.attendees.length !== 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        ))}
                      {events.filter(
                        (event) => isSameDay(event.date, date) && event.time && event.time.toLowerCase().includes("pm"),
                      ).length === 0 && (
                        <div className="text-sm text-muted-foreground p-2 border border-dashed rounded-md text-center">
                          No afternoon events
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">All-day Events</h3>
                    {events
                      .filter((event) => isSameDay(event.date, date) && event.isAllDay)
                      .map((event, i) => (
                        <div
                          key={i}
                          className={`p-2 mb-2 rounded border-l-2 cursor-pointer ${getCategoryColor(event.category)} ${
                            event.completed ? "opacity-50" : ""
                          }`}
                          onClick={() => handleEditEvent(event)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium flex items-center">
                                {getCategoryIcon(event.category)}
                                <span className="ml-1">{event.title}</span>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center mt-1">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                All day
                                {event.location && (
                                  <>
                                    <span className="mx-1">•</span>
                                    {event.location}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleToggleComplete(event.id, !event.completed)
                                }}
                                className="h-6 w-6"
                              >
                                {event.completed ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {events.filter((event) => isSameDay(event.date, date) && event.isAllDay).length === 0 && (
                      <div className="text-sm text-muted-foreground p-2 border border-dashed rounded-md text-center">
                        No all-day events
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-4">
                <Button onClick={handleAddEvent} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
              <CardDescription>Upcoming reminders and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {dueReminders.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <h3 className="font-medium">Due Reminders</h3>
                    </div>
                    <p className="text-sm mt-1">
                      You have {dueReminders.length} reminder{dueReminders.length !== 1 ? "s" : ""} that require your
                      attention.
                    </p>
                  </div>

                  {dueReminders.map((reminder) => {
                    const sourceEvent = events.find((e) => e.id === reminder.id.replace("reminder-", ""))

                    return (
                      <div
                        key={reminder.id}
                        className={`p-4 border border-destructive/20 rounded-md bg-destructive/5 ${
                          reminder.category
                            ? `border-l-4 ${
                                reminder.category === "work"
                                  ? "border-l-blue-500"
                                  : reminder.category === "personal"
                                    ? "border-l-purple-500"
                                    : reminder.category === "family"
                                      ? "border-l-red-500"
                                      : reminder.category === "health"
                                        ? "border-l-green-500"
                                        : reminder.category === "travel"
                                          ? "border-l-amber-500"
                                          : reminder.category === "education"
                                            ? "border-l-indigo-500"
                                            : "border-l-gray-500"
                              }`
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium flex items-center">
                              <Bell className="h-4 w-4 mr-2 text-destructive" />
                              {reminder.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(reminder.date, "MMMM d, yyyy")} at {reminder.time || "All day"}
                            </p>

                            {reminder.sourceEmailSubject && (
                              <div className="flex items-center text-xs text-muted-foreground mt-2">
                                <Mail className="h-3.5 w-3.5 mr-1" />
                                From: {reminder.sourceEmailSubject}
                              </div>
                            )}

                            {reminder.description && <div className="mt-2 text-sm">{reminder.description}</div>}
                          </div>

                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (sourceEvent) {
                                  handleToggleComplete(sourceEvent.id, true)
                                }
                              }}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Mark Complete
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (sourceEvent) {
                                  handleEditEvent(sourceEvent)
                                }
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No active reminders</p>
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button onClick={handleAddEvent} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={newEvent.category || "other"}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="family">Family</option>
                <option value="health">Health</option>
                <option value="travel">Travel</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={newEvent.location || ""}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Event location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date ? format(newEvent.date, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date()
                    setNewEvent({ ...newEvent, date })
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isAllDay">All Day</Label>
                  <Switch
                    id="isAllDay"
                    checked={newEvent.isAllDay || false}
                    onCheckedChange={(checked) => setNewEvent({ ...newEvent, isAllDay: checked })}
                  />
                </div>

                {!newEvent.isAllDay && (
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="recurring">Recurring Event</Label>
                <Switch
                  id="recurring"
                  checked={newEvent.recurring !== undefined && newEvent.recurring !== null}
                  onCheckedChange={(checked) =>
                    setNewEvent({
                      ...newEvent,
                      recurring: checked ? "weekly" : null,
                    })
                  }
                />
              </div>

              {newEvent.recurring && (
                <select
                  id="recurringType"
                  value={newEvent.recurring}
                  onChange={(e) => setNewEvent({ ...newEvent, recurring: e.target.value as any })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reminder">Set Reminder</Label>
                <Switch
                  id="reminder"
                  checked={newEvent.reminderTime !== undefined}
                  onCheckedChange={(checked) =>
                    setNewEvent({
                      ...newEvent,
                      reminderTime: checked ? 30 : undefined,
                    })
                  }
                />
              </div>

              {newEvent.reminderTime !== undefined && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Label htmlFor="reminderTime" className="flex items-center">
                    Remind me before:
                  </Label>
                  <select
                    id="reminderTime"
                    value={newEvent.reminderTime}
                    onChange={(e) => setNewEvent({ ...newEvent, reminderTime: Number(e.target.value) })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="1440">1 day</option>
                  </select>
                </div>
              )}
            </div>

            {selectedEvent && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="completed">Mark as Completed</Label>
                  <Switch
                    id="completed"
                    checked={newEvent.completed || false}
                    onCheckedChange={(checked) => setNewEvent({ ...newEvent, completed: checked })}
                  />
                </div>
              </div>
            )}

            {selectedEvent?.sourceEmailId && (
              <div className="mt-4 p-3 bg-muted/30 rounded-md text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  This event was extracted from an email
                </div>
                {selectedEvent.sourceEmailSubject && <p className="mt-1">Email: {selectedEvent.sourceEmailSubject}</p>}
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            {selectedEvent && (
              <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEvent}>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

