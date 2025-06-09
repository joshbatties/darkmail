"use client"
import { Bot, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Email } from "@/types/email"
import { useSendEmail } from "@/components/send-email-service"

interface QuickReplyProps {
  email: Email
  signature?: string
  onReplySent?: (sentEmail: Email) => void
}

export function QuickReply({ email, signature, onReplySent }: QuickReplyProps) {
  const { toast } = useToast()
  const { sendQuickReply, isSending } = useSendEmail()

  // Generate suggested reply based on email content
  const getSuggestedReply = () => {
    if (email.subject.toLowerCase().includes("meeting")) {
      return "I'm available for the meeting. Looking forward to discussing the project progress."
    } else if (email.subject.toLowerCase().includes("invoice")) {
      return "Thank you for sending the invoice. I'll process the payment right away."
    } else if (email.subject.toLowerCase().includes("update")) {
      return "Thanks for the update. I appreciate you keeping me informed on the progress."
    } else if (email.from.name.includes("Johnson")) {
      return "Thank you for your email, Alex. I'll review the Q1 results and get back to you about scheduling a meeting."
    } else {
      return "Thank you for your email. I'll review the information and respond shortly."
    }
  }

  const suggestedReply = getSuggestedReply()

  const handleSendQuickReply = async () => {
    const result = await sendQuickReply(email.from.email, email.subject, suggestedReply, signature)

    if (result.success && result.sentEmail && onReplySent) {
      onReplySent(result.sentEmail)
    }
  }

  return (
    <div className="mb-4 bg-primary/5 border border-primary/10 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium flex items-center gap-1">
          <Bot className="h-3.5 w-3.5" />
          Suggested Reply
        </p>
        <Button size="sm" className="h-7 gap-1" onClick={handleSendQuickReply} disabled={isSending}>
          {isSending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Send
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{suggestedReply}</p>
    </div>
  )
}

