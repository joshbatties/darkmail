"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface AISearchProps {
  onSearchResults: (results: any[]) => void
}

export function AISearch({ onSearchResults }: AISearchProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [interpretation, setInterpretation] = useState<string | null>(null)

  // This would be a server action in a real implementation
  async function processNaturalLanguageQuery(query: string) {
    setIsSearching(true)
    setSearchActive(true)

    try {
      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock AI interpretation of the query
      let interpretedQuery = ""
      let results: any[] = []

      // Simple pattern matching for demo purposes
      if (query.toLowerCase().includes("invoice") || query.toLowerCase().includes("bill")) {
        interpretedQuery = "Searching for emails with invoices or billing information"
        results = mockEmails.filter(
          (email) =>
            email.subject.toLowerCase().includes("invoice") ||
            email.preview.toLowerCase().includes("invoice") ||
            email.subject.toLowerCase().includes("bill") ||
            email.preview.toLowerCase().includes("bill"),
        )
      } else if (query.toLowerCase().includes("from john")) {
        interpretedQuery = "Searching for emails from John"
        results = mockEmails.filter((email) => email.from.toLowerCase().includes("john"))
      } else if (query.toLowerCase().includes("project")) {
        interpretedQuery = "Searching for emails about projects"
        results = mockEmails.filter(
          (email) => email.subject.toLowerCase().includes("project") || email.preview.toLowerCase().includes("project"),
        )
      } else if (query.toLowerCase().includes("last month")) {
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        interpretedQuery = `Searching for emails from ${lastMonth.toLocaleString("default", { month: "long" })}`
        results = mockEmails.filter(
          (email) =>
            email.date.getMonth() === lastMonth.getMonth() && email.date.getFullYear() === lastMonth.getFullYear(),
        )
      } else {
        // Default search behavior
        interpretedQuery = `Searching for emails matching "${query}"`
        results = mockEmails.filter(
          (email) =>
            email.subject.toLowerCase().includes(query.toLowerCase()) ||
            email.preview.toLowerCase().includes(query.toLowerCase()) ||
            email.from.toLowerCase().includes(query.toLowerCase()),
        )
      }

      setInterpretation(interpretedQuery)
      onSearchResults(results)
    } catch (error) {
      console.error("Error processing search query:", error)
      setInterpretation("Error processing your search")
      onSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      processNaturalLanguageQuery(query)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSearchActive(false)
    setInterpretation(null)
    onSearchResults([])
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search using natural language..."
          className="w-full pl-10 pr-20"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={clearSearch}>
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button type="submit" size="sm" className="h-7 px-2 gap-1" disabled={!query.trim() || isSearching}>
            <Sparkles className="h-3 w-3" />
            AI Search
          </Button>
        </div>
      </form>

      {isSearching && (
        <Card className="p-3 mt-2">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      )}

      {!isSearching && searchActive && interpretation && (
        <Card className="p-3 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>{interpretation}</span>
          </div>
        </Card>
      )}
    </div>
  )
}

// Mock data for emails - this would come from your actual email data source
const mockEmails = [
  {
    id: "1",
    from: "John Doe",
    email: "john@example.com",
    subject: "Welcome to DarkMail",
    preview: "Thank you for signing up for DarkMail. We are excited to have you on board...",
    date: new Date(2023, 3, 15),
    read: false,
    starred: false,
  },
  {
    id: "2",
    from: "Jane Smith",
    email: "jane@example.com",
    subject: "Project Update",
    preview: "I wanted to share the latest updates on our project. We have made significant progress...",
    date: new Date(2023, 3, 14),
    read: true,
    starred: true,
  },
  {
    id: "3",
    from: "Accounting",
    email: "accounting@example.com",
    subject: "Invoice #12345",
    preview: "Please find attached the invoice for your recent subscription renewal...",
    date: new Date(2023, 2, 10), // Last month
    read: true,
    starred: false,
  },
  {
    id: "4",
    from: "Support Team",
    email: "support@example.com",
    subject: "Your Ticket #12345",
    preview: "We have received your support ticket and are working on resolving your issue...",
    date: new Date(2023, 3, 12),
    read: false,
    starred: false,
  },
  {
    id: "5",
    from: "John from Marketing",
    email: "john.marketing@example.com",
    subject: "Project Proposal",
    preview: "Here is the project proposal we discussed in our meeting yesterday...",
    date: new Date(2023, 2, 25), // Last month
    read: true,
    starred: false,
  },
]

