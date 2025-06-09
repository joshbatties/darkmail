import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, KeyRound, Eye, Bell, FileCheck } from "lucide-react"

export function SecurityFeatures() {
  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All messages are encrypted on your device and can only be decrypted by the intended recipient.",
    },
    {
      icon: Lock,
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account with SMS, authenticator apps, or hardware keys.",
    },
    {
      icon: KeyRound,
      title: "Zero-Knowledge Architecture",
      description: "We cannot access your emails or attachments, even if requested by authorities.",
    },
    {
      icon: Eye,
      title: "Privacy Controls",
      description: "Granular controls over what data is collected and how your information is used.",
    },
    {
      icon: Bell,
      title: "Security Alerts",
      description: "Receive notifications about suspicious login attempts or unusual account activity.",
    },
    {
      icon: FileCheck,
      title: "Regular Security Audits",
      description: "Our systems undergo regular third-party security audits to ensure your data remains protected.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
