"use client"

import {
  ArrowLeft,
  Archive,
  Forward,
  MoreHorizontal,
  Reply,
  Star,
  Trash2,
  Paperclip,
  FolderPlus,
  Bot,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Email } from "@/types/email"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { QuickReply } from "@/components/quick-reply"

// Add this import at the top
// import { useState } from "react" // Removed duplicate import

// Add the EmailHistoryItem component before the EmailView component
interface KeyPoint {
  id: string
  text: string
  important: boolean
}

interface HistoryItem {
  id: string
  date: string
  subject: string
  snippet: string
  from: string
  keyPoints?: KeyPoint[]
}

function EmailHistoryItem({ historyItem }: { historyItem: HistoryItem }) {
  const { toast } = useToast()
  const [showAllPoints, setShowAllPoints] = useState(false)
  const hasMorePoints = historyItem.keyPoints && historyItem.keyPoints.length > 3
  const visiblePoints = showAllPoints ? historyItem.keyPoints : (historyItem.keyPoints || []).slice(0, 3)

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-3">
        <div className="flex justify-between items-start text-xs mb-1">
          <p className="font-medium">{historyItem.subject}</p>
          <p className="text-muted-foreground">{historyItem.date}</p>
        </div>
        <p className="text-xs text-muted-foreground">{historyItem.from}</p>
        <p className="text-xs mt-1">{historyItem.snippet}</p>

        {historyItem.keyPoints && historyItem.keyPoints.length > 0 && (
          <div className="mt-2 border-t border-border/50 pt-2">
            <p className="text-xs font-medium flex items-center gap-1.5">
              <span className="inline-block w-1 h-4 bg-primary rounded-sm"></span>
              Key Information:
            </p>
            <ul className="mt-1.5 space-y-1.5 pl-1">
              {visiblePoints.map((point) => (
                <li key={point.id} className="text-xs flex items-start gap-1.5 group">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${point.important ? "bg-primary" : "bg-muted-foreground"}`}
                  ></span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className={point.important ? "font-medium" : ""}>{point.text}</span>
                      {point.important && (
                        <span className="ml-1.5 text-[10px] bg-primary/10 text-primary px-1 py-0.5 rounded">
                          Important
                        </span>
                      )}
                    </div>
                    <div className="flex mt-0.5 text-[10px] text-muted-foreground">
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(point.text)
                          toast({
                            title: "Copied to clipboard",
                            description: "Key information copied to clipboard",
                            duration: 2000,
                          })
                        }}
                      >
                        Copy
                      </Button>
                      <span className="mx-1">•</span>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          // In a real app, this would insert the reference into the reply
                          toast({
                            title: "Reference added",
                            description: `Added reference to key point`,
                            duration: 2000,
                          })
                        }}
                      >
                        Reference
                      </Button>
                      <span className="mx-1">•</span>
                      <span>From: {historyItem.subject}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {hasMorePoints && (
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-xs mt-1.5"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAllPoints(!showAllPoints)
                }}
              >
                {showAllPoints ? "Show less" : `Show ${historyItem.keyPoints.length - 3} more points`}
              </Button>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Button variant="link" size="sm" className="p-0 h-auto text-xs">
            View full email
          </Button>
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto text-xs"
            onClick={(e) => {
              e.stopPropagation()
              // Add reference to reply functionality
              const reference = `[Re: ${historyItem.subject} (${historyItem.date})]`
              // In a real app, this would insert the reference into the reply
              toast({
                title: "Reference added",
                description: `Added reference to "${historyItem.subject}"`,
                duration: 2000,
              })
            }}
          >
            Reference in reply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface EmailViewProps {
  email: Email | null
  onBack: () => void
  onReply: (email: Email) => void
  onForward: (email: Email) => void
  onDelete: (emailId: string) => void
  onStar: (emailId: string) => void
  onArchive: (emailId: string) => void
  onMarkAsUnread: (emailId: string) => void
  onAddToFolder: (emailId: string, folderId: string) => void
  onSummarize: (email: Email) => void
  customFolders: { id: string; name: string }[]
  signature?: string
}

interface EmailHistoryItemProps {
  historyItem: {
    id: string
    date: string
    subject: string
    snippet: string
    from: string
    keyPoints: { id: string; text: string; important: boolean }[]
  }
}

export function EmailView({
  email,
  onBack,
  onReply,
  onForward,
  onDelete,
  onStar,
  onArchive,
  onMarkAsUnread,
  onAddToFolder,
  onSummarize,
  customFolders,
  signature,
}: EmailViewProps) {
  const { toast } = useToast()
  const [showHistory, setShowHistory] = useState(false)
  const [showAllPointsMap, setShowAllPointsMap] = useState<{ [key: string]: boolean }>({})

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground">Select an email to view</div>
    )
  }

  const formattedDate = format(new Date(email.date), "MMM d, yyyy 'at' h:mm a")

  // Mock attachments for demo purposes
  const hasAttachments = email.id === "4" || email.id === "7"
  const attachments = hasAttachments
    ? [
        { name: "document.pdf", size: "2.4 MB", type: "pdf" },
        { name: "image.jpg", size: "1.2 MB", type: "image" },
      ]
    : []

  // Mock email history
  const getEmailHistory = () => {
    if (email.subject.toLowerCase().includes("project update")) {
      return [
        {
          id: "history-1",
          date: "Mar 10, 2023",
          subject: "Project Kickoff",
          snippet: "We've officially started the project and assigned team members to their respective tasks.",
          from: email.from.name,
          keyPoints: [
            { id: "kp-1", text: "Project timeline: 3 months (March-May 2023)", important: true },
            { id: "kp-2", text: "Budget approved: $45,000", important: true },
            { id: "kp-3", text: "Team members: Alex, Sarah, Michael, John", important: false },
            { id: "kp-4", text: "Weekly status meetings scheduled for Mondays at 10 AM", important: true },
            { id: "kp-5", text: "Client requires bi-weekly demos", important: false },
          ],
        },
        {
          id: "history-2",
          date: "Feb 25, 2023",
          subject: "Project Proposal Approved",
          snippet: "Great news! The client has approved our project proposal and budget.",
          from: email.from.name,
          keyPoints: [
            { id: "kp-6", text: "Initial requirements document finalized", important: true },
            { id: "kp-7", text: "Scope includes 3 main deliverables", important: true },
            { id: "kp-8", text: "Client point of contact: Jennifer Smith", important: false },
          ],
        },
      ]
    } else if (email.subject.toLowerCase().includes("invoice")) {
      return [
        {
          id: "history-1",
          date: "Feb 15, 2023",
          subject: "Service Agreement",
          snippet: "Attached is the signed service agreement for the work to be performed in February.",
          from: email.from.name,
          keyPoints: [
            { id: "kp-9", text: "Payment terms: Net 30", important: true },
            { id: "kp-10", text: "Service period: Feb 1 - Feb 28, 2023", important: true },
            { id: "kp-11", text: "Hourly rate: $150/hour", important: true },
            { id: "kp-12", text: "Invoice to be sent on the last day of the month", important: false },
          ],
        },
      ]
    } else if (email.from.name.includes("Miller")) {
      return [
        {
          id: "history-1",
          date: "Mar 7, 2023",
          subject: "Design Mockups",
          snippet: "Here are the initial design mockups for your review. Let me know your thoughts.",
          from: email.from.name,
          keyPoints: [
            { id: "kp-13", text: "Color scheme: Blue and gray", important: false },
            { id: "kp-14", text: "Responsive design for mobile and desktop", important: true },
            { id: "kp-15", text: "Feedback needed by March 10", important: true },
          ],
        },
      ]
    }
    return []
  }

  const emailHistory = getEmailHistory()

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold truncate">{email.subject}</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onStar(email.id)}
            className={cn(email.starred && "text-yellow-400")}
          >
            <Star className={cn("h-4 w-4", email.starred && "fill-yellow-400")} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onReply(email)}>
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(email.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onArchive(email.id)}>
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onSummarize(email)}>
            <Bot className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onBack} className="hidden md:flex">
            <X className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onForward(email)}>
                <Forward className="h-4 w-4 mr-2" />
                Forward
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMarkAsUnread(email.id)}>Mark as unread</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Move to folder
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {customFolders.map((folder) => (
                    <DropdownMenuItem key={folder.id} onClick={() => onAddToFolder(email.id, folder.id)}>
                      {folder.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.print()}>Print</DropdownMenuItem>
              <DropdownMenuItem>Block sender</DropdownMenuItem>
              <DropdownMenuItem>Report spam</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-6 overflow-auto flex-1">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={email.from.avatar || `/placeholder.svg?height=40&width=40`} alt={email.from.name} />
            <AvatarFallback>{email.from.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{email.from.name}</p>
                <p className="text-sm text-muted-foreground">{email.from.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
              <span>To: </span>
              <span className="text-foreground">me</span>
            </div>

            {email.labels && email.labels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {email.labels.map((label, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <QuickReply
          email={email}
          signature={signature}
          onReplySent={(sentEmail) => {
            toast({
              title: "Reply sent",
              description: "Your quick reply has been sent successfully.",
            })
            onBack()
          }}
        />

        {/* Email History */}
        {emailHistory.length > 0 && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="mb-2 p-0 h-auto text-muted-foreground hover:text-foreground"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide email history" : "Show email history"} ({emailHistory.length})
            </Button>

            {showHistory && (
              <div className="space-y-4 mb-4">
                {emailHistory.map((historyItem) => (
                  <EmailHistoryItem key={historyItem.id} historyItem={historyItem} />
                ))}
              </div>
            )}
          </div>
        )}

        <Separator className="my-4" />

        <div className="prose prose-invert prose-sm max-w-none">
          {email.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {hasAttachments && (
          <>
            <Separator className="my-4" />

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Attachments ({attachments.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent/50 cursor-pointer"
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-6 flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onReply(email)}>
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onForward(email)}>
            <Forward className="h-4 w-4" />
            Forward
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onSummarize(email)}>
            <Bot className="h-4 w-4" />
            Summarize
          </Button>
        </div>
      </div>
    </div>
  )
}

