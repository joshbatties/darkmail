import { Card, CardContent } from "@/components/ui/card"
import { Users, Mail, Shield, Clock } from "lucide-react"

export function StatsShowcase() {
  const stats = [
    {
      icon: Users,
      value: "100,000+",
      label: "Active Users",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Mail,
      value: "10M+",
      label: "Emails Protected",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Uptime",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Clock,
      value: "3.5 hrs",
      label: "Saved Weekly",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className={`rounded-full ${stat.bgColor} p-3 w-12 h-12 flex items-center justify-center mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

