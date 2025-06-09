import { EmailClient } from "@/components/email/email-client"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your secure email client.</p>
      </div>
      <EmailClient />
    </div>
  )
}
