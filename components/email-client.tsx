"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { EmailList } from "@/components/email-list"
import { EmailView } from "@/components/email-view"
import { ComposeEmail } from "@/components/compose-email"
import { useMobile } from "@/hooks/use-mobile"
import type { Email } from "@/types/email"
import { mockEmails } from "@/data/mock-emails"
import { Settings } from "@/components/settings"
import { EmailAutomation } from "@/components/email-automation"
import { useToast } from "@/hooks/use-toast"
import { EmailSummarizer } from "@/components/email-summarizer"
import { CalendarView } from "@/components/calendar-view"
import { AIBehaviorSystem } from "@/components/ai-behavior-system"
import type { UploadedFile, SelectedPreset } from "@/components/ai-behavior-system"
import { AutoReplyService } from "@/components/auto-reply-service"
import { DemoAutoReply } from "@/components/demo-auto-reply"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function EmailClient() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showEmailView, setShowEmailView] = useState(!isMobile)
  const [isComposing, setIsComposing] = useState(false)
  const [replyTo, setReplyTo] = useState<{ email: string; subject: string } | undefined>(undefined)
  const [showSettings, setShowSettings] = useState(false)
  const [showAutomation, setShowAutomation] = useState(false)
  const [showSummarizer, setShowSummarizer] = useState(false)
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [activeFolder, setActiveFolder] = useState("inbox")
  const [theme, setTheme] = useState("dark")
  const [signature, setSignature] = useState<string>(`Best regards,
John Doe
Senior Developer | Example Corp
Email: john.doe@example.com
Phone: (555) 123-4567`)
  const [customFolders, setCustomFolders] = useState([
    { id: "1", name: "Work" },
    { id: "2", name: "Personal" },
    { id: "3", name: "Finance" },
  ])

  // State for AI behavior system
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedPresets, setSelectedPresets] = useState<SelectedPreset[]>([])

  // Active view state (email, calendar, ai)
  const [activeView, setActiveView] = useState<"email" | "calendar" | "ai">("email")

  const [autoReplyRules, setAutoReplyRules] = useState([
    {
      id: "1",
      name: "Out of Office",
      condition: "to",
      value: "user@example.com",
      action: "reply",
      actionValue:
        "I'm currently out of office and will return on Monday. For urgent matters, please contact support@example.com.",
      enabled: true,
    },
    {
      id: "2",
      name: "Support Ticket",
      condition: "subject",
      value: "support",
      action: "reply",
      actionValue:
        "Thank you for contacting our support team. Your request has been received and we'll get back to you within 24 hours.",
      enabled: false,
    },
  ])

  const [showDemoAutoReply, setShowDemoAutoReply] = useState(false)

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const handleSelectEmail = (email: Email) => {
    // Mark email as read when selected
    if (!email.read) {
      const updatedEmails = emails.map((e) => (e.id === email.id ? { ...e, read: true } : e))
      setEmails(updatedEmails)
    }

    setSelectedEmail(email)
    if (isMobile) {
      setShowEmailView(true)
    }
  }

  const handleBackToList = () => {
    setShowEmailView(false)
  }

  const handleComposeNew = () => {
    setReplyTo(undefined)
    setIsComposing(true)
  }

  const handleReply = (email: Email) => {
    setReplyTo({
      email: email.from.email,
      subject: email.subject,
    })
    setIsComposing(true)
  }

  const handleForward = (email: Email) => {
    setReplyTo({
      email: "",
      subject: `Fwd: ${email.subject}`,
    })
    setIsComposing(true)

    // In a real app, we would also include the original email content
    toast({
      title: "Forward email",
      description: "Forwarding " + email.subject,
    })
  }

  const handleDeleteEmail = (emailId: string) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, labels: [...(email.labels || []), "trash"] } : email,
    )
    setEmails(updatedEmails)

    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
      if (isMobile) {
        setShowEmailView(false)
      }
    }

    toast({
      title: "Email moved to trash",
      description: "The email has been moved to the trash folder.",
    })
  }

  const handleStarEmail = (emailId: string) => {
    const updatedEmails = emails.map((email) => (email.id === emailId ? { ...email, starred: !email.starred } : email))
    setEmails(updatedEmails)

    if (selectedEmail?.id === emailId) {
      const updatedEmail = updatedEmails.find((email) => email.id === emailId)
      if (updatedEmail) {
        setSelectedEmail(updatedEmail)
      }
    }
  }

  const handleArchiveEmail = (emailId: string) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, labels: [...(email.labels || []), "archived"] } : email,
    )
    setEmails(updatedEmails)

    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
      if (isMobile) {
        setShowEmailView(false)
      }
    }

    toast({
      title: "Email archived",
      description: "The email has been moved to the archive folder.",
    })
  }

  const handleMarkAsUnread = (emailId: string) => {
    const updatedEmails = emails.map((email) => (email.id === emailId ? { ...email, read: false } : email))
    setEmails(updatedEmails)

    toast({
      title: "Marked as unread",
      description: "The email has been marked as unread.",
    })
  }

  const handleAddToFolder = (emailId: string, folderId: string) => {
    const folder = customFolders.find((f) => f.id === folderId)
    if (!folder) return

    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, labels: [...(email.labels || []), folder.name.toLowerCase()] } : email,
    )
    setEmails(updatedEmails)

    toast({
      title: "Email moved",
      description: `The email has been moved to the ${folder.name} folder.`,
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  const handleSignatureChange = (newSignature: string) => {
    setSignature(newSignature)
  }

  const handleSummarizeEmail = (email: Email) => {
    setSelectedEmail(email)
    setShowSummarizer(true)
  }

  // Add a function to handle email sent events
  const handleEmailSent = (sentEmail: Email) => {
    // Add the sent email to the emails array
    setEmails((prev) => [sentEmail, ...prev])

    toast({
      title: "Email sent",
      description: "Your email has been sent successfully.",
    })
  }

  // Handle file upload for AI Behavior System
  const handleFileUpload = (files: UploadedFile[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files])
  }

  // Handle file removal for AI Behavior System
  const handleFileRemove = (fileId: string) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
  }

  // Handle preset selection for AI Behavior System
  const handlePresetSelect = (categoryId: string, optionId: string) => {
    setSelectedPresets((prevPresets) => {
      // Remove any existing selection for this category
      const filtered = prevPresets.filter((preset) => preset.categoryId !== categoryId)
      // Add the new selection
      return [...filtered, { categoryId, optionId }]
    })
  }

  // Handle preset removal for AI Behavior System
  const handlePresetRemove = (categoryId: string) => {
    setSelectedPresets((prevPresets) => prevPresets.filter((preset) => preset.categoryId !== categoryId))
  }

  const handleAutoReply = (email: Email, replyText: string) => {
    // In a real app, this would send an actual email
    console.log(`Auto-replying to ${email.from.email} with: ${replyText}`)

    // Add the auto-reply to sent emails
    const autoReplyEmail: Email = {
      id: `auto_reply_${Date.now()}`,
      from: {
        name: "You",
        email: "user@example.com",
      },
      to: [email.from.email],
      subject: `Re: ${email.subject}`,
      content: replyText,
      date: new Date().toISOString(),
      read: true,
      starred: false,
      labels: ["sent", "auto-reply"],
    }

    setEmails((prev) => [autoReplyEmail, ...prev])
  }

  const filteredEmails = emails.filter((email) => {
    if (activeFolder === "inbox") return !email.labels?.includes("archived") && !email.labels?.includes("trash")
    if (activeFolder === "starred") return email.starred
    if (activeFolder === "sent") return email.labels?.includes("sent")
    if (activeFolder === "drafts") return email.labels?.includes("draft")
    if (activeFolder === "archive") return email.labels?.includes("archived")
    if (activeFolder === "spam") return email.labels?.includes("spam")
    if (activeFolder === "trash") return email.labels?.includes("trash")

    // Check custom folders
    const customFolder = customFolders.find((f) => f.id === activeFolder)
    if (customFolder) {
      return email.labels?.includes(customFolder.name.toLowerCase())
    }

    return true
  })

  return (
    <AutoReplyService rules={autoReplyRules} onAutoReply={handleAutoReply}>
      <div className={`${theme === "dark" ? "dark" : ""} h-screen flex flex-col bg-background text-foreground`}>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            activeFolder={activeFolder}
            setActiveFolder={setActiveFolder}
            activeView={activeView}
            setActiveView={setActiveView}
            onCompose={handleComposeNew}
            onOpenSettings={() => setShowSettings(true)}
            onOpenAutomation={() => setShowAutomation(true)}
            unreadCount={emails.filter((e) => !e.read).length}
            customFolders={customFolders}
          />
          <div className="flex flex-1 overflow-hidden">
            {activeView === "email" && (
              <>
                {(!isMobile || !showEmailView) && (
                  <EmailList
                    emails={filteredEmails}
                    onSelectEmail={handleSelectEmail}
                    selectedEmailId={selectedEmail?.id}
                    activeFolder={activeFolder}
                    customFolders={customFolders}
                    onSummarize={handleSummarizeEmail}
                  />
                )}
                {(!isMobile || showEmailView) && (
                  <EmailView
                    email={selectedEmail}
                    onBack={handleBackToList}
                    onReply={handleReply}
                    onForward={handleForward}
                    onDelete={handleDeleteEmail}
                    onStar={handleStarEmail}
                    onArchive={handleArchiveEmail}
                    onMarkAsUnread={handleMarkAsUnread}
                    onAddToFolder={handleAddToFolder}
                    onSummarize={handleSummarizeEmail}
                    customFolders={customFolders}
                    signature={signature}
                  />
                )}
              </>
            )}

            {activeView === "calendar" && (
              <div className="flex-1 p-4 md:p-6 overflow-auto">
                <CalendarView emails={emails} />
              </div>
            )}

            {activeView === "ai" && (
              <div className="flex-1 p-4 md:p-6 overflow-auto">
                <AIBehaviorSystem
                  uploadedFiles={uploadedFiles}
                  selectedPresets={selectedPresets}
                  onFileUpload={handleFileUpload}
                  onFileRemove={handleFileRemove}
                  onPresetSelect={handlePresetSelect}
                  onPresetRemove={handlePresetRemove}
                />
              </div>
            )}
          </div>
        </div>

        {isComposing && (
          <ComposeEmail
            onClose={() => setIsComposing(false)}
            replyTo={replyTo}
            signature={signature}
            onEmailSent={handleEmailSent}
          />
        )}

        {showSettings && (
          <Settings
            onClose={() => setShowSettings(false)}
            onThemeChange={handleThemeChange}
            currentTheme={theme}
            signature={signature}
            onSignatureChange={handleSignatureChange}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => setShowDemoAutoReply(!showDemoAutoReply)}
            >
              <Mail className="h-4 w-4" />
              Test Auto-Reply
            </Button>
          </Settings>
        )}

        {showDemoAutoReply && (
          <div className="mt-4">
            <DemoAutoReply />
          </div>
        )}

        {showAutomation && (
          <EmailAutomation
            onClose={() => setShowAutomation(false)}
            initialRules={autoReplyRules}
            onRulesChange={setAutoReplyRules}
          />
        )}

        {showSummarizer && selectedEmail && (
          <EmailSummarizer email={selectedEmail} onClose={() => setShowSummarizer(false)} />
        )}
      </div>
    </AutoReplyService>
  )
}

