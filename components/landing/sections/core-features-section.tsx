import { Card, CardContent } from "@/components/ui/card"
import { Shield, Moon, Zap, Star, Smartphone, Lock } from "lucide-react"

export function CoreFeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "Your messages are encrypted from the moment you hit send until they're read by the recipient. No one, not even us, can access your private communications.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Moon,
      title: "Beautiful Dark Interface",
      description:
        "Easy on the eyes with our thoughtfully designed dark interface. Perfect for long hours of use and late-night email sessions, reducing eye strain and battery consumption.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description:
        "Experience instant loading, smooth transitions, and responsive design. DarkMail is optimized for speed and efficiency, even with thousands of emails.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Star,
      title: "Intuitive Organization",
      description:
        "Easily manage your inbox with intuitive tools for starring important emails, archiving, and organizing your communications. Never lose an important message again.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Access",
      description:
        "Access your emails from anywhere with our web client and mobile apps. Your emails sync seamlessly across all your devices, keeping you connected wherever you go.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description:
        "Protect your account with advanced authentication options including two-factor authentication. Your security is our top priority.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Core Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need in an Email Client</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              DarkMail combines security, usability, and powerful features to transform your email experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className={`rounded-full ${feature.bgColor} p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
