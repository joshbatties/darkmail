import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureComparison() {
  const features = [
    { name: "End-to-End Encryption", basic: true, pro: true, enterprise: true },
    { name: "Dark Mode Interface", basic: true, pro: true, enterprise: true },
    { name: "Web Access", basic: true, pro: true, enterprise: true },
    { name: "Mobile App Access", basic: false, pro: true, enterprise: true },
    { name: "Storage Space", basic: "5GB", pro: "25GB", enterprise: "100GB" },
    { name: "Natural Language Search", basic: "Basic", pro: "Advanced", enterprise: "Advanced" },
    { name: "AI Writing Assistant", basic: false, pro: true, enterprise: true },
    { name: "AI Meeting Coordinator", basic: false, pro: true, enterprise: true },
    { name: "Email Analytics", basic: "Basic", pro: "Advanced", enterprise: "Advanced+" },
    { name: "Custom Domain Support", basic: false, pro: "1 domain", enterprise: "5 domains" },
    { name: "Team Management", basic: false, pro: "Limited", enterprise: true },
    { name: "API Access", basic: false, pro: false, enterprise: true },
    { name: "Priority Support", basic: false, pro: true, enterprise: true },
    { name: "24/7 Support", basic: false, pro: false, enterprise: true },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feature Comparison</CardTitle>
        <CardDescription>
          Compare features across our different plans to find the one that's right for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Feature</TableHead>
                <TableHead className="text-center">Basic</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span>{feature.basic}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span>{feature.pro}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.enterprise === "boolean" ? (
                      feature.enterprise ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span>{feature.enterprise}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

