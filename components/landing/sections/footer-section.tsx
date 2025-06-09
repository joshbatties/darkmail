import Link from "next/link"
import { Mail } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <span className="font-bold">DarkMail</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} DarkMail. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}
