"use client"

import { Textarea } from "@/components/ui/textarea"

import React from "react"

import { useState, useEffect } from "react"
import { Clock, Plus, Trash2, Save, ArrowRight, AtSign, Hash, MessageSquare, Tag, Filter, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface EmailAutomationProps {
  onClose: () => void
  initialRules?: any[]
  onRulesChange?: (rules: any[]) => void
}

export function EmailAutomation({ onClose, initialRules = [], onRulesChange }: EmailAutomationProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("rules")
  const [showNewRuleDialog, setShowNewRuleDialog] = useState(false)
  const [showNewScheduleDialog, setShowNewScheduleDialog] = useState(false)

  // Rules state
  const [rules, setRules] = useState(
    initialRules.length > 0
      ? initialRules
      : [
          {
            id: "1",
            name: "Client Emails",
            condition: "from",
            value: "@clientcompany.com",
            action: "label",
            actionValue: "Client",
            enabled: true,
          },
          {
            id: "2",
            name: "Newsletter Filter",
            condition: "subject",
            value: "newsletter",
            action: "move",
            actionValue: "Newsletters",
            enabled: true,
          },
          {
            id: "3",
            name: "Auto-Reply to Support",
            condition: "to",
            value: "support@mycompany.com",
            action: "reply",
            actionValue: "Thank you for contacting support. We'll get back to you within 24 hours.",
            enabled: false,
          },
        ],
  )

  // New rule form state
  const [newRule, setNewRule] = useState({
    name: "",
    condition: "from",
    value: "",
    action: "label",
    actionValue: "",
  })

  // Scheduled emails state
  const [scheduledEmails, setScheduledEmails] = useState([
    {
      id: "1",
      to: "team@example.com",
      subject: "Weekly Status Update",
      content: "Here's our weekly status update...",
      schedule: "weekly",
      day: "Monday",
      time: "09:00",
      enabled: true,
    },
    {
      id: "2",
      to: "client@example.com",
      subject: "Project Progress Report",
      content: "Progress update on our ongoing project...",
      schedule: "monthly",
      day: "1",
      time: "10:00",
      enabled: true,
    },
  ])

  // New scheduled email form state
  const [newSchedule, setNewSchedule] = useState({
    to: "",
    subject: "",
    content: "",
    schedule: "once",
    date: "",
    day: "",
    time: "",
  })

  // Smart replies state
  const [smartReplies, setSmartReplies] = useState({
    enabled: true,
    suggestions: true,
    autoComplete: true,
    followUps: true,
    followUpDays: 3,
  })

  // Notify parent component when rules change
  useEffect(() => {
    if (onRulesChange) {
      onRulesChange(rules)
    }
  }, [rules, onRulesChange])

  const handleToggleRule = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))

    toast({
      title: "Rule updated",
      description: `Automation rule has been ${rules.find((r) => r.id === id)?.enabled ? "disabled" : "enabled"}.`,
    })
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))

    toast({
      title: "Rule deleted",
      description: "Automation rule has been removed.",
    })
  }

  const handleSaveNewRule = () => {
    if (!newRule.name || !newRule.value || !newRule.actionValue) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setRules([
      ...rules,
      {
        id: Date.now().toString(),
        ...newRule,
        enabled: true,
      },
    ])

    setShowNewRuleDialog(false)
    setNewRule({
      name: "",
      condition: "from",
      value: "",
      action: "label",
      actionValue: "",
    })

    toast({
      title: "Rule created",
      description: "New automation rule has been created.",
    })
  }

  const handleToggleSchedule = (id: string) => {
    setScheduledEmails(
      scheduledEmails.map((email) => (email.id === id ? { ...email, enabled: !email.enabled } : email)),
    )

    toast({
      title: "Schedule updated",
      description: `Scheduled email has been ${scheduledEmails.find((e) => e.id === id)?.enabled ? "disabled" : "enabled"}.`,
    })
  }

  const handleDeleteSchedule = (id: string) => {
    setScheduledEmails(scheduledEmails.filter((email) => email.id !== id))

    toast({
      title: "Schedule deleted",
      description: "Scheduled email has been removed.",
    })
  }

  const handleSaveNewSchedule = () => {
    if (!newSchedule.to || !newSchedule.subject || !newSchedule.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (newSchedule.schedule === "once" && !newSchedule.date) {
      toast({
        title: "Missing date",
        description: "Please select a date for one-time scheduling.",
        variant: "destructive",
      })
      return
    }

    if ((newSchedule.schedule === "weekly" || newSchedule.schedule === "monthly") && !newSchedule.day) {
      toast({
        title: "Missing day",
        description: "Please select a day for recurring scheduling.",
        variant: "destructive",
      })
      return
    }

    if (!newSchedule.time) {
      toast({
        title: "Missing time",
        description: "Please select a time for the scheduled email.",
        variant: "destructive",
      })
      return
    }

    setScheduledEmails([
      ...scheduledEmails,
      {
        id: Date.now().toString(),
        ...newSchedule,
        enabled: true,
      },
    ])

    setShowNewScheduleDialog(false)
    setNewSchedule({
      to: "",
      subject: "",
      content: "",
      schedule: "once",
      date: "",
      day: "",
      time: "",
    })

    toast({
      title: "Schedule created",
      description: "New scheduled email has been created.",
    })
  }

  const handleSaveSmartReplies = () => {
    toast({
      title: "Settings saved",
      description: "Smart reply settings have been updated.",
    })
  }

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "from":
        return AtSign
      case "to":
        return AtSign
      case "subject":
        return Hash
      case "content":
        return MessageSquare
      default:
        return AtSign
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "label":
        return Tag
      case "move":
        return ArrowRight
      case "reply":
        return MessageSquare
      default:
        return Tag
    }
  }

  const getScheduleText = (schedule: string, day: string, time: string) => {
    if (schedule === "once") return `Once at ${time}`
    if (schedule === "daily") return `Daily at ${time}`
    if (schedule === "weekly") return `Every ${day} at ${time}`
    if (schedule === "monthly") return `Monthly on day ${day} at ${time}`
    return ""
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Email Automation & AI
          </DialogTitle>
          <DialogDescription>
            Set up rules, schedules, and smart replies to automate your email workflow
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="rules">Automation Rules</TabsTrigger>
            <TabsTrigger value="schedule">Scheduled Emails</TabsTrigger>
            <TabsTrigger value="smart">Smart Replies</TabsTrigger>
          </TabsList>

          {/* Automation Rules Tab */}
          <TabsContent value="rules" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Automation Rules</h3>
              <Button onClick={() => setShowNewRuleDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Rule
              </Button>
            </div>

            <div className="space-y-3">
              {rules.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No automation rules found. Create your first rule to automate email handling.
                  </CardContent>
                </Card>
              ) : (
                rules.map((rule) => (
                  <Card key={rule.id} className={!rule.enabled ? "opacity-70" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{rule.name}</CardTitle>
                        <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Filter className="h-3.5 w-3.5" />
                          <span>If</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {React.createElement(getConditionIcon(rule.condition), { className: "h-3.5 w-3.5" })}
                          <span className="capitalize">{rule.condition}</span>
                        </div>

                        <span>contains</span>

                        <div className="bg-muted px-2 py-0.5 rounded text-xs">{rule.value}</div>
                      </div>

                      <div className="flex items-center gap-2 text-sm mt-2">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ArrowRight className="h-3.5 w-3.5" />
                          <span>Then</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {React.createElement(getActionIcon(rule.action), { className: "h-3.5 w-3.5" })}
                          <span className="capitalize">{rule.action}</span>
                        </div>

                        <div className="bg-muted px-2 py-0.5 rounded text-xs truncate max-w-[200px]">
                          {rule.actionValue}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Scheduled Emails Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Scheduled Emails</h3>
              <Button onClick={() => setShowNewScheduleDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Schedule
              </Button>
            </div>

            <div className="space-y-3">
              {scheduledEmails.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No scheduled emails found. Create your first scheduled email.
                  </CardContent>
                </Card>
              ) : (
                scheduledEmails.map((email) => (
                  <Card key={email.id} className={!email.enabled ? "opacity-70" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{email.subject}</CardTitle>
                        <Switch checked={email.enabled} onCheckedChange={() => handleToggleSchedule(email.id)} />
                      </div>
                      <CardDescription className="truncate">To: {email.to}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{getScheduleText(email.schedule, email.day, email.time)}</span>
                      </div>

                      <div className="mt-2 text-sm text-muted-foreground line-clamp-2">{email.content}</div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSchedule(email.id)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Smart Replies Tab */}
          <TabsContent value="smart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Smart Reply Settings</CardTitle>
                <CardDescription>Configure how AI assists with your email responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableSmartReplies" className="flex flex-col gap-1">
                    <span>Enable Smart Replies</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow AI to suggest quick responses to emails
                    </span>
                  </Label>
                  <Switch
                    id="enableSmartReplies"
                    checked={smartReplies.enabled}
                    onCheckedChange={(checked) => setSmartReplies((prev) => ({ ...prev, enabled: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="suggestions" className="flex flex-col gap-1">
                    <span>Reply Suggestions</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Show AI-generated reply suggestions
                    </span>
                  </Label>
                  <Switch
                    id="suggestions"
                    checked={smartReplies.suggestions}
                    onCheckedChange={(checked) => setSmartReplies((prev) => ({ ...prev, suggestions: checked }))}
                    disabled={!smartReplies.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoComplete" className="flex flex-col gap-1">
                    <span>Smart Compose</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Suggest text completions as you type
                    </span>
                  </Label>
                  <Switch
                    id="autoComplete"
                    checked={smartReplies.autoComplete}
                    onCheckedChange={(checked) => setSmartReplies((prev) => ({ ...prev, autoComplete: checked }))}
                    disabled={!smartReplies.enabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="followUps" className="flex flex-col gap-1">
                    <span>Automatic Follow-ups</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Suggest follow-up emails for messages with no response
                    </span>
                  </Label>
                  <Switch
                    id="followUps"
                    checked={smartReplies.followUps}
                    onCheckedChange={(checked) => setSmartReplies((prev) => ({ ...prev, followUps: checked }))}
                    disabled={!smartReplies.enabled}
                  />
                </div>

                <div className="flex items-center justify-between pl-6">
                  <Label htmlFor="followUpDays" className="flex flex-col gap-1">
                    <span>Follow-up after</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Days to wait before suggesting a follow-up
                    </span>
                  </Label>
                  <Select
                    value={smartReplies.followUpDays.toString()}
                    onValueChange={(value) =>
                      setSmartReplies((prev) => ({ ...prev, followUpDays: Number.parseInt(value) }))
                    }
                    disabled={!smartReplies.enabled || !smartReplies.followUps}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="2">2 days</SelectItem>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSmartReplies} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Email Analysis</CardTitle>
                <CardDescription>Configure how AI analyzes and categorizes your emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoCategories" className="flex flex-col gap-1">
                    <span>Automatic Categorization</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Let AI categorize emails based on content
                    </span>
                  </Label>
                  <Switch id="autoCategories" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="priorityInbox" className="flex flex-col gap-1">
                    <span>Priority Inbox</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Automatically identify important emails
                    </span>
                  </Label>
                  <Switch id="priorityInbox" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="summarize" className="flex flex-col gap-1">
                    <span>Email Summarization</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Generate concise summaries of long emails
                    </span>
                  </Label>
                  <Switch id="summarize" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sentiment" className="flex flex-col gap-1">
                    <span>Sentiment Analysis</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Detect tone and sentiment in emails
                    </span>
                  </Label>
                  <Switch id="sentiment" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* New Rule Dialog */}
        <Dialog open={showNewRuleDialog} onOpenChange={setShowNewRuleDialog}>
          <DialogContent className="sm:max-w-[500px] bg-background text-foreground border-border">
            <DialogHeader>
              <DialogTitle>Create New Automation Rule</DialogTitle>
              <DialogDescription>Set up a rule to automatically process incoming emails</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input
                  id="ruleName"
                  placeholder="E.g., Client Emails"
                  value={newRule.name}
                  onChange={(e) => setNewRule((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Condition</Label>
                <div className="flex items-center gap-2">
                  <Select
                    value={newRule.condition}
                    onValueChange={(value) => setNewRule((prev) => ({ ...prev, condition: value }))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="from">From</SelectItem>
                      <SelectItem value="to">To</SelectItem>
                      <SelectItem value="subject">Subject</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                    </SelectContent>
                  </Select>

                  <span>contains</span>

                  <Input
                    placeholder="E.g., @company.com"
                    value={newRule.value}
                    onChange={(e) => setNewRule((prev) => ({ ...prev, value: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Action</Label>
                <div className="flex items-center gap-2">
                  <Select
                    value={newRule.action}
                    onValueChange={(value) => setNewRule((prev) => ({ ...prev, action: value }))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="label">Label</SelectItem>
                      <SelectItem value="move">Move to</SelectItem>
                      <SelectItem value="reply">Auto-reply</SelectItem>
                    </SelectContent>
                  </Select>

                  {newRule.action === "reply" ? (
                    <Textarea
                      placeholder="Auto-reply message"
                      value={newRule.actionValue}
                      onChange={(e) => setNewRule((prev) => ({ ...prev, actionValue: e.target.value }))}
                      className="flex-1"
                    />
                  ) : (
                    <Input
                      placeholder={newRule.action === "label" ? "Label name" : "Folder name"}
                      value={newRule.actionValue}
                      onChange={(e) => setNewRule((prev) => ({ ...prev, actionValue: e.target.value }))}
                      className="flex-1"
                    />
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewRuleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNewRule}>Create Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Schedule Dialog */}
        <Dialog open={showNewScheduleDialog} onOpenChange={setShowNewScheduleDialog}>
          <DialogContent className="sm:max-w-[500px] bg-background text-foreground border-border">
            <DialogHeader>
              <DialogTitle>Schedule New Email</DialogTitle>
              <DialogDescription>Create an email to be sent automatically on schedule</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleTo">To</Label>
                <Input
                  id="scheduleTo"
                  placeholder="recipient@example.com"
                  value={newSchedule.to}
                  onChange={(e) => setNewSchedule((prev) => ({ ...prev, to: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleSubject">Subject</Label>
                <Input
                  id="scheduleSubject"
                  placeholder="Email subject"
                  value={newSchedule.subject}
                  onChange={(e) => setNewSchedule((prev) => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleContent">Content</Label>
                <Textarea
                  id="scheduleContent"
                  placeholder="Email content"
                  value={newSchedule.content}
                  onChange={(e) => setNewSchedule((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Schedule Type</Label>
                <Select
                  value={newSchedule.schedule}
                  onValueChange={(value) => setNewSchedule((prev) => ({ ...prev, schedule: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newSchedule.schedule === "once" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              )}

              {newSchedule.schedule === "weekly" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduleDay">Day of Week</Label>
                  <Select
                    value={newSchedule.day}
                    onValueChange={(value) => setNewSchedule((prev) => ({ ...prev, day: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {newSchedule.schedule === "monthly" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduleDay">Day of Month</Label>
                  <Select
                    value={newSchedule.day}
                    onValueChange={(value) => setNewSchedule((prev) => ({ ...prev, day: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="scheduleTime">Time</Label>
                <Input
                  id="scheduleTime"
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule((prev) => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewScheduleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNewSchedule}>Schedule Email</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

