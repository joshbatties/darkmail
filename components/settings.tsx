"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Moon, Sun, Monitor, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface SettingsProps {
  onClose: () => void
  onThemeChange?: (theme: string) => void
  currentTheme?: string
  signature?: string
  onSignatureChange?: (signature: string) => void
}

export function Settings({
  onClose,
  onThemeChange,
  currentTheme = "dark",
  signature = "",
  onSignatureChange,
}: SettingsProps) {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    desktopNotifications: false,
    autoReadMessages: true,
    showUnreadCount: true,
    theme: currentTheme,
    density: "comfortable",
    language: "english",
    signature: signature,
    vacationResponder: false,
    vacationMessage: "",
    vacationStartDate: "",
    vacationEndDate: "",
  })

  const [contacts, setContacts] = useState([
    { id: "1", name: "Alex Johnson", email: "alex.johnson@example.com" },
    { id: "2", name: "Sarah Miller", email: "sarah.miller@example.com" },
    { id: "3", name: "Michael Chen", email: "michael.chen@example.com" },
  ])

  const [newContact, setNewContact] = useState({ name: "", email: "" })
  const [customFolders, setCustomFolders] = useState([
    { id: "1", name: "Work" },
    { id: "2", name: "Personal" },
    { id: "3", name: "Finance" },
  ])
  const [newFolder, setNewFolder] = useState("")
  const [signatureEditorMode, setSignatureEditorMode] = useState<"plain" | "html">("plain")

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))

    // If theme is changed, notify parent component
    if (key === "theme" && onThemeChange) {
      onThemeChange(value)
    }
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: "Missing information",
        description: "Please provide both name and email.",
        variant: "destructive",
      })
      return
    }

    if (!newContact.email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      })
      return
    }

    setContacts((prev) => [...prev, { id: Date.now().toString(), ...newContact }])
    setNewContact({ name: "", email: "" })

    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your contacts.`,
    })
  }

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))

    toast({
      title: "Contact deleted",
      description: "The contact has been removed.",
    })
  }

  const handleAddFolder = () => {
    if (!newFolder) {
      toast({
        title: "Missing information",
        description: "Please provide a folder name.",
        variant: "destructive",
      })
      return
    }

    setCustomFolders((prev) => [...prev, { id: Date.now().toString(), name: newFolder }])
    setNewFolder("")

    toast({
      title: "Folder added",
      description: `${newFolder} folder has been created.`,
    })
  }

  const handleDeleteFolder = (id: string) => {
    setCustomFolders((prev) => prev.filter((folder) => folder.id !== id))

    toast({
      title: "Folder deleted",
      description: "The folder has been removed.",
    })
  }

  const handleSaveSettings = () => {
    // Update signature if the callback is provided
    if (onSignatureChange) {
      onSignatureChange(settings.signature)
    }

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
    onClose()
  }

  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings((prev) => ({
      ...prev,
      signature: e.target.value,
    }))
  }

  // Sample signature templates
  const signatureTemplates = [
    {
      name: "Professional",
      content: `Best regards,
John Doe
Senior Developer | Example Corp
Email: john.doe@example.com
Phone: (555) 123-4567`,
    },
    {
      name: "Minimal",
      content: `--
John Doe
john.doe@example.com`,
    },
    {
      name: "Corporate",
      content: `John Doe
Senior Developer
Example Corporation

Email: john.doe@example.com
Phone: (555) 123-4567
Website: www.example.com

