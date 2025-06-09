"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FAQSection() {
  const faqs = [
    {
      question: "How secure is DarkMail?",
      answer:
        "DarkMail uses end-to-end encryption for all communications, meaning only you and your intended recipients can read your emails. Even we cannot access the content of your messages. We also offer two-factor authentication and other advanced security features to keep your account secure.",
    },
    {
      question: "How does the AI writing assistant work?",
      answer:
        "Our AI writing assistant analyzes the context of your email and your writing style to suggest relevant completions as you type. Simply press Tab to accept suggestions. The AI learns from your writing patterns over time to provide increasingly personalized suggestions. All processing is done securely and your data is never used to train models for other users.",
    },
    {
      question: "Can I use DarkMail with my existing email address?",
      answer:
        "Yes! DarkMail supports importing emails from your existing accounts. You can also set up email forwarding from your current provider to DarkMail. Pro and Enterprise plans support custom domains, allowing you to use your own domain name with DarkMail.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, DarkMail offers mobile apps for both iOS and Android devices. The mobile apps include all the core features of the web client, including end-to-end encryption, AI-powered search, and smart notifications. Mobile access is available on Pro and Enterprise plans.",
    },
    {
      question: "How does the meeting coordinator save time?",
      answer:
        "The AI meeting coordinator analyzes the calendars of all participants to find optimal meeting times. Instead of sending multiple emails back and forth to find a time that works for everyone, you simply specify your preferences, and the AI suggests available slots. One click adds the meeting details to your email, saving hours of coordination time.",
    },
    {
      question: "Can I try DarkMail before subscribing?",
      answer:
        "All plans include a 14-day free trial with no credit card required. You'll have full access to all features included in your selected plan during the trial period.",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find answers to common questions about DarkMail</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

