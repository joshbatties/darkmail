"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Email } from "@/types/email"

export interface AutoReplyRule {
  id: string
  name: string
  condition: "from" | "to" | "subject" | "content"
  value: string
  action: "reply"
  actionValue: string
  enabled: boolean
}

interface AutoReplyServiceProps {
  rules: AutoReplyRule[]
  onAutoReply?: (email: Email, reply: string) => void
  children: React.ReactNode
}

export function AutoReplyService({ rules, onAutoReply, children }: AutoReplyServiceProps) {
  const { toast } = useToast()
  const [activeRules, setActiveRules] = useState<AutoReplyRule[]>([])

  // Update active rules when rules change
  useEffect(() => {
    setActiveRules(rules.filter((rule) => rule.enabled && rule.action === "reply"))
  }, [rules])

  // Function to check if an email matches a rule
  const matchesRule = (email: Email, rule: AutoReplyRule): boolean => {
    const value = rule.value.toLowerCase()

    switch (rule.condition) {
      case "from":
        return email.from.email.toLowerCase().includes(value) || email.from.name.toLowerCase().includes(value)
      case "to":
        return email.to.some((recipient) => recipient.toLowerCase().includes(value))
      case "subject":
        return email.subject.toLowerCase().includes(value)
      case "content":
        return email.content.toLowerCase().includes(value)
      default:
        return false
    }
  }

  // Function to process an incoming email
  const processIncomingEmail = (email: Email) => {
    // Check if email matches any active auto-reply rule
    for (const rule of activeRules) {
      if (matchesRule(email, rule)) {
        // Found a matching rule, trigger auto-reply
        if (onAutoReply) {
          onAutoReply(email, rule.actionValue)

          toast({
            title: "Auto-reply sent",
            description: `Auto-replied to "${email.subject}" using rule "${rule.name}"`,
          })
        }

        // Only apply the first matching rule
        break
      }
    }
  }

  // Expose the processIncomingEmail function to parent components
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore - Adding a custom property to window for demo purposes
      window.__processIncomingEmail = processIncomingEmail
    }

    return () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        delete window.__processIncomingEmail
      }
    }
  }, [activeRules, onAutoReply])

  return <>{children}</>
}

