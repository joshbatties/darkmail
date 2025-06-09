import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      title: "Basic",
      price: "$5",
      description: "Perfect for personal use",
      features: [
        "5GB Storage",
        "End-to-End Encryption",
        "Basic AI Search",
        "Web Access",
        "Basic Email Analytics",
        "Standard Support",
      ],
      highlighted: false,
    },
    {
      title: "Pro",
      price: "$12",
      description: "For professionals and small teams",
      features: [
        "25GB Storage",
        "End-to-End Encryption",
        "Advanced AI Search",
        "Web & Mobile Access",
        "AI Writing Assistant",
        "Meeting Coordinator",
        "Custom Domain (1)",
        "Priority Support",
      ],
      highlighted: true,
    },
    {
      title: "Enterprise",
      price: "$29",
      description: "For organizations with advanced needs",
      features: [
        "100GB Storage",
        "End-to-End Encryption",
        "Advanced AI Features",
        "Web & Mobile Access",
        "AI Writing Assistant",
        "Meeting Coordinator",
        "Custom Domains (5)",
        "Advanced Analytics",
        "24/7 Support",
        "Admin Controls",
        "API Access",
      ],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose the Plan That's Right for You</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Affordable options for individuals, professionals, and organizations
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm ${
                plan.highlighted ? "ring-2 ring-primary relative" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="p-6 flex flex-col space-y-2">
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="p-6 pt-0 flex flex-col space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  )
}

