"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw, BarChart2 } from "lucide-react"
import { AISearch } from "./ai-search"

interface EmailToolbarProps {
  onComposeClick: () => void
}

export function EmailToolbar({ onComposeClick }: EmailToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2" onClick={onComposeClick}>
          <Plus className="h-4 w-4" />
          Compose
        </Button>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Link href="/dashboard/insights">
          <Button variant="ghost" size="sm" className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Insights
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-sm">
        <AISearch
          onSearchResults={(results) => {
            // In a real implementation, you would update the email list with the search results
            console.log("Search results:", results)
          }}
        />
      </div>
    </div>
  )
}

