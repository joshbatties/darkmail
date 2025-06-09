"use client"

import { useState } from "react"
import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { EmailItem } from "@/components/email-item"
import type { Email } from "@/types/email"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EmailListProps {
  emails: Email[]
  onSelectEmail: (email: Email) => void
  onSummarize: (email: Email) => void
  selectedEmailId?: string
  activeFolder: string
  customFolders: { id: string; name: string }[]
}

export function EmailList({
  emails,
  onSelectEmail,
  onSummarize,
  selectedEmailId,
  activeFolder,
  customFolders,
}: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOptions, setFilterOptions] = useState({
    unreadOnly: false,
    withAttachments: false,
    sortBy: "date", // date, sender, subject
    aiCategorized: false,
    priority: "all", // all, high, medium, low
  })

  const getFolderTitle = (folder: string) => {
    if (folder === "inbox") return "Inbox"
    if (folder === "starred") return "Starred"
    if (folder === "sent") return "Sent"
    if (folder === "drafts") return "Drafts"
    if (folder === "archive") return "Archive"
    if (folder === "spam") return "Spam"
    if (folder === "trash") return "Trash"

    // Check if it's a custom folder
    const customFolder = customFolders.find((f) => f.id === folder)
    if (customFolder) return customFolder.name

    return "Inbox"
  }

  // Mock AI categorization
  const getAICategory = (email: Email) => {
    if (email.subject.toLowerCase().includes("meeting")) return "Meeting"
    if (email.subject.toLowerCase().includes("update")) return "Update"
    if (email.subject.toLowerCase().includes("invoice")) return "Finance"
    if (email.from.email.includes("johnson")) return "Client"
    return null
  }

  // Mock priority detection
  const getAIPriority = (email: Email) => {
    if (email.subject.toLowerCase().includes("urgent") || email.id === "1") return "high"
    if (email.subject.toLowerCase().includes("update") || email.id === "5") return "medium"
    return "low"
  }

  const filteredEmails = emails
    .filter((email) => {
      // Apply search filter
      const matchesSearch =
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.content.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply unread filter
      const matchesUnread = filterOptions.unreadOnly ? !email.read : true

      // Apply attachments filter (mock implementation)
      const hasAttachments = email.id === "4" || email.id === "7"
      const matchesAttachments = filterOptions.withAttachments ? hasAttachments : true

      // Apply AI category filter
      const matchesAICategory = filterOptions.aiCategorized ? getAICategory(email) !== null : true

      // Apply priority filter
      const matchesPriority = filterOptions.priority === "all" ? true : getAIPriority(email) === filterOptions.priority

      return matchesSearch && matchesUnread && matchesAttachments && matchesAICategory && matchesPriority
    })
    .sort((a, b) => {
      // Apply sorting
      if (filterOptions.sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (filterOptions.sortBy === "sender") {
        return a.from.name.localeCompare(b.from.name)
      } else if (filterOptions.sortBy === "subject") {
        return a.subject.localeCompare(b.subject)
      }
      return 0
    })

  return (
    <div className="w-full md:w-96 border-r border-border bg-background flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails"
            className="pl-8 pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <h2 className="font-medium">{getFolderTitle(activeFolder)}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{filteredEmails.length} emails</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={filterOptions.unreadOnly}
                onCheckedChange={(checked) => setFilterOptions((prev) => ({ ...prev, unreadOnly: checked }))}
              >
                Unread only
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.withAttachments}
                onCheckedChange={(checked) => setFilterOptions((prev) => ({ ...prev, withAttachments: checked }))}
              >
                With attachments
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.aiCategorized}
                onCheckedChange={(checked) => setFilterOptions((prev) => ({ ...prev, aiCategorized: checked }))}
              >
                AI categorized
              </DropdownMenuCheckboxItem>
              <Separator className="my-2" />
              <DropdownMenuCheckboxItem
                checked={filterOptions.priority === "all"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, priority: "all" }))
                }}
              >
                All priorities
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.priority === "high"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, priority: "high" }))
                }}
              >
                High priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.priority === "medium"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, priority: "medium" }))
                }}
              >
                Medium priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.priority === "low"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, priority: "low" }))
                }}
              >
                Low priority
              </DropdownMenuCheckboxItem>
              <Separator className="my-2" />
              <DropdownMenuCheckboxItem
                checked={filterOptions.sortBy === "date"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, sortBy: "date" }))
                }}
              >
                Sort by date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.sortBy === "sender"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, sortBy: "sender" }))
                }}
              >
                Sort by sender
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterOptions.sortBy === "subject"}
                onCheckedChange={(checked) => {
                  if (checked) setFilterOptions((prev) => ({ ...prev, sortBy: "subject" }))
                }}
              >
                Sort by subject
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No emails found</p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              isSelected={email.id === selectedEmailId}
              onClick={() => onSelectEmail(email)}
              onSummarize={() => onSummarize(email)}
              aiCategory={getAICategory(email)}
              aiPriority={getAIPriority(email)}
            />
          ))
        )}
      </div>
    </div>
  )
}

