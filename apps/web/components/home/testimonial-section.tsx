"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "BetterUptime has completely transformed how we monitor our services. We now catch issues before our customers even notice them.",
    author: "Sarah Johnson",
    role: "CTO at TechFlow",
    avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    content: "The incident management system is top-notch. We've reduced our downtime by 70% since implementing BetterUptime.",
    author: "Mark Chen",
    role: "DevOps Lead at ScaleGrid",
    avatar: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    content: "Our customers love our status page, and our team loves the ease of use. A win-win for everyone involved.",
    author: "Emily Rodriguez",
    role: "Product Manager at SaaS Central",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            Loved by teams worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            See why thousands of businesses trust BetterUptime with their monitoring needs.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={cn(
                "transition-all duration-500 overflow-hidden",
                index === activeIndex 
                  ? "border-blue-500/50 shadow-lg" 
                  : "border-border shadow hover:shadow-md"
              )}
              onClick={() => setActiveIndex(index)}
            >
              <CardContent className="p-6 space-y-4">
                <QuoteIcon className="h-8 w-8 text-blue-500/30" />
                <p className="text-lg">{testimonial.content}</p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}