"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Perfect for personal projects",
    price: {
      monthly: 0,
      yearly: 0
    },
    features: [
      "1 minute check interval",
      "1 monitor",
      "Email alerts",
      "Basic reporting",
      "12-hour data retention"
    ],
    cta: "Start for free",
    popular: false
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: {
      monthly: 29,
      yearly: 24
    },
    features: [
      "30 second check interval",
      "25 monitors",
      "SMS & email alerts",
      "Advanced reporting",
      "30-day data retention",
      "Custom status page",
      "Team members"
    ],
    cta: "Start 10-day trial",
    popular: true
  },
  {
    name: "Business",
    description: "For larger organizations",
    price: {
      monthly: 99,
      yearly: 89
    },
    features: [
      "10 second check interval",
      "100 monitors",
      "All alert channels",
      "Custom reporting",
      "90-day data retention",
      "Multiple status pages",
      "Unlimited team members",
      "API access",
      "Priority support"
    ],
    cta: "Start 10-day trial",
    popular: false
  }
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that works best for your business needs.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            />
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"
            )}>
              Yearly
              <span className="ml-1.5 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-0.5 text-xs text-white">
                Save 15%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
              plan.popular ? "border-blue-500/50 shadow-lg" : "border-border"
            )}>
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="w-32 h-32 overflow-hidden">
                    <div className="absolute transform rotate-45 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                      Most Popular
                    </div>
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-0">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="py-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price[billingCycle]}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                  {billingCycle === "yearly" && (
                    <div className="text-sm mt-2 text-muted-foreground">
                      Billed annually (${plan.price.yearly * 12}/year)
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className={cn(
                    "w-full",
                    plan.popular ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" : ""
                  )}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom plan? <a href="/contact" className="text-blue-500 hover:underline">Contact us</a> for enterprise pricing.
          </p>
        </div>
      </div>
    </section>
  );
}