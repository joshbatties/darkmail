"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { SelectedPreset } from "./ai-behavior-system"

interface PresetOptionsProps {
  selectedPresets: SelectedPreset[]
  onPresetSelect: (categoryId: string, optionId: string) => void
}

// Define comprehensive preset categories and options
const presetCategories = [
  {
    id: "tone",
    name: "Tone",
    description: "How the AI should sound when responding",
    options: [
      {
        id: "formal",
        name: "Formal",
        description: "Professional, business-like tone with proper language and structure",
      },
      { id: "casual", name: "Casual", description: "Relaxed, conversational tone with everyday language" },
      { id: "friendly", name: "Friendly", description: "Warm, approachable tone that builds rapport" },
      { id: "technical", name: "Technical", description: "Precise, specialized language focused on accuracy" },
      { id: "enthusiastic", name: "Enthusiastic", description: "Excited, energetic tone that conveys passion" },
      {
        id: "empathetic",
        name: "Empathetic",
        description: "Understanding, compassionate tone that acknowledges feelings",
      },
      {
        id: "authoritative",
        name: "Authoritative",
        description: "Confident, expert tone that establishes credibility",
      },
      { id: "neutral", name: "Neutral", description: "Balanced, unbiased tone without emotional coloring" },
    ],
  },
  {
    id: "style",
    name: "Writing Style",
    description: "The writing approach the AI should use",
    options: [
      { id: "concise", name: "Concise", description: "Brief, to-the-point writing that values brevity" },
      { id: "detailed", name: "Detailed", description: "Thorough, comprehensive writing with complete explanations" },
      { id: "analytical", name: "Analytical", description: "Data-driven, logical writing that examines components" },
      { id: "creative", name: "Creative", description: "Imaginative, original writing that uses vivid language" },
      { id: "instructional", name: "Instructional", description: "Step-by-step guidance focused on clear directions" },
      { id: "narrative", name: "Narrative", description: "Story-based writing that follows a logical flow" },
      { id: "persuasive", name: "Persuasive", description: "Convincing writing that aims to influence the reader" },
      { id: "conversational", name: "Conversational", description: "Dialogue-like writing that mimics natural speech" },
      { id: "academic", name: "Academic", description: "Scholarly writing with formal structure and citations" },
    ],
  },
  {
    id: "focus",
    name: "Content Focus",
    description: "What the AI should emphasize in its responses",
    options: [
      { id: "informative", name: "Informative", description: "Providing facts, data, and objective information" },
      { id: "persuasive", name: "Persuasive", description: "Convincing the reader with compelling arguments" },
      { id: "educational", name: "Educational", description: "Teaching concepts with clear explanations" },
      { id: "problem-solving", name: "Problem-Solving", description: "Addressing challenges with practical solutions" },
      { id: "storytelling", name: "Storytelling", description: "Using narrative techniques to convey information" },
      {
        id: "comparative",
        name: "Comparative",
        description: "Analyzing similarities and differences between concepts",
      },
      {
        id: "historical",
        name: "Historical",
        description: "Emphasizing background, context, and development over time",
      },
      { id: "practical", name: "Practical", description: "Focusing on real-world applications and usefulness" },
      { id: "theoretical", name: "Theoretical", description: "Exploring abstract concepts and underlying principles" },
      { id: "predictive", name: "Predictive", description: "Discussing future implications and potential outcomes" },
    ],
  },
  {
    id: "expertise",
    name: "Expertise Level",
    description: "The knowledge level the AI should target",
    options: [
      { id: "beginner", name: "Beginner", description: "Newcomers with no prior knowledge of the subject" },
      { id: "intermediate", name: "Intermediate", description: "Users with basic familiarity and understanding" },
      { id: "advanced", name: "Advanced", description: "Users with substantial knowledge and experience" },
      { id: "expert", name: "Expert", description: "Specialists with deep subject matter expertise" },
      { id: "mixed", name: "Mixed", description: "Varied levels of expertise in the audience" },
      { id: "technical", name: "Technical", description: "Users with specialized technical knowledge" },
      { id: "non-technical", name: "Non-Technical", description: "Users without technical background or training" },
      { id: "academic", name: "Academic", description: "Scholarly audience with research interests" },
      { id: "professional", name: "Professional", description: "Working professionals in the field" },
    ],
  },
  {
    id: "format",
    name: "Response Format",
    description: "How the AI should structure its response",
    options: [
      { id: "paragraph", name: "Paragraphs", description: "Traditional paragraph structure with logical flow" },
      { id: "bullet-points", name: "Bullet Points", description: "Listed key points for easy scanning" },
      { id: "q-and-a", name: "Q&A", description: "Question and answer format for direct responses" },
      { id: "step-by-step", name: "Step-by-Step", description: "Sequential instructions for processes" },
      { id: "outline", name: "Outline", description: "Hierarchical structure with headings and subheadings" },
      { id: "table", name: "Table", description: "Tabular format for comparing information" },
      { id: "code-blocks", name: "Code Blocks", description: "Programming code with explanations" },
      { id: "dialogue", name: "Dialogue", description: "Conversational exchange between perspectives" },
      { id: "timeline", name: "Timeline", description: "Chronological sequence of events or steps" },
      { id: "pros-cons", name: "Pros & Cons", description: "Balanced list of advantages and disadvantages" },
    ],
  },
  {
    id: "length",
    name: "Response Length",
    description: "How detailed the AI's response should be",
    options: [
      { id: "very-brief", name: "Very Brief", description: "Extremely concise, just the essential points" },
      { id: "brief", name: "Brief", description: "Short and to the point, minimal elaboration" },
      { id: "moderate", name: "Moderate", description: "Balanced length with some supporting details" },
      { id: "detailed", name: "Detailed", description: "Comprehensive with thorough explanations" },
      { id: "extensive", name: "Extensive", description: "In-depth analysis with maximum detail" },
    ],
  },
  {
    id: "examples",
    name: "Examples & Illustrations",
    description: "How the AI should use examples in responses",
    options: [
      { id: "none", name: "No Examples", description: "Focus on concepts without specific examples" },
      { id: "few", name: "Few Examples", description: "Limited examples to illustrate key points" },
      { id: "several", name: "Several Examples", description: "Multiple examples for better understanding" },
      { id: "real-world", name: "Real-World", description: "Practical, real-life examples and case studies" },
      { id: "hypothetical", name: "Hypothetical", description: "Theoretical scenarios to illustrate concepts" },
      { id: "analogies", name: "Analogies", description: "Comparative examples that relate to familiar concepts" },
    ],
  },
  {
    id: "citations",
    name: "Citations & Sources",
    description: "How the AI should reference information sources",
    options: [
      { id: "none", name: "No Citations", description: "Provide information without citing sources" },
      { id: "informal", name: "Informal", description: "Mention sources casually without formal citations" },
      { id: "formal", name: "Formal", description: "Include proper academic citations for all sources" },
      { id: "hyperlinks", name: "Hyperlinks", description: "Include clickable links to online sources" },
      { id: "footnotes", name: "Footnotes", description: "Use footnotes for source references" },
    ],
  },
]

