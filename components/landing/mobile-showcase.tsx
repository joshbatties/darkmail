import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Check } from "lucide-react"

export function MobileShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">DarkMail on the Go</h3>
        <p className="text-muted-foreground">
          Access your secure emails from anywhere with our powerful mobile apps for iOS and Android.
        </p>
        <ul className="space-y-3">
          {[
            "Full end-to-end encryption on mobile",
            "Biometric authentication for extra security",
            "Offline access to your important emails",
            "Push notifications for new messages",
            "AI features available on mobile",
            "Seamless sync across all your devices",
          ].map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="relative w-[280px] h-[580px]">
          <div className="absolute inset-0 rounded-[40px] border-8 border-gray-800 bg-gray-800 shadow-lg overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 z-10 flex justify-center items-end pb-1">
              <div className="w-20 h-4 bg-gray-900 rounded-b-md"></div>
            </div>
            <div className="h-full pt-6 bg-background overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="h-12 border-b flex items-center px-4 bg-muted/30">
                  <Smartphone className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">DarkMail Mobile</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="p-3 space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-xs font-medium text-primary">{String.fromCharCode(64 + i)}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between">
                                <p className="font-medium text-sm truncate">Email Subject {i}</p>
                                <p className="text-xs text-muted-foreground">2h ago</p>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                This is a preview of the email message content...
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="h-14 border-t flex items-center justify-around px-4 bg-muted/30">
                  {["inbox", "star", "send", "person"].map((icon, i) => (
                    <div key={i} className="w-10 h-10 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground"}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
