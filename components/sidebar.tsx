"use client"
import {
  Archive,
  ArchiveX,
  File,
  Folder,
  Inbox,
  Mail,
  PenSquare,
  Send,
  Settings,
  Star,
  Trash2,
  Wand2,
  Calendar,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface SidebarProps {
  activeFolder: string
  setActiveFolder: (folder: string) => void
  activeView: "email" | "calendar" | "ai" // Add activeView
  setActiveView: (view: "email" | "calendar" | "ai") => void // Add setActiveView
  onCompose: () => void
  onOpenSettings: () => void
  onOpenAutomation: () => void
  unreadCount: number
  customFolders: { id: string; name: string }[]
}

export function Sidebar({
  activeFolder,
  setActiveFolder,
  activeView,
  setActiveView,
  onCompose,
  onOpenSettings,
  onOpenAutomation,
  unreadCount,
  customFolders,
}: SidebarProps) {
  const [foldersOpen, setFoldersOpen] = useState(true)

  const defaultFolders = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: unreadCount },
    { id: "starred", label: "Starred", icon: Star },
    { id: "sent", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: File },
    { id: "archive", label: "Archive", icon: Archive },
    { id: "spam", label: "Spam", icon: ArchiveX },
    { id: "trash", label: "Trash", icon: Trash2 },
  ]

  const handleFolderClick = (folderId: string) => {
    setActiveFolder(folderId)
    setActiveView("email") // Switch to email view when clicking a folder
  }

  return (
    <div className="w-16 md:w-64 border-r border-border bg-card/80 flex flex-col h-full">
      <div className="p-4 flex items-center justify-center md:justify-start gap-2">
        <Mail className="h-6 w-6 text-primary" />
        <span className="font-semibold text-xl hidden md:inline">AI Mail</span>
      </div>

      <div className="px-2 py-4">
        <Button
          className="w-full justify-start gap-2 mb-4 bg-primary text-primary-foreground hover:bg-primary/90"
          size="sm"
          onClick={onCompose}
        >
          <PenSquare className="h-4 w-4" />
          <span className="hidden md:inline">Compose</span>
        </Button>
      </div>

      {/* Main navigation */}
      <div className="space-y-1 px-2 mb-4">
        <Button
          variant={activeView === "email" ? "secondary" : "ghost"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => {
            setActiveView("email")
            setActiveFolder("inbox") // Reset to inbox when switching to email view
          }}
        >
          <Mail className="h-4 w-4" />
          <span className="hidden md:inline">Mail</span>
        </Button>

        <Button
          variant={activeView === "calendar" ? "secondary" : "ghost"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setActiveView("calendar")}
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden md:inline">Calendar</span>
        </Button>

        <Button
          variant={activeView === "ai" ? "secondary" : "ghost"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setActiveView("ai")}
        >
          <Bot className="h-4 w-4" />
          <span className="hidden md:inline">AI Assistant</span>
        </Button>
      </div>

      <Separator className="mb-2" />

      {/* Folders - Only show when email view is active */}
      {activeView === "email" && (
        <nav className="space-y-1 px-2 flex-1 overflow-y-auto">
          {defaultFolders.map((folder) => (
            <Button
              key={folder.id}
              variant={activeFolder === folder.id ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => handleFolderClick(folder.id)}
            >
              <folder.icon className="h-4 w-4" />
              <span className="hidden md:inline">{folder.label}</span>
              {folder.count && folder.count > 0 && (
                <Badge variant="secondary" className={cn("ml-auto", activeFolder === folder.id ? "bg-background" : "")}>
                  {folder.count}
                </Badge>
              )}
            </Button>
          ))}

          {customFolders.length > 0 && (
            <Collapsible open={foldersOpen} onOpenChange={setFoldersOpen} className="mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Folder className="h-4 w-4" />
                  <span className="hidden md:inline">Folders</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-2 space-y-1 mt-1">
                {customFolders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant={activeFolder === folder.id ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => handleFolderClick(folder.id)}
                  >
                    <Folder className="h-4 w-4" />
                    <span className="hidden md:inline">{folder.name}</span>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </nav>
      )}

      <div className="mt-auto">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 mb-2" onClick={onOpenAutomation}>
          <Wand2 className="h-4 w-4" />
          <span className="hidden md:inline">Automation</span>
        </Button>

        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 mb-2" onClick={onOpenSettings}>
          <Settings className="h-4 w-4" />
          <span className="hidden md:inline">Settings</span>
        </Button>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

