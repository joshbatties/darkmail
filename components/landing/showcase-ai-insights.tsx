"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, MessageSquare } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ShowcaseAIInsights() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="pt-4 space-y-4">
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
                      <LineChart
                        data={[
                          { day: "Mon", received: 12, sent: 8 },
                          { day: "Tue", received: 18, sent: 10 },
                          { day: "Wed", received: 15, sent: 12 },
                          { day: "Thu", received: 20, sent: 15 },
                          { day: "Fri", received: 25, sent: 18 },
                          { day: "Sat", received: 8, sent: 5 },
                          { day: "Sun", received: 5, sent: 2 },
                        ]}
                        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                      >
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
          </TabsContent>

          <TabsContent value="contacts" className="pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@example.com", count: 28, lastContact: "2 days ago" },
                    { name: "Jane Smith", email: "jane@example.com", count: 23, lastContact: "1 day ago" },
                    { name: "Marketing Team", email: "marketing@example.com", count: 17, lastContact: "3 days ago" },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{contact.count} emails</p>
                        <p className="text-xs text-muted-foreground">Last contact: {contact.lastContact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="pt-4">
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

