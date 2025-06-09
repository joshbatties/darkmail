"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"
import { SummaryTab } from "./insights/summary-tab"
import { ContactsTab } from "./insights/contacts-tab"
import { ActivityTab } from "./insights/activity-tab"
import { ImportantTab } from "./insights/important-tab"

export function AIInsights() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading of AI insights
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <CardDescription>Last updated: Today at 10:45 AM</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 py-6">
            <div className="text-center text-sm text-muted-foreground">Analyzing your email patterns...</div>
            <Progress value={65} className="w-full" />
          </div>
        ) : (
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <SummaryTab />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactsTab />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityTab />
            </TabsContent>

            <TabsContent value="important">
              <ImportantTab />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
