"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-16 pb-24">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      {/* Gradient Blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text */}
          <div className={cn(
            "max-w-xl mx-auto lg:mx-0 text-center lg:text-left transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <div className="inline-flex items-center rounded-full border bg-background/80 backdrop-blur-sm px-3 py-1 text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
              <span>99.9% Uptime Guarantee</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Know when your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">website is down</span> before your customers do
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              BetterUptime monitors your websites, APIs, and services 24/7 and alerts your team when things go wrong. Fix issues before they affect your customers.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" className="text-base">
                Start monitoring for free
              </Button>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-base">
                  Explore features
                </Button>
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. 10-day free trial.
            </p>
          </div>
          
          {/* Right Column: Dashboard Image */}
          <div className={cn(
            "relative transition-all duration-1000 delay-300 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
                <Image
                  src="https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="BetterUptime Dashboard"
                  width={800}
                  height={500}
                  className="w-full"
                />
              </div>
              
              {/* Status indicators */}
              <div className="absolute -left-6 top-16 animate-float-slow">
                <div className="flex items-center gap-2 rounded-full border bg-background/90 backdrop-blur-sm px-3 py-2 shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium">API: Operational</span>
                </div>
              </div>
              
              <div className="absolute -right-6 top-32 animate-float">
                <div className="flex items-center gap-2 rounded-full border bg-background/90 backdrop-blur-sm px-3 py-2 shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  <span className="text-sm font-medium">Website: Down</span>
                </div>
              </div>
              
              <div className="absolute bottom-12 left-24 animate-float-slow">
                <div className="flex items-center gap-2 rounded-full border bg-background/90 backdrop-blur-sm px-3 py-2 shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  <span className="text-sm font-medium">Database: Degraded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}