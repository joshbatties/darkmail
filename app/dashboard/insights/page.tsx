import { AIInsights } from "@/components/email/ai-insights"

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Insights</h1>
        <p className="text-muted-foreground">AI-powered analytics and insights about your email usage.</p>
      </div>
      <AIInsights />
    </div>
  )
}

