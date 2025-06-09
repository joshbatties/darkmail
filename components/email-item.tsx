"use client"

import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Email } from "@/types/email"
import { Star, Paperclip, Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EmailItemProps {
  email: Email
  isSelected: boolean
  onClick: () => void
  onSummarize: () => void
  aiCategory: string | null
  aiPriority: string
}

export function EmailItem({ email, isSelected, onClick, onSummarize, aiCategory, aiPriority }: EmailItemProps) {
  const formattedDate = formatDistanceToNow(new Date(email.date), { addSuffix: true })

  // Mock attachment detection
  const hasAttachments = email.id === "4" || email.id === "7"

  // Priority styling
  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-500/10 text-red-500 border-red-500/20"
    if (priority === "medium") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    return ""
  }

  return (
    <div
      className={cn(
        "p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors relative",
        isSelected && "bg-accent/80",
        !email.read && "bg-muted/30",
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={email.from.avatar || `/placeholder.svg?height=32&width=32`} alt={email.from.name} />
          <AvatarFallback>{email.from.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <p className={cn("truncate", !email.read && "font-semibold")}>{email.from.name}</p>
            <div className="flex items-center gap-1 ml-2 shrink-0">
              {email.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
              {hasAttachments && <Paperclip className="h-3 w-3 text-muted-foreground" />}
              <span className="text-xs text-muted-foreground whitespace-nowrap">{formattedDate}</span>
            </div>
          </div>

          <p className={cn("text-sm truncate", !email.read && "font-semibold")}>{email.subject}</p>

          <div className="flex items-center gap-2 mt-1">
            {aiCategory && (
              <Badge variant="outline" className="text-xs py-0 h-5 bg-primary/5">
                {aiCategory}
              </Badge>
            )}

            {aiPriority === "high" && (
              <Badge variant="outline" className={cn("text-xs py-0 h-5", getPriorityColor("high"))}>
                High Priority
              </Badge>
            )}

            <p className="text-xs text-muted-foreground truncate flex-1">
              {email.content.substring(0, 80)}
              {email.content.length > 80 ? "..." : ""}
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onSummarize()
        }}
      >
        <Bot className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

