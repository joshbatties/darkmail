"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Calendar, Sparkles } from "lucide-react"
import { generateEmailSuggestion } from "@/lib/ai-utils"

interface ComposeFormProps {
  initialRecipient?: string
  initialSubject?: string
  onClose: () => void
  onScheduleMeeting: () => void
}

export function ComposeForm({
  initialRecipient = "",
  initialSubject = "",
  onClose,
  onScheduleMeeting,
}: ComposeFormProps) {
  const [to, setTo] = useState(initialRecipient)
  const [subject, setSubject] = useState(initialSubject)
  const [body, setBody] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Track cursor position in the textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setBody(newText)
    setCursorPosition(e.target.selectionStart || 0)

    // Reset suggestion when text changes
    setSuggestion("")
    setShowSuggestion(false)

    // Only generate suggestions if we have some text
    if (newText.trim().length > 10) {
      generateSuggestion(newText)
    }
  }

  // Generate AI suggestion based on current text
  const generateSuggestion = async (text: string) => {
    try {
      // In a real implementation, this would call the AI service
      const result = await generateEmailSuggestion(text)
      if (result && result.suggestion) {
        setSuggestion(result.suggestion)
        setShowSuggestion(true)
      }
    } catch (error) {
      console.error("Error generating suggestion:", error)
    }
  }

  // Handle keyboard events for accepting suggestions
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Accept suggestion with Tab key
    if (e.key === "Tab" && showSuggestion && suggestion) {
      e.preventDefault()

      // Insert the suggestion at the current cursor position
      const newText = body.substring(0, cursorPosition) + suggestion + body.substring(cursorPosition)
      setBody(newText)

      // Reset suggestion
      setSuggestion("")
      setShowSuggestion(false)

      // Set cursor position after the inserted suggestion
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = cursorPosition + suggestion.length
          textareaRef.current.selectionStart = newPosition
          textareaRef.current.selectionEnd = newPosition
          setCursorPosition(newPosition)
        }
      }, 0)
    }

    // Escape key to dismiss suggestion
    if (e.key === "Escape" && showSuggestion) {
      setSuggestion("")
      setShowSuggestion(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Close compose window
    onClose()
  }

  return (
    <form onSubmit={handleSend} className="flex flex-col flex-1">
      <div className="p-4 space-y-4 flex-1">
        <div>
          <Input type="email" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>
        <div>
          <Input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="Compose your message..."
            className="flex-1 min-h-[200px] resize-none pr-8"
            value={body}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
          />

          {showSuggestion && suggestion && (
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
                {body.substring(0, cursorPosition)}
                <span className="text-muted-foreground bg-muted/50">{suggestion}</span>
              </div>
            </div>
          )}

          {showSuggestion && suggestion && (
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-1 py-0.5 rounded border">
              Press Tab to accept
            </div>
          )}
        </div>
      </div>

      <div className="border-t p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button type="submit" disabled={isSending} className="gap-2">
            <Send className="h-4 w-4" />
            {isSending ? "Sending..." : "Send"}
          </Button>
          <Button type="button" variant="outline" className="gap-2" onClick={onScheduleMeeting}>
            <Calendar className="h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button type="button" variant="outline" className="gap-2">
            <Paperclip className="h-4 w-4" />
            Attach
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => generateSuggestion(body)}
            title="Generate AI suggestion"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
        <Button type="button" variant="ghost" onClick={onClose}>
          Discard
        </Button>
      </div>
    </form>
  )
}
