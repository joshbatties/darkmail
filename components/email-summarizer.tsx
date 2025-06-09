"use client"

import { useState, useEffect } from "react"
import { X, RefreshCw, Copy, Check, FileText, ListChecks, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Email } from "@/types/email"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmailSummarizerProps {
  email: Email
  onClose: () => void
}

export function EmailSummarizer({ email, onClose }: EmailSummarizerProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(true)
  const [copied, setCopied] = useState(false)
  const [summary, setSummary] = useState("")
  const [keyPoints, setKeyPoints] = useState<string[]>([])
  const [sentiment, setSentiment] = useState("")
  const [actionItems, setActionItems] = useState<string[]>([])
  const [responseTime, setResponseTime] = useState("")

  // Simulate AI processing
  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate mock summary based on email content
      const mockSummary =
        "This email discusses the Q1 results, noting that targets were exceeded by 15%. The client is pleased with the progress. The sender requests a meeting tomorrow to discuss next steps."

      // Generate mock key points
      const mockKeyPoints = [
        "Q1 targets exceeded by 15%",
        "Client is satisfied with progress",
        "Meeting requested for tomorrow",
        "Next steps to be discussed in the meeting",
      ]

      // Generate mock sentiment
      const mockSentiment = "Positive"

      // Generate mock action items
      const mockActionItems = [
        "Respond to meeting request",
        "Prepare Q1 results presentation",
        "Compile list of next steps for discussion",
      ]

      // Generate mock response time
      const mockResponseTime = "High priority - Respond within 24 hours"

      setSummary(mockSummary)
      setKeyPoints(mockKeyPoints)
      setSentiment(mockSentiment)
      setActionItems(mockActionItems)
      setResponseTime(mockResponseTime)
      setIsGenerating(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [email])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard.",
    })
  }

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "Positive") return "text-green-500"
    if (sentiment === "Negative") return "text-red-500"
    if (sentiment === "Neutral") return "text-blue-500"
    return ""
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            AI Email Analysis
          </DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="mt-2">
          <div className="bg-muted/30 p-3 rounded-md">
            <h3 className="font-medium text-sm">{email.subject}</h3>
            <p className="text-xs text-muted-foreground">
              From: {email.from.name} ({email.from.email})
            </p>
          </div>

          {isGenerating ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Analyzing email content...</p>
            </div>
          ) : (
            <Tabs defaultValue="summary" className="mt-4">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium">Email Summary</h3>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(summary)} className="h-8 gap-1">
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3 text-sm">{summary}</div>
                </div>
              </TabsContent>

              <TabsContent value="keypoints" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium">Key Points</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(keyPoints.join("\n• "))}
                      className="h-8 gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <ul className="list-disc pl-5 space-y-1">
                      {keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium">Suggested Actions</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(actionItems.join("\n• "))}
                      className="h-8 gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <ul className="space-y-2">
                      {actionItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-primary">
                            <ListChecks className="h-3 w-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sentiment Analysis</h3>
                    <div className="bg-muted/50 rounded-md p-3 text-sm flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Tone: <span className={getSentimentColor(sentiment)}>{sentiment}</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Response Priority</h3>
                    <div className="bg-muted/50 rounded-md p-3 text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{responseTime}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

