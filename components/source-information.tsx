"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, Trash2, FileText, Calendar, Clock, X, Settings, Info, FileType } from "lucide-react"
import type { UploadedFile, SelectedPreset } from "./ai-behavior-system"

interface SourceInformationProps {
  uploadedFiles: UploadedFile[]
  selectedPresets: SelectedPreset[]
  onFileRemove: (fileId: string) => void
  onPresetRemove: (categoryId: string) => void
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

export function SourceInformation({
  uploadedFiles,
  selectedPresets,
  onFileRemove,
  onPresetRemove,
}: SourceInformationProps) {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const getSelectedOption = (categoryId: string) => {
    const selectedPreset = selectedPresets.find((preset) => preset.categoryId === categoryId)
    if (!selectedPreset) return null

    const category = presetCategories.find((cat) => cat.id === categoryId)
    if (!category) return null

    return category.options.find((opt) => opt.id === selectedPreset.optionId)
  }

  const getFileIcon = (file: UploadedFile) => {
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      return <FileType className="h-4 w-4 mr-2 text-red-500" />
    }
    return <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
  }

  const selectedFile = uploadedFiles.find((file) => file.id === selectedFileId)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="files">Source Files ({uploadedFiles.length})</TabsTrigger>
          <TabsTrigger value="presets">Selected Presets ({selectedPresets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="mt-4">
          {uploadedFiles.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getFileIcon(file)}
                            {file.name}
                          </div>
                        </TableCell>
                        <TableCell>{formatFileSize(file.size)}</TableCell>
                        <TableCell>{formatDate(file.dateUploaded)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog
                              open={isFileDialogOpen && selectedFileId === file.id}
                              onOpenChange={(open) => {
                                setIsFileDialogOpen(open)
                                if (!open) setSelectedFileId(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedFileId(file.id)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {selectedFile && getFileIcon(selectedFile)}
                                    {selectedFile?.name}
                                  </DialogTitle>
                                  <DialogDescription className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {selectedFile && formatDate(selectedFile.dateUploaded)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      {selectedFile && formatTime(selectedFile.dateUploaded)}
                                    </span>
                                  </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="h-[400px] mt-4 border rounded-md p-4 bg-muted/30">
                                  <pre className="text-sm whitespace-pre-wrap font-mono">{selectedFile?.content}</pre>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" onClick={() => onFileRemove(file.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No files uploaded yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="presets" className="mt-4">
          {selectedPresets.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Selected Option</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPresets.map((preset) => {
                      const category = presetCategories.find((cat) => cat.id === preset.categoryId)
                      const option = getSelectedOption(preset.categoryId)

                      if (!category || !option) return null

                      return (
                        <TableRow key={preset.categoryId}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                              {category.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{option.name}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{option.description}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => onPresetRemove(preset.categoryId)}>
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No preset options selected yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {(uploadedFiles.length > 0 || selectedPresets.length > 0) && (
        <div className="flex items-center p-4 bg-muted/30 rounded-md">
          <Info className="h-5 w-5 mr-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            The AI will use {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} and{" "}
            {selectedPresets.length} preset option{selectedPresets.length !== 1 ? "s" : ""} to guide its responses.
          </p>
        </div>
      )}
    </div>
  )
}

