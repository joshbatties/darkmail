"use client"

import { useState } from "react"
import { Bot, Sparkles, RefreshCw, Copy, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIComposeAssistantProps {
  onInsertText: (text: string) => void
  initialPrompt?: string
  onClose?: () => void
}

export function AIComposeAssistant({ onInsertText, initialPrompt = "", onClose }: AIComposeAssistantProps) {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState(initialPrompt)
  const [tone, setTone] = useState("professional")
  const [length, setLength] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [copied, setCopied] = useState(false)

  // Mock AI generation - in a real app, this would use the AI SDK
  const generateContent = async () => {
    if (!prompt) {
      toast({
        title: "Empty prompt",
        description: "Please provide instructions for the AI assistant.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock responses based on prompt and tone
    let response = ""

    if (prompt.toLowerCase().includes("meeting")) {
      if (tone === "professional") {
        response =
          "I would like to schedule a meeting to discuss our project progress. Are you available next Tuesday at 2 PM? We can review the current status and address any challenges we're facing.\n\nPlease let me know if this time works for you, or suggest an alternative that better fits your schedule.\n\nLooking forward to our discussion."
      } else if (tone === "friendly") {
        response =
          "Hey there! I was thinking we should catch up about the project soon. How does next Tuesday at 2 PM sound? We can go over what we've done so far and figure out any roadblocks.\n\nIf that doesn't work, no worries! Just let me know what time would be better for you.\n\nExcited to chat soon!"
      } else if (tone === "formal") {
        response =
          "I am writing to request a meeting regarding the status of our ongoing project. I propose Tuesday, next week, at 14:00 hours to conduct a comprehensive review of our progress and address any impediments to our timeline.\n\nPlease confirm your availability for the aforementioned time, or suggest an alternative that accommodates your schedule.\n\nI anticipate our forthcoming discussion."
      }
    } else if (prompt.toLowerCase().includes("thank")) {
      if (tone === "professional") {
        response =
          "Thank you for your valuable contribution to the project. Your insights and dedication have significantly improved our outcomes and helped us meet our objectives.\n\nI appreciate your commitment to excellence and look forward to our continued collaboration."
      } else if (tone === "friendly") {
        response =
          "Thanks so much for all your help with the project! Your ideas were awesome and really made a difference in getting everything done on time.\n\nYou're amazing to work with and I'm looking forward to our next project together!"
      } else if (tone === "formal") {
        response =
          "I wish to express my sincere gratitude for your exemplary contribution to the project. Your expertise and diligence have proven instrumental in achieving our desired outcomes and meeting established deadlines.\n\nYour commitment to excellence is highly regarded, and I anticipate future opportunities for professional collaboration."
      }
    } else if (prompt.toLowerCase().includes("follow up") || prompt.toLowerCase().includes("followup")) {
      if (tone === "professional") {
        response =
          "I'm following up on our previous discussion regarding the project timeline. As mentioned, we need to finalize the deliverables by the end of this month.\n\nHave you had a chance to review the materials I sent? I'd appreciate your feedback so we can proceed with the next steps.\n\nPlease let me know if you need any clarification or additional information."
      } else if (tone === "friendly") {
        response =
          "Hey! Just checking in about our chat on the project timeline. Remember we're aiming to wrap everything up by the end of the month.\n\nHave you had a chance to look at what I sent over? Would love to hear your thoughts so we can keep moving forward!\n\nLet me know if you have any questions or need anything else from me."
      } else if (tone === "formal") {
        response =
          "I am writing to follow up regarding our previous correspondence on the project timeline. As previously established, it is imperative that we finalize all deliverables before the conclusion of the current month.\n\nHave you had the opportunity to examine the documentation I forwarded? Your assessment would be greatly valued as we proceed to subsequent phases.\n\nPlease advise if any clarification or supplementary information is required."
      }
    } else {
      // Default response
      if (tone === "professional") {
        response =
          "Thank you for reaching out. I've reviewed your request and would be happy to provide assistance. Based on the information you've shared, I believe we can implement a solution that meets your requirements.\n\nPlease let me know if you'd like to discuss this further or if you need any additional information from my end."
      } else if (tone === "friendly") {
        response =
          "Hey there! Thanks for your message! I've taken a look at what you sent over and I'd love to help out. I think I've got some ideas that would work really well for what you're trying to do.\n\nLet me know if you want to chat more about this or if there's anything else you'd like to know!"
      } else if (tone === "formal") {
        response =
          "I acknowledge receipt of your correspondence and have thoroughly examined your inquiry. I am pleased to offer my assistance in this matter and believe I can provide a suitable resolution that aligns with your specified parameters.\n\nPlease advise if you wish to engage in further discussion or require additional information regarding this matter."
      }
    }

    // Adjust length
    if (length === "short") {
      response = response.split("\n\n")[0]
    } else if (length === "long") {
      response +=
        "\n\nAdditionally, I've prepared some preliminary thoughts on how we might approach this most effectively. Based on my experience with similar situations, I believe we should consider multiple perspectives before finalizing our approach. This will ensure we've covered all potential scenarios and can respond appropriately to any challenges that arise.\n\nI'm looking forward to your response and continuing our productive collaboration."
    }

    setGeneratedContent(response)
    setIsGenerating(false)
  }

  const handleInsert = () => {
    onInsertText(generatedContent)
    toast({
      title: "Text inserted",
      description: "AI-generated content has been added to your email.",
    })
    if (onClose) {
      onClose()
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "AI-generated content has been copied to your clipboard.",
    })
  }

  const promptSuggestions = [
    "Write a professional follow-up email",
    "Draft a thank you note to a client",
    "Create a meeting invitation",
    "Compose a project status update",
    "Write a polite reminder about a deadline",
  ]

  return (
    <Card className="w-full bg-card border-border relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Compose Assistant
        </CardTitle>
        <CardDescription>Let AI help you draft the perfect email</CardDescription>
        {onClose && (
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">What would you like to write?</label>
          <Textarea
            placeholder="E.g., Write a follow-up email to a client who hasn't responded in a week"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion, index) => (
            <Button key={index} variant="outline" size="sm" onClick={() => setPrompt(suggestion)} className="text-xs">
              {suggestion}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Length</label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger>
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateContent} className="w-full" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Bot className="h-4 w-4 mr-2" />
              Generate Email Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="mt-4 space-y-2">
            <Separator />
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Generated Content</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 gap-1">
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
                  <Button variant="default" size="sm" onClick={handleInsert} className="h-8">
                    Insert
                  </Button>
                </div>
              </div>
              <div className="bg-muted/50 rounded-md p-3 text-sm whitespace-pre-wrap">{generatedContent}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

