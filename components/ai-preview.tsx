"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, RefreshCw, Copy, Check, FileText, Settings } from "lucide-react"
import type { UploadedFile, SelectedPreset } from "./ai-behavior-system"

interface AIPreviewProps {
  uploadedFiles: UploadedFile[]
  selectedPresets: SelectedPreset[]
}

// Define preset categories and options (same as in PresetOptions.tsx)
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

export function AIPreview({ uploadedFiles, selectedPresets }: AIPreviewProps) {
  const [userPrompt, setUserPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [copied, setCopied] = useState(false)

  const getSelectedOption = (categoryId: string) => {
    const selectedPreset = selectedPresets.find((preset) => preset.categoryId === categoryId)
    if (!selectedPreset) return null

    const category = presetCategories.find((cat) => cat.id === categoryId)
    if (!category) return null

    return category.options.find((opt) => opt.id === selectedPreset.optionId)
  }

  const handleSubmit = async () => {
    if (!userPrompt.trim()) return

    setIsGenerating(true)
    setAiResponse("")

    // In a real app, this would call an API with the files and presets
    // For demo purposes, we'll generate a mock response based on the selected presets

    // Simulate streaming response
    let response = ""

    // Introduction based on tone
    const toneOption = getSelectedOption("tone")
    if (toneOption) {
      switch (toneOption.id) {
        case "formal":
          response +=
            "I appreciate your inquiry. Based on the information provided, I would like to offer the following response.\n\n"
          break
        case "casual":
          response += "Hey there! Thanks for your question. Here's what I found based on your files.\n\n"
          break
        case "friendly":
          response +=
            "Hello! I'm happy to help with your question. I've analyzed your files and have some insights to share.\n\n"
          break
        case "technical":
          response +=
            "Upon analysis of the provided documentation, the following technical response has been formulated.\n\n"
          break
        case "enthusiastic":
          response += "Wow! Great question! I'm excited to dive into this and share what I've found in your files!\n\n"
          break
        case "empathetic":
          response +=
            "I understand how important this question is to you. Let me share what I've found in a way that addresses your concerns.\n\n"
          break
        case "authoritative":
          response +=
            "Based on comprehensive analysis of the provided materials, I can definitively state the following.\n\n"
          break
        case "neutral":
          response += "Here is an objective analysis based on the information provided in your files.\n\n"
          break
        default:
          response += "Thank you for your question. Here's what I found based on your files.\n\n"
      }
    } else {
      response += "Thank you for your question. Here's what I found based on your files.\n\n"
    }

    // Content based on focus
    const focusOption = getSelectedOption("focus")
    if (focusOption) {
      response += "Based on "

      if (uploadedFiles.length > 0) {
        response += `the ${uploadedFiles.length} file${uploadedFiles.length !== 1 ? "s" : ""} you've provided, `
      }

      switch (focusOption.id) {
        case "informative":
          response += "here are the key facts and information relevant to your query:\n\n"
          break
        case "persuasive":
          response += "I'd like to present a compelling case for considering the following points:\n\n"
          break
        case "educational":
          response += "let me explain the core concepts that will help you understand this topic:\n\n"
          break
        case "problem-solving":
          response += "I've identified the following challenges and potential solutions:\n\n"
          break
        case "storytelling":
          response += "let me share a narrative that illustrates the key points:\n\n"
          break
        case "comparative":
          response += "here's how different aspects compare and contrast:\n\n"
          break
        case "historical":
          response += "let me provide the historical context and development:\n\n"
          break
        case "practical":
          response += "here are the practical applications and real-world uses:\n\n"
          break
        case "theoretical":
          response += "let me explore the underlying theoretical principles:\n\n"
          break
        case "predictive":
          response += "here's what we might expect to see in the future:\n\n"
          break
        default:
          response += "here's what I found:\n\n"
      }
    }

    // Format the content
    const formatOption = getSelectedOption("format")
    if (formatOption) {
      switch (formatOption.id) {
        case "bullet-points":
          for (const file of uploadedFiles) {
            response += `• From "${file.name}": ${file.content.substring(0, 100)}...\n`
          }
          if (uploadedFiles.length === 0) {
            response += "• Point one: This is a sample bullet point\n"
            response += "• Point two: This is another sample bullet point\n"
            response += "• Point three: This is a third sample bullet point\n"
          }
          response += "\n"
          break
        case "q-and-a":
          response += "Q: " + userPrompt + "\n\n"
          response += "A: "
          if (uploadedFiles.length > 0) {
            response += "According to your files, "
            for (let i = 0; i < Math.min(uploadedFiles.length, 2); i++) {
              response += `"${uploadedFiles[i].name}" ${i === 0 ? "indicates" : "suggests"} that ${uploadedFiles[i].content.substring(0, 50)}... `
            }
          } else {
            response += "Based on general knowledge, this would typically involve several considerations..."
          }
          response += "\n\n"
          break
        case "step-by-step":
          response += "Follow these steps:\n\n"
          for (let i = 1; i <= Math.min(uploadedFiles.length + 2, 5); i++) {
            response += `${i}. ${i <= uploadedFiles.length ? `Review "${uploadedFiles[i - 1].name}"` : "Analyze the information"}\n`
          }
          response += "\n"
          break
        case "outline":
          response += "I. Introduction\n"
          response += "   A. Overview of the query\n"
          response += "   B. Scope of the response\n\n"
          response += "II. Key Findings\n"
          if (uploadedFiles.length > 0) {
            for (let i = 0; i < Math.min(uploadedFiles.length, 3); i++) {
              response += `   A. From "${uploadedFiles[i].name}"\n`
              response += `      1. ${uploadedFiles[i].content.substring(0, 50)}...\n`
            }
          } else {
            response += "   A. Primary considerations\n"
            response += "      1. First key point\n"
            response += "      2. Second key point\n"
          }
          response += "\n"
          break
        case "table":
          response += "| Source | Key Information | Relevance |\n"
          response += "|--------|----------------|----------|\n"
          if (uploadedFiles.length > 0) {
            for (let i = 0; i < Math.min(uploadedFiles.length, 3); i++) {
              response += `| ${uploadedFiles[i].name} | ${uploadedFiles[i].content.substring(0, 30)}... | High |\n`
            }
          } else {
            response += "| Source 1 | Key information from source 1 | High |\n"
            response += "| Source 2 | Key information from source 2 | Medium |\n"
          }
          response += "\n"
          break
        case "code-blocks":
          response += "Here's a code example that demonstrates this concept:\n\n"
          response += "```javascript\n"
          response += "// Sample code\n"
          response += "function processData(input) {\n"
          response += "  // Process the input data\n"
          response += "  const result = input.map(item => item.transform());\n"
          response += "  return result;\n"
          response += "}\n"
          response += "```\n\n"
          break
        case "dialogue":
          response += "User: How should I approach this problem?\n\n"
          response += "Assistant: Based on the information you've provided, I'd recommend starting with...\n\n"
          response += "User: What if I encounter challenges with that approach?\n\n"
          response += "Assistant: In that case, you might consider alternative methods such as...\n\n"
          break
        case "timeline":
          response += "Timeline of Key Events/Steps:\n\n"
          response += "1. First Stage (Initial Phase)\n"
          response += "   - Key action or event\n"
          response += "   - Important consideration\n\n"
          response += "2. Second Stage (Development)\n"
          response += "   - Next steps to take\n"
          response += "   - Important milestones to achieve\n\n"
          response += "3. Third Stage (Implementation)\n"
          response += "   - Execution details\n"
          response += "   - Expected outcomes\n\n"
          break
        case "pros-cons":
          response += "Pros:\n"
          response += "• Advantage one: Key benefit of this approach\n"
          response += "• Advantage two: Another significant benefit\n"
          response += "• Advantage three: Additional positive aspect\n\n"
          response += "Cons:\n"
          response += "• Disadvantage one: Potential challenge to consider\n"
          response += "• Disadvantage two: Another limitation\n"
          response += "• Disadvantage three: Additional concern\n\n"
          break
        default:
          if (uploadedFiles.length > 0) {
            for (const file of uploadedFiles) {
              response += `Based on "${file.name}", ${file.content.substring(0, 100)}...\n\n`
            }
          } else {
            response +=
              "I don't have specific files to reference, but I can still provide a general response to your query.\n\n"
          }
      }
    } else {
      if (uploadedFiles.length > 0) {
        for (const file of uploadedFiles) {
          response += `Based on "${file.name}", ${file.content.substring(0, 100)}...\n\n`
        }
      } else {
        response +=
          "I don't have specific files to reference, but I can still provide a general response to your query.\n\n"
      }
    }

    // Adjust length based on the length preset
    const lengthOption = getSelectedOption("length")
    let contentLength = 1.0 // Default multiplier

    if (lengthOption) {
      switch (lengthOption.id) {
        case "very-brief":
          contentLength = 0.3
          break
        case "brief":
          contentLength = 0.6
          break
        case "moderate":
          contentLength = 1.0
          break
        case "detailed":
          contentLength = 1.5
          break
        case "extensive":
          contentLength = 2.0
          break
      }
    }

    // Add examples based on the examples preset
    const examplesOption = getSelectedOption("examples")
    if (examplesOption && examplesOption.id !== "none") {
      response += "\nExamples:\n"

      switch (examplesOption.id) {
        case "few":
          response += "Here's a simple example to illustrate this concept:\n"
          response += "- Example: When applying this approach to a basic scenario...\n\n"
          break
        case "several":
          response += "Here are several examples to help clarify:\n"
          response += "- Example 1: In a business context, this would look like...\n"
          response += "- Example 2: For personal applications, consider...\n"
          response += "- Example 3: In academic settings, this principle applies as...\n\n"
          break
        case "real-world":
          response += "Real-world applications include:\n"
          response += "- Case Study 1: Company X implemented this approach and saw a 25% improvement in...\n"
          response += "- Case Study 2: In the healthcare sector, this method has been used to...\n\n"
          break
        case "hypothetical":
          response += "Consider these hypothetical scenarios:\n"
          response += "- Scenario 1: Imagine you're facing a situation where...\n"
          response += "- Scenario 2: If you were to apply this in a different context...\n\n"
          break
        case "analogies":
          response += "To better understand this concept, consider these analogies:\n"
          response += "- This process is similar to building a house, where you first need a solid foundation...\n"
          response += "- Think of this approach as a journey, where each step brings you closer to...\n\n"
          break
      }
    }

    // Add citations based on the citations preset
    const citationsOption = getSelectedOption("citations")
    if (citationsOption && citationsOption.id !== "none") {
      response += "\n"

      switch (citationsOption.id) {
        case "informal":
          if (uploadedFiles.length > 0) {
            response += "Sources: Based on information from "
            response += uploadedFiles.map((file) => `"${file.name}"`).join(", ")
            response += ".\n"
          } else {
            response += "Note: This information is based on general knowledge and best practices in the field.\n"
          }
          break
        case "formal":
          response += "References:\n\n"
          if (uploadedFiles.length > 0) {
            for (let i = 0; i < uploadedFiles.length; i++) {
              response += `[${i + 1}] "${uploadedFiles[i].name}" (${new Date().getFullYear()}). Retrieved from user-provided documentation.\n`
            }
          } else {
            response += "[1] Smith, J. (2023). Best Practices in the Field. Journal of Examples, 45(2), 123-145.\n"
            response += "[2] Johnson, A. (2022). Comprehensive Guide to the Subject. Example University Press.\n"
          }
          break
        case "hyperlinks":
          response += "For more information, see the following resources:\n"
          if (uploadedFiles.length > 0) {
            for (const file of uploadedFiles) {
              response += `- [${file.name}](#)\n`
            }
          } else {
            response += "- [Resource 1](#)\n"
            response += "- [Resource 2](#)\n"
          }
          break
        case "footnotes":
          response += "\n---\n\n"
          response += "Footnotes:\n"
          if (uploadedFiles.length > 0) {
            for (let i = 0; i < uploadedFiles.length; i++) {
              response += `[${i + 1}] Information extracted from "${uploadedFiles[i].name}"\n`
            }
          } else {
            response += "[1] This is a general principle widely accepted in the field.\n"
            response += "[2] Based on standard methodologies and approaches.\n"
          }
          break
      }
    }

    // Conclusion based on style
    const styleOption = getSelectedOption("style")
    if (styleOption) {
      response += "\n"

      switch (styleOption.id) {
        case "concise":
          response += "In summary, the key points to remember are: "
          if (uploadedFiles.length > 0) {
            response += uploadedFiles[0].content.substring(0, 50) + "..."
          } else {
            response += "focus on the core elements of your query."
          }
          break
        case "detailed":
          response += "To provide a comprehensive understanding, it's important to note that "
          if (uploadedFiles.length > 0) {
            response += "each file contributes valuable context. "
            for (const file of uploadedFiles) {
              response += `"${file.name}" offers insights into ${file.content.substring(0, 30)}... `
            }
          } else {
            response += "a thorough analysis would typically involve multiple sources of information."
          }
          break
        case "analytical":
          response += "The data suggests that "
          if (uploadedFiles.length > 0) {
            response += `there is a correlation between the information in ${uploadedFiles.map((f) => `"${f.name}"`).join(" and ")}. `
            response += "Further analysis would be beneficial to establish causation."
          } else {
            response += "a data-driven approach would be most effective for addressing your query."
          }
          break
        case "creative":
          response += "Imagine a scenario where "
          if (uploadedFiles.length > 0) {
            response += `the concepts in ${uploadedFiles.map((f) => `"${f.name}"`).join(" and ")} come together to create new possibilities. `
            response += "The potential for innovation is significant."
          } else {
            response += "your query leads to unexpected discoveries and creative solutions."
          }
          break
        case "instructional":
          response += "To apply this information effectively, follow these guidelines: "
          if (uploadedFiles.length > 0) {
            response += `1) Review ${uploadedFiles.map((f) => `"${f.name}"`).join(", ")} thoroughly; `
            response += "2) Identify the key concepts; 3) Apply them to your specific situation."
          } else {
            response +=
              "1) Clarify your objectives; 2) Gather relevant information; 3) Implement a structured approach."
          }
          break
        case "narrative":
          response += "As we've explored this journey through the information, we've seen how "
          if (uploadedFiles.length > 0) {
            response += `the story unfolds from ${uploadedFiles.map((f) => `"${f.name}"`).join(" to ")}. `
            response += "Each piece contributes to the larger narrative."
          } else {
            response += "the narrative builds to provide a complete picture of the situation."
          }
          break
        case "persuasive":
          response += "Given the evidence presented, it's clear that "
          if (uploadedFiles.length > 0) {
            response += `the approach outlined in ${uploadedFiles.map((f) => `"${f.name}"`).join(" and ")} offers significant advantages. `
            response += "I encourage you to consider implementing these recommendations."
          } else {
            response += "this perspective offers compelling benefits that warrant serious consideration."
          }
          break
        case "conversational":
          response += "So, what do you think about all this? "
          if (uploadedFiles.length > 0) {
            response += `We've gone through ${uploadedFiles.length} file${uploadedFiles.length !== 1 ? "s" : ""} together, and I hope it's given you some useful insights. `
            response += "Feel free to ask if you need any clarification!"
          } else {
            response +=
              "Does this help with what you were looking for? Let me know if you'd like to explore any aspect in more detail."
          }
          break
        case "academic":
          response += "In conclusion, this analysis demonstrates "
          if (uploadedFiles.length > 0) {
            response += `that the documents ${uploadedFiles.map((f) => `"${f.name}"`).join(", ")} provide substantial evidence for the propositions discussed. `
            response += "Further research may be warranted to explore additional dimensions of this topic."
          } else {
            response +=
              "the theoretical underpinnings and practical implications of the subject matter. Future studies might expand on these findings."
          }
          break
        default:
          response += "\nI hope this information helps with your query. Let me know if you need any clarification."
      }
    } else {
      response += "\nI hope this information helps with your query. Let me know if you need any clarification."
    }

    // Simulate streaming by adding chunks of text
    const chunks = response.split(" ")
    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10))
      setAiResponse((prev) => prev + chunks[i] + " ")
    }

    setIsGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setUserPrompt("")
    setAiResponse("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Test Your Configuration</h3>
            {(uploadedFiles.length > 0 || selectedPresets.length > 0) && (
              <Badge variant="outline" className="text-xs">
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""}, {selectedPresets.length} preset
                {selectedPresets.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          {aiResponse && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {uploadedFiles.map((file) => (
            <Badge key={file.id} variant="secondary" className="text-xs flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {file.name}
            </Badge>
          ))}

          {selectedPresets.map((preset) => {
            const category = presetCategories.find((cat) => cat.id === preset.categoryId)
            const option = getSelectedOption(preset.categoryId)

            if (!category || !option) return null

            return (
              <Badge key={preset.categoryId} variant="outline" className="text-xs flex items-center gap-1">
                <Settings className="h-3 w-3" />
                {category.name}: {option.name}
              </Badge>
            )
          })}
        </div>

        <Textarea
          placeholder="Enter your prompt here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="min-h-[100px] resize-none"
        />

        <Button onClick={handleSubmit} disabled={isGenerating || !userPrompt.trim()} className="w-full">
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Generate Response
            </>
          )}
        </Button>
      </div>

      {aiResponse && (
        <>
          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-medium">AI Response</h3>
              </div>

              <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <ScrollArea className="h-[400px] border rounded-md p-4 bg-muted/30">
              <div className="whitespace-pre-wrap">{aiResponse}</div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  )
}