CONFIDENTIALITY NOTICE: This email is intended only for the person to whom it is addressed.`,
    },
  ]

  const applySignatureTemplate = (template: string) => {
    setSettings((prev) => ({
      ...prev,
      signature: template,
    }))
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">Customize your email experience</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-2">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="folders">Folders</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="flex flex-col gap-1">
                    <span>Email notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive notifications for new emails
                    </span>
                  </Label>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={() => handleToggle("notifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="soundEffects" className="flex flex-col gap-1">
                    <span>Sound effects</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Play sounds for notifications and actions
                    </span>
                  </Label>
                  <Switch
                    id="soundEffects"
                    checked={settings.soundEffects}
                    onCheckedChange={() => handleToggle("soundEffects")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="desktopNotifications" className="flex flex-col gap-1">
                    <span>Desktop notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Show notifications on your desktop
                    </span>
                  </Label>
                  <Switch
                    id="desktopNotifications"
                    checked={settings.desktopNotifications}
                    onCheckedChange={() => handleToggle("desktopNotifications")}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Email Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoReadMessages" className="flex flex-col gap-1">
                    <span>Auto-read messages</span>
                    <span className="font-normal text-xs text-muted-foreground">Mark messages as read when opened</span>
                  </Label>
                  <Switch
                    id="autoReadMessages"
                    checked={settings.autoReadMessages}
                    onCheckedChange={() => handleToggle("autoReadMessages")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="language" className="flex flex-col gap-1">
                    <span>Language</span>
                    <span className="font-normal text-xs text-muted-foreground">Select your preferred language</span>
                  </Label>
                  <Select value={settings.language} onValueChange={(value) => handleChange("language", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Signature</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2">
                    <Button
                      variant={signatureEditorMode === "plain" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSignatureEditorMode("plain")}
                    >
                      Plain Text
                    </Button>
                    <Button
                      variant={signatureEditorMode === "html" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSignatureEditorMode("html")}
                    >
                      HTML
                    </Button>
                  </div>
                  <Select
                    onValueChange={(value) => {
                      const template = signatureTemplates.find((t) => t.name === value)
                      if (template) {
                        applySignatureTemplate(template.content)
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {signatureTemplates.map((template) => (
                        <SelectItem key={template.name} value={template.name}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Enter your email signature"
                  value={settings.signature}
                  onChange={handleSignatureChange}
                  className="min-h-[150px] font-mono"
                />
                {settings.signature && (
                  <div className="border rounded-md p-3 mt-2">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="text-sm text-muted-foreground border-t border-border pt-2">
                      <div dangerouslySetInnerHTML={{ __html: settings.signature }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Vacation Responder</h3>
                <Switch
                  id="vacationResponder"
                  checked={settings.vacationResponder}
                  onCheckedChange={() => handleToggle("vacationResponder")}
                />
              </div>

              {settings.vacationResponder && (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Enter your vacation message"
                    value={settings.vacationMessage}
                    onChange={(e) => handleChange("vacationMessage", e.target.value)}
                    className="min-h-[100px]"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={settings.vacationStartDate}
                        onChange={(e) => handleChange("vacationStartDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={settings.vacationEndDate}
                        onChange={(e) => handleChange("vacationEndDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.theme === "light" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("theme", "light")}
                >
                  <Sun className="h-6 w-6" />
                  <span>Light</span>
                </div>

                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.theme === "dark" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("theme", "dark")}
                >
                  <Moon className="h-6 w-6" />
                  <span>Dark</span>
                </div>

                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.theme === "system" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("theme", "system")}
                >
                  <Monitor className="h-6 w-6" />
                  <span>System</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Display Density</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.density === "comfortable" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("density", "comfortable")}
                >
                  <div className="w-full space-y-3">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </div>
                  <span>Comfortable</span>
                </div>

                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.density === "compact" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("density", "compact")}
                >
                  <div className="w-full space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                  <span>Compact</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Reading Pane</h3>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.readingPane === "right" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("readingPane", "right")}
                >
                  <div className="w-full h-20 flex">
                    <div className="w-1/3 bg-muted rounded-l"></div>
                    <div className="w-2/3 bg-muted/50 rounded-r"></div>
                  </div>
                  <span>Right</span>
                </div>

                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.readingPane === "bottom" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("readingPane", "bottom")}
                >
                  <div className="w-full h-20 flex flex-col">
                    <div className="h-1/3 bg-muted rounded-t"></div>
                    <div className="h-2/3 bg-muted/50 rounded-b"></div>
                  </div>
                  <span>Bottom</span>
                </div>

                <div
                  className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent/50 ${settings.readingPane === "hidden" ? "bg-accent border-primary" : ""}`}
                  onClick={() => handleChange("readingPane", "hidden")}
                >
                  <div className="w-full h-20 flex">
                    <div className="w-full bg-muted rounded"></div>
                  </div>
                  <span>Hidden</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Add Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Name</Label>
                  <Input
                    id="contactName"
                    placeholder="Contact name"
                    value={newContact.name}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    placeholder="email@example.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={handleAddContact} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Your Contacts</h3>
              <div className="border rounded-lg divide-y divide-border max-h-[300px] overflow-y-auto">
                {contacts.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No contacts found</div>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="folders" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Add Custom Folder</h3>
              <div className="flex gap-2">
                <Input placeholder="Folder name" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
                <Button onClick={handleAddFolder}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Your Folders</h3>
              <div className="border rounded-lg divide-y divide-border max-h-[300px] overflow-y-auto">
                {customFolders.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No custom folders found</div>
                ) : (
                  customFolders.map((folder) => (
                    <div key={folder.id} className="p-3 flex items-center justify-between">
                      <p className="font-medium">{folder.name}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteFolder(folder.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

