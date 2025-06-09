import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ShowcaseEmailList } from "@/components/landing/showcase-email-list"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
                Secure. Intelligent. Beautiful.
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The AI-Powered Email Client for the Modern Age
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                DarkMail combines end-to-end encryption with cutting-edge AI to transform your email experience. Work
                smarter, communicate securely, and save time with intelligent features.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-1">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[500px] overflow-hidden rounded-xl border shadow-xl">
              <ShowcaseEmailList />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

