"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Inbox, Star, Clock, Send } from "lucide-react"
import { EmailList } from "./email-list"

interface EmailTabsProps {
  onSelectEmail: (id: string) => void
}

export function EmailTabs({ onSelectEmail }: EmailTabsProps) {
  return (
    <Tabs defaultValue="inbox" className="flex-1 overflow-hidden flex flex-col">
      <TabsList className="grid grid-cols-4 p-1 m-2">
        <TabsTrigger value="inbox">
          <Inbox className="h-4 w-4 mr-2" />
          <span className="sr-only md:not-sr-only">Inbox</span>
        </TabsTrigger>
        <TabsTrigger value="starred">
          <Star className="h-4 w-4 mr-2" />
          <span className="sr-only md:not-sr-only">Starred</span>
        </TabsTrigger>
        <TabsTrigger value="snoozed">
          <Clock className="h-4 w-4 mr-2" />
          <span className="sr-only md:not-sr-only">Snoozed</span>
        </TabsTrigger>
        <TabsTrigger value="sent">
          <Send className="h-4 w-4 mr-2" />
          <span className="sr-only md:not-sr-only">Sent</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox" className="flex-1 overflow-auto p-0">
        <EmailList onSelectEmail={onSelectEmail} />
      </TabsContent>
      <TabsContent value="starred" className="flex-1 overflow-auto p-0">
        <div className="p-4 text-center text-muted-foreground">No starred emails</div>
      </TabsContent>
      <TabsContent value="snoozed" className="flex-1 overflow-auto p-0">
        <div className="p-4 text-center text-muted-foreground">No snoozed emails</div>
      </TabsContent>
      <TabsContent value="sent" className="flex-1 overflow-auto p-0">
        <div className="p-4 text-center text-muted-foreground">No sent emails</div>
      </TabsContent>
    </Tabs>
  )
}
