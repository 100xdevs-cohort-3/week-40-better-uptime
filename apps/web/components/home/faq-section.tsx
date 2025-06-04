"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does BetterUptime monitor my website?",
    answer: "BetterUptime monitors your website from multiple global locations by sending HTTP/HTTPS requests at regular intervals. We check for proper response codes, content validation, and load times to ensure your site is fully operational."
  },
  {
    question: "What alert channels do you support?",
    answer: "We support a variety of alert channels including email, SMS, phone calls, Slack, Microsoft Teams, Discord, PagerDuty, OpsGenie, Telegram, and webhook notifications. You can customize escalation policies for each channel."
  },
  {
    question: "Can I create a custom status page for my company?",
    answer: "Yes! Our Pro and Business plans include custom status pages that you can brand with your logo, colors, and domain name. You can display the status of your services in real-time and communicate incidents to your customers."
  },
  {
    question: "How often do you check my website?",
    answer: "Check frequencies depend on your plan. Our Free plan checks every minute, Pro plan every 30 seconds, and Business plan every 10 seconds. Enterprise customers can get even more frequent checks."
  },
  {
    question: "Is there an API available?",
    answer: "Yes, we provide a comprehensive API for Business and Enterprise customers. This allows you to integrate BetterUptime with your existing workflows, create and manage monitors programmatically, and extract reporting data."
  },
  {
    question: "Can I try BetterUptime before paying?",
    answer: "Absolutely! We offer a 10-day free trial on all paid plans with no credit card required. You can also use our Free plan indefinitely with limited features."
  }
];

export default function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>("item-0");
  
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about BetterUptime.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            value={openItem || undefined}
            onValueChange={(value) => setOpenItem(value)}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg overflow-hidden bg-card shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Still have questions? <a href="/contact" className="text-blue-500 hover:underline">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}