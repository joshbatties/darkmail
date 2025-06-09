"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShowcaseEmailList } from "./showcase-email-list"
import { ShowcaseEmailView } from "./showcase-email-view"
import { ShowcaseCompose } from "./showcase-compose"
import { ShowcaseAISearch } from "./showcase-ai-search"
import { ShowcaseAIInsights } from "./showcase-ai-insights"
import { ShowcaseMeetingCoordinator } from "./showcase-meeting-coordinator"
import { Mail, Search, BarChart2, Sparkles, Calendar } from "lucide-react"

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState("inbox")

  return (
    <Card className="w-full shadow-lg border-none">
      <CardHeader className="pb-2">
        <CardTitle>Try DarkMail Features</CardTitle>
        <CardDescription>Explore the key features of DarkMail with this interactive demo</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 rounded-none border-b">
            <TabsTrigger value="inbox" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Inbox</span>
            </TabsTrigger>
            <TabsTrigger value="compose" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Writing</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">AI Search</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="meeting" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Meetings</span>
            </TabsTrigger>
          </TabsList>
          <div className="p-4 md:p-6">
            <TabsContent value="inbox" className="mt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Your Inbox</h3>
                <ShowcaseEmailList />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Email View</h3>
                <ShowcaseEmailView />
              </div>
            </TabsContent>
            <TabsContent value="compose" className="mt-0">
              <h3 className="text-lg font-medium mb-3">AI-Powered Email Composition</h3>
              <p className="text-muted-foreground mb-4">
                Write emails faster with AI suggestions. Press Tab to accept the suggestion.
              </p>
              <ShowcaseCompose />
            </TabsContent>
            <TabsContent value="search" className="mt-0">
              <h3 className="text-lg font-medium mb-3">Natural Language Search</h3>
              <p className="text-muted-foreground mb-4">
                Find exactly what you need using everyday language instead of complex search operators.
              </p>
              <ShowcaseAISearch />
            </TabsContent>
            <TabsContent value="insights" className="mt-0">
              <h3 className="text-lg font-medium mb-3">Email Analytics & Insights</h3>
              <p className="text-muted-foreground mb-4">
                Gain valuable insights into your email habits and communication patterns.
              </p>
              <ShowcaseAIInsights />
            </TabsContent>
            <TabsContent value="meeting" className="mt-0">
              <h3 className="text-lg font-medium mb-3">AI Meeting Coordinator</h3>
              <p className="text-muted-foreground mb-4">
                Schedule meetings without the back-and-forth emails. AI finds the perfect time for everyone.
              </p>
              <ShowcaseMeetingCoordinator />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

