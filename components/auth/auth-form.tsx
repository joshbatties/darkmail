"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // This is a mock authentication - in a real app, you would call your auth API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, just redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <Mail className="h-10 w-10" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login"
            ? "Enter your email and password to access your account"
            : "Enter your email and create a password to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2">Loading...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                {mode === "login" ? "Sign In" : "Sign Up"} <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link href="/auth/signup" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
                Sign in
              </Link>
            </>
          )}
        </div>
        {mode === "login" && (
          <Link href="#" className="text-center text-sm underline underline-offset-4 hover:text-primary">
            Forgot your password?
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

