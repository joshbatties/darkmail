"use client"

import { useState } from "react"
import { FileUploader } from "./file-uploader"
import { PresetOptions } from "./preset-options"
import { SourceInformation } from "./source-information"
import { AIPreview } from "./ai-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Save, Share2, Bot, FileText } from "lucide-react"

export interface UploadedFile {
  id: string
  name: string
  content: string
  size: number
  type: string
  dateUploaded: Date
}

export interface SelectedPreset {
  categoryId: string
  optionId: string
}

// Add props for integrated usage
interface AIBehaviorSystemProps {
  uploadedFiles?: UploadedFile[]
  selectedPresets?: SelectedPreset[]
  onFileUpload?: (files: UploadedFile[]) => void
  onFileRemove?: (fileId: string) => void
  onPresetSelect?: (categoryId: string, optionId: string) => void
  onPresetRemove?: (categoryId: string) => void
}

export function AIBehaviorSystem({
  uploadedFiles: externalFiles,
  selectedPresets: externalPresets,
  onFileUpload: externalFileUpload,
  onFileRemove: externalFileRemove,
  onPresetSelect: externalPresetSelect,
  onPresetRemove: externalPresetRemove,
}: AIBehaviorSystemProps) {
  // Use internal state if no external state is provided
  const [internalUploadedFiles, setInternalUploadedFiles] = useState<UploadedFile[]>([])
  const [internalSelectedPresets, setInternalSelectedPresets] = useState<SelectedPreset[]>([])
  const [activeTab, setActiveTab] = useState("configure")

  // Use external or internal state/handlers based on what's provided
  const uploadedFiles = externalFiles || internalUploadedFiles
  const selectedPresets = externalPresets || internalSelectedPresets

  const handleFileUpload = (files: UploadedFile[]) => {
    if (externalFileUpload) {
      externalFileUpload(files)
    } else {
      setInternalUploadedFiles((prevFiles) => [...prevFiles, ...files])
    }
  }

  const handleFileRemove = (fileId: string) => {
    if (externalFileRemove) {
      externalFileRemove(fileId)
    } else {
      setInternalUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
    }
  }

  const handlePresetSelect = (categoryId: string, optionId: string) => {
    if (externalPresetSelect) {
      externalPresetSelect(categoryId, optionId)
    } else {
      setInternalSelectedPresets((prevPresets) => {
        // Remove any existing selection for this category
        const filtered = prevPresets.filter((preset) => preset.categoryId !== categoryId)
        // Add the new selection
        return [...filtered, { categoryId, optionId }]
      })
    }
  }

  const handlePresetRemove = (categoryId: string) => {
    if (externalPresetRemove) {
      externalPresetRemove(categoryId)
    } else {
      setInternalSelectedPresets((prevPresets) => prevPresets.filter((preset) => preset.categoryId !== categoryId))
    }
  }

  const handleReset = () => {
    if (externalFileRemove && externalPresetRemove) {
      // Reset external state
      uploadedFiles.forEach((file) => externalFileRemove(file.id))
      selectedPresets.forEach((preset) => externalPresetRemove(preset.categoryId))
    } else {
      // Reset internal state
      setInternalUploadedFiles([])
      setInternalSelectedPresets([])
    }
  }

  const handleSave = () => {
    // In a real app, this would save the configuration to a database or local storage
    alert("Configuration saved!")
  }

  const handleShare = () => {
    // In a real app, this would generate a shareable link or export the configuration
    alert("Shareable link generated!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Behavior System</h1>
      </div>

      <p className="text-muted-foreground">
        Configure how the AI assistant processes your emails and responds to your queries
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configure">
            <FileText className="h-4 w-4 mr-2" />
            Configure
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Bot className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Upload Source Files</h2>
                <FileUploader onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Select Preset Options</h2>
                <PresetOptions selectedPresets={selectedPresets} onPresetSelect={handlePresetSelect} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Source Information</h2>
              <SourceInformation
                uploadedFiles={uploadedFiles}
                selectedPresets={selectedPresets}
                onFileRemove={handleFileRemove}
                onPresetRemove={handlePresetRemove}
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">AI Preview</h2>
              <AIPreview uploadedFiles={uploadedFiles} selectedPresets={selectedPresets} />
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => setActiveTab("configure")}>Back to Configure</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

