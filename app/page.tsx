import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { HeroSection } from "@/components/landing/sections/hero-section"
import { CoreFeaturesSection } from "@/components/landing/sections/core-features-section"
import { DemoSection } from "@/components/landing/sections/demo-section"
import { InterfaceShowcaseSection } from "@/components/landing/sections/interface-showcase-section"
import { SecuritySection } from "@/components/landing/sections/security-section"
import { MobileSection } from "@/components/landing/sections/mobile-section"
import { AIFeaturesSection } from "@/components/landing/sections/ai-features-section"
import { PricingSection } from "@/components/landing/sections/pricing-section"
import { ComparisonSection } from "@/components/landing/sections/comparison-section"
import { StatsSection } from "@/components/landing/sections/stats-section"
import { TestimonialsSection } from "@/components/landing/sections/testimonials-section"
import { FAQSection } from "@/components/landing/sections/faq-section"
import { CTASection } from "@/components/landing/sections/cta-section"
import { FooterSection } from "@/components/landing/sections/footer-section"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DarkMail</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#ai-features" className="text-sm font-medium hover:underline underline-offset-4">
              AI Capabilities
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <CoreFeaturesSection />
        <DemoSection />
        <InterfaceShowcaseSection />
        <SecuritySection />
        <MobileSection />
        <AIFeaturesSection />
        <PricingSection />
        <ComparisonSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  )
}

