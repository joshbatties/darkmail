"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Email } from "@/types/email"

interface SendEmailOptions {
  to: string
  cc?: string
  bcc?: string
  subject: string
  content: string
  attachments?: File[]
  replyTo?: string
  signature?: string
}

interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
  sentEmail?: Email
}

export function useSendEmail() {
  const { toast } = useToast()
  const [isSending, setIsSending] = useState(false)
  const [progress, setProgress] = useState(0)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateEmails = (emails: string): boolean => {
    if (!emails) return true
    return emails.split(",").every((email) => !email.trim() || validateEmail(email.trim()))
  }

  const sendEmail = async (options: SendEmailOptions): Promise<SendEmailResult> => {
    // Validate required fields
    if (!options.to || !options.subject || !options.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return { success: false, error: "Missing required fields" }
    }

    // Validate email addresses
    if (!validateEmail(options.to)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid recipient email address.",
        variant: "destructive",
      })
      return { success: false, error: "Invalid recipient email" }
    }

    if (options.cc && !validateEmails(options.cc)) {
      toast({
        title: "Invalid CC email",
        description: "Please enter valid CC email addresses.",
        variant: "destructive",
      })
      return { success: false, error: "Invalid CC email" }
    }

    if (options.bcc && !validateEmails(options.bcc)) {
      toast({
        title: "Invalid BCC email",
        description: "Please enter valid BCC email addresses.",
        variant: "destructive",
      })
      return { success: false, error: "Invalid BCC email" }
    }

    setIsSending(true)
    setProgress(0)

    // Simulate sending progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 20
        return newProgress > 90 ? 90 : newProgress
      })
    }, 300)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate sending attachments (takes longer with more attachments)
      if (options.attachments && options.attachments.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, options.attachments.length * 500))
      }

      // Complete the progress
      setProgress(100)
      clearInterval(progressInterval)

      // Simulate final processing
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create a sent email object to return
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

      // Add signature to content if provided
      const finalContent = options.signature ? `${options.content}\n\n${options.signature}` : options.content

      const sentEmail: Email = {
        id: messageId,
        from: {
          name: "You",
          email: "user@example.com",
        },
        to: [options.to],
        subject: options.subject,
        content: finalContent,
        date: new Date().toISOString(),
        read: true,
        starred: false,
        labels: ["sent"],
      }

      toast({
        title: "Email sent",
        description: "Your email has been sent successfully.",
      })

      return {
        success: true,
        messageId,
        sentEmail,
      }
    } catch (error) {
      clearInterval(progressInterval)

      toast({
        title: "Failed to send email",
        description: "There was an error sending your email. Please try again.",
        variant: "destructive",
      })

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    } finally {
      setIsSending(false)
    }
  }

  const sendQuickReply = async (
    to: string,
    subject: string,
    content: string,
    signature?: string,
  ): Promise<SendEmailResult> => {
    return sendEmail({
      to,
      subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
      content,
      signature,
    })
  }

  const forwardEmail = async (
    email: Email,
    to: string,
    additionalContent?: string,
    signature?: string,
  ): Promise<SendEmailResult> => {
    const forwardedContent = `
${additionalContent || ""}

---------- Forwarded message ---------
From: ${email.from.name} <${email.from.email}>
Date: ${new Date(email.date).toLocaleString()}
Subject: ${email.subject}
To: me

${email.content}
    `.trim()

    return sendEmail({
      to,
      subject: `Fwd: ${email.subject}`,
      content: forwardedContent,
      signature,
    })
  }

  return {
    sendEmail,
    sendQuickReply,
    forwardEmail,
    isSending,
    progress,
  }
}

// Helper component to display sending progress
export function SendingProgress({ progress }: { progress: number }) {
  return (
    <div className="mb-4">
      <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-muted-foreground mt-1 text-center">
        {progress < 100 ? "Sending email..." : "Finalizing..."}
      </p>
    </div>
  )
}

