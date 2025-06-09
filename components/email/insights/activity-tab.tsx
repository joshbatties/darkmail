"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, MessageSquare } from "lucide-react"

export function ActivityTab() {
  const commonTopics = [
    { topic: "Website Redesign", percentage: 35 },
    { topic: "Marketing Campaign", percentage: 25 },
    { topic: "Budget Planning", percentage: 20 },
    { topic: "Team Meeting", percentage: 15 },
    { topic: "Client Feedback", percentage: 5 },
  ]

  return (
    <div className="pt-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Email Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">10:30 AM</p>
                  <p className="text-sm text-muted-foreground">Most active time</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <MessageSquare className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">103</p>
                  <p className="text-sm text-muted-foreground">Weekly emails</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">27</p>
                  <p className="text-sm text-muted-foreground">Unique contacts</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Common Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {commonTopics.map((topic, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{topic.topic}</span>
                        <span className="font-medium">{topic.percentage}%</span>
                      </div>
                      <Progress value={topic.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
