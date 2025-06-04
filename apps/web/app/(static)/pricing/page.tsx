"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const pricingPlans = {
  website: [
    {
      name: "Free",
      description: "For personal projects",
      price: { monthly: 0, yearly: 0 },
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
      price: { monthly: 29, yearly: 24 },
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
      price: { monthly: 99, yearly: 89 },
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
  ],
  api: [
    {
      name: "Free",
      description: "For personal projects",
      price: { monthly: 0, yearly: 0 },
      features: [
        "2 minute check interval",
        "1 API monitor",
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
      price: { monthly: 39, yearly: 33 },
      features: [
        "1 minute check interval",
        "20 API monitors",
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
      price: { monthly: 129, yearly: 109 },
      features: [
        "30 second check interval",
        "75 API monitors",
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
  ],
  statusPage: [
    {
      name: "Free",
      description: "For personal projects",
      price: { monthly: 0, yearly: 0 },
      features: [
        "1 status page",
        "BetterUptime subdomain",
        "Basic customization",
        "1 team member",
        "Community support"
      ],
      cta: "Start for free",
      popular: false
    },
    {
      name: "Pro",
      description: "For growing businesses",
      price: { monthly: 19, yearly: 16 },
      features: [
        "5 status pages",
        "Custom domain",
        "Advanced customization",
        "Subscriber notifications",
        "5 team members",
        "Historical uptime data",
        "Standard support"
      ],
      cta: "Start 10-day trial",
      popular: true
    },
    {
      name: "Business",
      description: "For larger organizations",
      price: { monthly: 49, yearly: 42 },
      features: [
        "Unlimited status pages",
        "Multiple custom domains",
        "Full white-labeling",
        "Advanced metrics",
        "Unlimited team members",
        "1-year historical data",
        "Priority support",
        "SSO authentication"
      ],
      cta: "Start 10-day trial",
      popular: false
    }
  ]
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [pricingCategory, setPricingCategory] = useState<"website" | "api" | "statusPage">("website");
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that works best for your monitoring needs.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
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
            
            {/* Category Tabs */}
            <Tabs 
              defaultValue="website" 
              value={pricingCategory}
              onValueChange={(value) => setPricingCategory(value as "website" | "api" | "statusPage")}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="website">Website</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="statusPage">Status Page</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingPlans[pricingCategory].map((plan) => (
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
        </div>
      </section>
      
      {/* Enterprise */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Enterprise
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Custom solutions for large organizations with advanced needs.
            </p>
            
            <Card className="bg-gradient-to-br from-background to-muted/50 border-none shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Enterprise Features</h3>
                    <ul className="space-y-3">
                      {[
                        "Unlimited monitors across all types",
                        "5-second check intervals",
                        "Dedicated IP ranges",
                        "Custom SLA agreements",
                        "1-year data retention",
                        "SSO/SAML authentication",
                        "Dedicated account manager",
                        "24/7 premium support",
                        "Custom feature development",
                        "On-premise deployment options"
                      ].map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">Custom Pricing</h3>
                    <p className="text-muted-foreground mb-6">
                      Contact our sales team for a customized quote based on your specific requirements.
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
              Frequently asked questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans at any time?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 10-day free trial on all paid plans, so you can try before you commit. We don't typically offer refunds, but please contact support if you have extenuating circumstances."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we can also accommodate purchase orders and bank transfers."
                },
                {
                  question: "Can I combine different plans?",
                  answer: "Yes, you can mix and match plans as needed. For example, you might choose the Business plan for website monitoring but only need the Pro plan for status pages. Contact sales for custom package pricing."
                },
                {
                  question: "Do you offer discounts for nonprofits or educational institutions?",
                  answer: "Yes, we offer special pricing for nonprofit organizations, educational institutions, and open-source projects. Please contact our sales team with details about your organization to learn more."
                }
              ].map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Still have questions about pricing?
              </p>
              <Button size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of companies that trust BetterUptime to monitor their critical infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Start your free trial
              </Button>
              <Button size="lg" variant="outline">
                View features
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. 10-day free trial.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}