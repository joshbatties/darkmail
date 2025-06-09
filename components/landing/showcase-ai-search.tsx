"use client"

import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ShowcaseAISearch() {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search using natural language..."
          className="w-full pl-10 pr-20"
          value="find invoices from last month"
          readOnly
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <Button type="button" size="sm" className="h-7 px-2 gap-1">
            <Sparkles className="h-3 w-3" />
            AI Search
          </Button>
        </div>
      </div>

      <Card className="p-3 mt-2 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-muted-foreground">Searching for emails with invoices from March 2023</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-muted/50 rounded text-sm">
            <span>Invoice #12345</span>
            <span className="text-muted-foreground">Mar 15, 2023</span>
          </div>
          <div className="flex justify-between p-2 bg-muted/50 rounded text-sm">
            <span>Monthly Subscription</span>
            <span className="text-muted-foreground">Mar 10, 2023</span>
          </div>
          <div className="flex justify-between p-2 bg-muted/50 rounded text-sm">
            <span>Service Invoice</span>
            <span className="text-muted-foreground">Mar 22, 2023</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

