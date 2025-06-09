import { StatsShowcase } from "@/components/landing/stats-showcase"

export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">By the Numbers</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">DarkMail Impact</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of users who trust DarkMail for their secure communications
            </p>
          </div>
        </div>

        <div className="mt-8">
          <StatsShowcase />
        </div>
      </div>
    </section>
  )
}
