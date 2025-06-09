import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
