"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Paperclip, Minimize2, Maximize2, Bot, Clock, Send, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { AIComposeAssistant } from "@/components/ai-compose-assistant"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSendEmail, SendingProgress } from "@/components/send-email-service"
import type { Email } from "@/types/email"

interface ComposeEmailProps {
  onClose: () => void
  replyTo?: {
    email: string
    subject: string
  }
  signature?: string
  onEmailSent?: (email: Email) => void
}

export function ComposeEmail({ onClose, replyTo, signature, onEmailSent }: ComposeEmailProps) {
  const { toast } = useToast()
  const [isMinimized, setIsMinimized] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [formData, setFormData] = useState({
    to: replyTo?.email || "",
    cc: "",
    bcc: "",
    subject: replyTo ? `Re: ${replyTo.subject}` : "",
    content: "",
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [showSchedulePopover, setShowSchedulePopover] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [includeSignature, setIncludeSignature] = useState(true)
  const { sendEmail, isSending, progress } = useSendEmail()
  const composeRef = useRef<HTMLDivElement>(null)

  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [autocompleteText, setAutocompleteText] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (composeRef.current && !composeRef.current.contains(event.target as Node)) {
        // Don't close if minimized
        if (!isMinimized) {
          // Check if we have content before closing
          if (
            formData.to ||
            formData.cc ||
            formData.bcc ||
            formData.subject ||
            formData.content ||
            attachments.length > 0
          ) {
            // Ask for confirmation if there's content
            const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close this draft?")
            if (confirmClose) {
              onClose()
            }
          } else {
            // No content, just close
            onClose()
          }
        }
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose, isMinimized, formData, attachments.length])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSendEmail = async () => {
    const result = await sendEmail({
      to: formData.to,
      cc: formData.cc,
      bcc: formData.bcc,
      subject: formData.subject,
      content: formData.content,
      attachments: attachments,
      replyTo: replyTo?.email,
      signature: includeSignature ? signature : undefined,
    })

    if (result.success && result.sentEmail) {
      if (onEmailSent) {
        onEmailSent(result.sentEmail)
      }
      onClose()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSendEmail()
  }

  const handleQuickSend = async (replyText: string) => {
    setFormData((prev) => ({
      ...prev,
      content: replyText,
    }))

    // Use setTimeout to ensure the state is updated before sending
    setTimeout(async () => {
      await handleSendEmail()
    }, 0)
  }

  const handleSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      toast({
        title: "Missing schedule information",
        description: "Please select both date and time for scheduling.",
        variant: "destructive",
      })
      return
    }

    // Validate form
    if (!formData.to || !formData.subject || !formData.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}:00`)

    toast({
      title: "Email scheduled",
      description: `Your email will be sent on ${scheduledDateTime.toLocaleString()}.`,
    })

    setShowSchedulePopover(false)
    onClose()
  }

  const handleInsertAIText = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${text}` : text,
    }))
    setShowAIAssistant(false)
  }

  // Smart reply suggestions (mock data)
  const smartReplies = [
    "Thanks for your email. I'll look into this and get back to you soon.",
    "I appreciate your message. Let me review the details and respond shortly.",
    "Got it, thanks! I'll prepare a response by tomorrow.",
  ]

  const handleImproveEmail = async () => {
    if (!formData.content) {
      toast({
        title: "Empty content",
        description: "Please write some content before improving it.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Improving your email",
      description: "Please wait while we enhance your email's grammar, tone, and clarity.",
    })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate improved content
    const improvedContent = improveEmailContent(formData.content)

    setFormData((prev) => ({
      ...prev,
      content: improvedContent,
    }))

    toast({
      title: "Email improved",
      description: "Your email has been enhanced for better grammar, tone, and clarity.",
    })
  }

  // Helper function to improve email content
  const improveEmailContent = (content: string) => {
    // This is a simplified simulation of AI improvement
    // In a real implementation, this would call an AI service

    // Some basic improvements
    let improved = content

    // Fix common grammar issues
    improved = improved.replace(/i(?=\s|$)/g, "I")
    improved = improved.replace(/\bi'm\b/g, "I'm")
    improved = improved.replace(/\bdont\b/g, "don't")
    improved = improved.replace(/\bcant\b/g, "can't")

    // Add professional tone enhancements
    if (!improved.includes("Thank you") && !improved.includes("thanks") && improved.length > 100) {
      improved += "\n\nThank you for your attention to this matter."
    }

    if (!improved.includes("Best regards") && !improved.includes("Sincerely") && improved.length > 100) {
      improved += "\n\nBest regards,"
    }

    // Improve clarity by breaking up long sentences
    const sentences = improved.split(/(?<=[.!?])\s+/)
    const improvedSentences = sentences.map((sentence) => {
      if (sentence.length > 120) {
        // Find a good place to break the sentence
        const midPoint = Math.floor(sentence.length / 2)
        const breakPoint = sentence.indexOf(" ", midPoint)
        if (breakPoint !== -1) {
          return (
            sentence.substring(0, breakPoint) +
            ". " +
            sentence.charAt(breakPoint + 1).toUpperCase() +
            sentence.substring(breakPoint + 2)
          )
        }
      }
      return sentence
    })

    return improvedSentences.join(" ")
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Tab key is pressed and there's content
    if (e.key === "Tab" && formData.content && !showAutocomplete) {
      e.preventDefault() // Prevent default tab behavior

      // Get current cursor position
      const textarea = e.currentTarget
      const cursorPos = textarea.selectionStart
      setCursorPosition(cursorPos)

      // Get the current sentence or partial sentence
      const currentText = formData.content.substring(0, cursorPos)
      const lastSentence = getLastSentence(currentText)

      if (lastSentence) {
        // Show loading state
        setShowAutocomplete(true)
        setAutocompleteText("...")

        // Generate autocomplete suggestion
        const suggestion = await generateAutocompleteSuggestion(lastSentence)
        setAutocompleteText(suggestion)
      }
    } else if (e.key === "Escape" && showAutocomplete) {
      // Cancel autocomplete on Escape
      e.preventDefault()
      setShowAutocomplete(false)
    } else if (e.key === "Tab" && showAutocomplete) {
      // Accept autocomplete suggestion on second Tab press
      e.preventDefault()
      acceptAutocomplete()
    }
  }

  // Helper function to get the last sentence or partial sentence
  const getLastSentence = (text: string): string => {
    // Find the last sentence boundary (., !, ?)
    const lastSentenceMatch = text.match(/[^.!?]*$/)
    return lastSentenceMatch ? lastSentenceMatch[0].trim() : ""
  }

  // Function to generate autocomplete suggestion
  const generateAutocompleteSuggestion = async (partialSentence: string): Promise<string> => {
    // In a real app, this would call an AI API
    // For demo purposes, we'll use some predefined completions
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    const completions: Record<string, string[]> = {
      "I would like to": [
        "schedule a meeting to discuss this further.",
        "thank you for your prompt response.",
        "request additional information about your services.",
      ],
      "Thank you for": [
        "your email. I appreciate your attention to this matter.",
        "the information you provided. It was very helpful.",
        "taking the time to consider my request.",
      ],
      "Please let me": [
        "know if you need any additional information.",
        "know when you're available to discuss this further.",
        "have your response by the end of the week.",
      ],
      "I am writing": [
        "to follow up on our previous conversation.",
        "to inquire about the status of my application.",
        "to express my interest in the position you advertised.",
      ],
      "I look forward": [
        "to hearing from you soon.",
        "to our meeting next week.",
        "to working with you on this project.",
      ],
    }

    // Find a matching starter or return a generic completion
    for (const [starter, endings] of Object.entries(completions)) {
      if (partialSentence.includes(starter)) {
        const randomIndex = Math.floor(Math.random() * endings.length)
        return endings[randomIndex]
      }
    }

    // Generic completions if no match found
    const genericCompletions = [
      "and I'll get back to you with more details soon.",
      "as discussed in our previous conversation.",
      "and I appreciate your understanding in this matter.",
      "which should address the concerns you raised.",
    ]

    const randomIndex = Math.floor(Math.random() * genericCompletions.length)
    return genericCompletions[randomIndex]
  }

  // Function to accept the autocomplete suggestion
  const acceptAutocomplete = () => {
    if (!showAutocomplete || !autocompleteText) return

    const beforeCursor = formData.content.substring(0, cursorPosition)
    const afterCursor = formData.content.substring(cursorPosition)

    setFormData((prev) => ({
      ...prev,
      content: beforeCursor + autocompleteText + afterCursor,
    }))

    setShowAutocomplete(false)

    // Focus and set cursor position after the inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newPosition = cursorPosition + autocompleteText.length
        textareaRef.current.setSelectionRange(newPosition, newPosition)
      }
    }, 0)
  }

  if (isMinimized) {
    return (
      <div
        ref={composeRef}
        className="fixed bottom-0 right-4 w-64 bg-card border border-border rounded-t-lg shadow-lg z-50"
      >
        <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setIsMinimized(false)}>
          <h3 className="font-medium text-sm truncate">{formData.subject || "New Message"}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(false)
              }}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={composeRef}
      className="fixed bottom-0 right-4 w-full max-w-xl bg-card border border-border rounded-t-lg shadow-lg z-50"
    >
      <div className="flex items-center justify-between p-3 bg-muted/50">
        <h3 className="font-medium">{replyTo ? "Reply" : "New Message"}</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(true)}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {isSending && <SendingProgress progress={progress} />}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="w-16 text-sm text-muted-foreground">To:</label>
            <Input
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="flex-1"
              placeholder="recipient@example.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-16 text-sm text-muted-foreground">Cc:</label>
            <Input
              name="cc"
              value={formData.cc}
              onChange={handleChange}
              className="flex-1"
              placeholder="cc@example.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-16 text-sm text-muted-foreground">Bcc:</label>
            <Input
              name="bcc"
              value={formData.bcc}
              onChange={handleChange}
              className="flex-1"
              placeholder="bcc@example.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-16 text-sm text-muted-foreground">Subject:</label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="flex-1"
              placeholder="Subject"
            />
          </div>

          <Separator />

          {replyTo && !formData.content && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Smart replies:</p>
              <div className="flex flex-wrap gap-2">
                {smartReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, content: reply }))}
                    className="text-xs"
                  >
                    {reply.length > 40 ? reply.substring(0, 40) + "..." : reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Textarea
            ref={textareaRef}
            name="content"
            value={formData.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Write your message here... (Press Tab for AI suggestions)"
            className="min-h-[200px] resize-none relative"
          />

          {showAutocomplete && autocompleteText && (
            <div className="relative -mt-4 mb-4">
              <div className="absolute right-4 top-0 bg-primary/10 text-primary px-3 py-1 rounded text-sm">
                Press Tab to accept: <span className="font-medium">{autocompleteText}</span>
              </div>
            </div>
          )}

          {signature && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeSignature}
                    onChange={(e) => setIncludeSignature(e.target.checked)}
                    className="rounded border-input"
                  />
                  Include signature
                </label>
              </div>

              {includeSignature && (
                <div className="border-t border-border pt-2 mt-2 text-sm text-muted-foreground">
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: signature }} />
                </div>
              )}
            </div>
          )}

          {showAIAssistant && (
            <div className="border border-border rounded-md p-4 bg-background">
              <AIComposeAssistant
                onInsertText={handleInsertAIText}
                initialPrompt={replyTo ? `Write a reply to an email about ${replyTo.subject}` : ""}
                onClose={() => setShowAIAssistant(false)}
              />
            </div>
          )}

          {attachments.length > 0 && (
            <div className="border border-border rounded-md p-2">
              <p className="text-sm font-medium mb-2">Attachments</p>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 rounded p-2 text-sm">
                    <span className="truncate">{file.name}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeAttachment(index)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label className="cursor-pointer">
                <input type="file" className="hidden" onChange={handleAttachment} multiple />
                <Button type="button" variant="outline" size="sm" className="gap-1">
                  <Paperclip className="h-4 w-4" />
                  Attach
                </Button>
              </label>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <Bot className="h-4 w-4" />
                {showAIAssistant ? "Hide AI" : "AI Assist"}
              </Button>

              <Popover open={showSchedulePopover} onOpenChange={setShowSchedulePopover}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="gap-1">
                    <Clock className="h-4 w-4" />
                    Schedule
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Schedule Email</h4>
                    <div className="space-y-2">
                      <label className="text-sm">Date</label>
                      <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Time</label>
                      <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                    </div>
                    <Button className="w-full" onClick={handleSchedule}>
                      <Send className="h-4 w-4 mr-2" />
                      Schedule Send
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleImproveEmail}
                className="gap-1"
                disabled={isSending || !formData.content}
              >
                <Sparkles className="h-4 w-4" />
                Improve
              </Button>
              <Button type="submit" disabled={isSending} className="gap-2">
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

