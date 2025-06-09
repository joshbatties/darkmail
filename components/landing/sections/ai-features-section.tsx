import { CheckCircle, Search, BarChart2, Sparkles, Calendar } from "lucide-react"
import { ShowcaseAISearch } from "@/components/landing/showcase-ai-search"
import { ShowcaseAIInsights } from "@/components/landing/showcase-ai-insights"
import { ShowcaseCompose } from "@/components/landing/showcase-compose"
import { ShowcaseMeetingCoordinator } from "@/components/landing/showcase-meeting-coordinator"

export function AIFeaturesSection() {
  return (
    <section id="ai-features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              AI-Powered Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Work Smarter with AI</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our cutting-edge AI features save you time and enhance your productivity
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-20">
          {/* AI Search Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-500/10 p-2">
                    <Search className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Natural Language Search</h3>
                </div>
                <p className="text-muted-foreground">
                  Find exactly what you're looking for with natural language queries. Simply type what you need in
                  everyday language:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>"Find invoices from last month"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>"Show emails from John about the project"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>"Find attachments sent by marketing team"</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Our AI understands context and intent, making email search intuitive and powerful. No more complex
                  search operators or digging through folders.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-card rounded-xl border shadow-lg p-4">
              <ShowcaseAISearch />
            </div>
          </div>

          {/* AI Insights Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-card rounded-xl border shadow-lg p-4">
              <ShowcaseAIInsights />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <BarChart2 className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">Smart Insights & Analytics</h3>
              </div>
              <p className="text-muted-foreground">
                Gain valuable insights into your email habits and communications with AI-powered analytics:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Identify your top contacts and most important conversations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Track response times and improve your email efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Discover communication patterns and common topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Get personalized recommendations to improve your email workflow</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AI Writing Assistant */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold">AI Writing Assistant</h3>
                </div>
                <p className="text-muted-foreground">
                  Write emails faster and more effectively with our AI-powered writing assistant:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Smart text suggestions as you type, accepted with a simple Tab key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Context-aware completions that match your writing style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>One-click AI responses to common emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Grammar and style improvements as you compose</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Our AI learns from your writing style to provide personalized suggestions that sound like you, not a
                  robot.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-card rounded-xl border shadow-lg overflow-hidden">
              <ShowcaseCompose />
            </div>
          </div>

          {/* Meeting Coordinator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
              <ShowcaseMeetingCoordinator />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-orange-500/10 p-2">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold">Automated Meeting Coordination</h3>
              </div>
              <p className="text-muted-foreground">
                Eliminate the back-and-forth emails when scheduling meetings with our AI coordinator:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>AI analyzes availability across all participants' calendars</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Specify preferences for date, time, and duration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Get intelligent suggestions for optimal meeting times</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>One-click scheduling adds details directly to your email</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                Save hours of coordination time and schedule meetings in seconds, not days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

