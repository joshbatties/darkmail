"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ContactsTab() {
  const topContacts = [
    { name: "John Doe", email: "john@example.com", count: 28, lastContact: "2 days ago" },
    { name: "Jane Smith", email: "jane@example.com", count: 23, lastContact: "1 day ago" },
    { name: "Marketing Team", email: "marketing@example.com", count: 17, lastContact: "3 days ago" },
    { name: "Support", email: "support@example.com", count: 12, lastContact: "5 days ago" },
    { name: "Alex Johnson", email: "alex@example.com", count: 8, lastContact: "1 week ago" },
  ]

  return (
    <div className="pt-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContacts.map((contact, index) => (
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
    </div>
  )
}

