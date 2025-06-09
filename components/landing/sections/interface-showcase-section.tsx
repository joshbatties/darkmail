import { CheckCircle } from "lucide-react"
import { ShowcaseEmailView } from "@/components/landing/showcase-email-view"

export function InterfaceShowcaseSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">User Experience</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Beautiful, Intuitive Interface</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the clean, thoughtfully designed interface that makes email management a breeze
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Read and Manage Your Emails</h3>
              <p className="text-muted-foreground">
                Our clean, intuitive interface makes it easy to read and manage your emails. Star important messages,
                reply with a single click, and organize your inbox effortlessly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Clean, distraction-free reading experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Quick actions for common tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Attachment previews and management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>One-click AI-powered replies</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
              <ShowcaseEmailView />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

