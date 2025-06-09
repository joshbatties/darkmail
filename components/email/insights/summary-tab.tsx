"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function SummaryTab() {
  const emailVolumeData = [
    { day: "Mon", received: 12, sent: 8 },
    { day: "Tue", received: 18, sent: 10 },
    { day: "Wed", received: 15, sent: 12 },
    { day: "Thu", received: 20, sent: 15 },
    { day: "Fri", received: 25, sent: 18 },
    { day: "Sat", received: 8, sent: 5 },
    { day: "Sun", received: 5, sent: 2 },
  ]

  return (
    <div className="pt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Email Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                received: {
                  label: "Received",
                  color: "hsl(var(--chart-1))",
                },
                sent: {
                  label: "Sent",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emailVolumeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="received" stroke="var(--color-received)" />
                  <Line type="monotone" dataKey="sent" stroke="var(--color-sent)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Average response time</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Response rate</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Emails requiring follow-up</span>
                  <span className="font-medium">7</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>Based on your email patterns this week:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your busiest day was Friday with 25 incoming emails</li>
              <li>You've been most responsive to emails from the Marketing team</li>
              <li>7 emails from high-priority contacts are awaiting your response</li>
              <li>Your email volume has increased by 15% compared to last week</li>
              <li>Most of your emails are related to the "Website Redesign" project</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