export function PresetOptions({ selectedPresets, onPresetSelect }: PresetOptionsProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["tone"])

  const handleAccordionChange = (value: string) => {
    setExpandedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const getSelectedOptionName = (categoryId: string) => {
    const selectedPreset = selectedPresets.find((preset) => preset.categoryId === categoryId)
    if (!selectedPreset) return null

    const category = presetCategories.find((cat) => cat.id === categoryId)
    if (!category) return null

    const option = category.options.find((opt) => opt.id === selectedPreset.optionId)
    return option ? option.name : null
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedPresets.map((preset) => {
          const categoryName = presetCategories.find((cat) => cat.id === preset.categoryId)?.name
          const optionName = getSelectedOptionName(preset.categoryId)

          return (
            <Badge key={preset.categoryId} variant="secondary" className="text-xs">
              {categoryName}: {optionName}
            </Badge>
          )
        })}
        {selectedPresets.length === 0 && <p className="text-sm text-muted-foreground">No options selected yet</p>}
      </div>

      <Accordion type="multiple" value={expandedCategories} onValueChange={handleAccordionChange} className="w-full">
        {presetCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center">
                <span>{category.name}</span>
                {getSelectedOptionName(category.id) && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    {getSelectedOptionName(category.id)}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Select an option to guide how the AI will respond in this category
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Select
                  onValueChange={(value) => onPresetSelect(category.id, value)}
                  value={selectedPresets.find((preset) => preset.categoryId === category.id)?.optionId || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${category.name}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {category.options.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        <div className="flex flex-col">
                          <span>{option.name}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

