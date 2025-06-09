"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Upload, File } from "lucide-react"
import type { UploadedFile } from "./ai-behavior-system"

interface FileUploaderProps {
  onFileUpload: (files: UploadedFile[]) => void
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  // Update the handleFiles function to support PDF files
  const handleFiles = async (fileList: FileList) => {
    setIsUploading(true)
    setUploadProgress(0)

    const supportedFiles = Array.from(fileList).filter(
      (file) =>
        file.type === "text/plain" ||
        file.type === "application/json" ||
        file.type === "text/markdown" ||
        file.type === "text/csv" ||
        file.type === "application/pdf" ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md") ||
        file.name.endsWith(".json") ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".pdf"),
    )

    if (supportedFiles.length === 0) {
      alert("Please upload supported files only (.txt, .md, .json, .csv, .pdf)")
      setIsUploading(false)
      return
    }

    const uploadedFiles: UploadedFile[] = []

    for (let i = 0; i < supportedFiles.length; i++) {
      const file = supportedFiles[i]
      const progress = Math.round(((i + 1) / supportedFiles.length) * 100)
      setUploadProgress(progress)

      try {
        let content = ""

        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          content = await extractPdfText(file)
        } else {
          content = await readFileContent(file)
        }

        uploadedFiles.push({
          id: generateId(),
          name: file.name,
          content,
          size: file.size,
          type: file.type,
          dateUploaded: new Date(),
        })
      } catch (error) {
        console.error("Error reading file:", error)
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    onFileUpload(uploadedFiles)
    setIsUploading(false)
    setUploadProgress(0)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string)
        } else {
          reject(new Error("Failed to read file"))
        }
      }

      reader.onerror = () => {
        reject(new Error("File reading error"))
      }

      reader.readAsText(file)
    })
  }

  // Add a function to extract text from PDF files
  const extractPdfText = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (event) => {
        if (!event.target?.result) {
          reject(new Error("Failed to read PDF file"))
          return
        }

        try {
          // In a real implementation, we would use a PDF parsing library
          // For this example, we'll simulate PDF text extraction
          const arrayBuffer = event.target.result as ArrayBuffer

          // Simulate PDF parsing delay
          await new Promise((resolve) => setTimeout(resolve, 500))

          // Return a placeholder message for demonstration
          resolve(`[PDF Content Extracted] This is simulated content from the PDF file "${file.name}". 
In a real implementation, we would use a PDF parsing library like pdf.js to extract the actual text content.
The PDF is approximately ${Math.round(file.size / 1024)} KB in size.
        
Sample extracted content would appear here...
Page 1
-----------------
Document title
Section headings
Paragraphs of text
        
Page 2
-----------------
More content from the document
Tables, figures, and other elements would be converted to text
        
This text representation would then be used for AI processing just like other text files.`)
        } catch (error) {
          reject(new Error("Error parsing PDF: " + error))
        }
      }

      reader.onerror = () => {
        reject(new Error("Error reading PDF file"))
      }

      reader.readAsArrayBuffer(file)
    })
  }

  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 11)
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Drag and drop files here</h3>
          <p className="text-sm text-muted-foreground mb-2">or click to browse files</p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            <File className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".txt,.md,.json,.csv,.pdf,text/plain,text/markdown,application/json,text/csv,application/pdf"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={isUploading}
          />
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <p>Supported file types: .txt, .md, .json, .csv, .pdf</p>
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  )
}

