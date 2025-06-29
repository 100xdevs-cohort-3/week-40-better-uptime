"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlobeIcon, ZapIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('cta-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        if (isInView) setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="cta-section" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div 
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-1.5 mb-6">
            <ZapIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Start monitoring in minutes</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl md:text-5xl">
            Ready to keep your services <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">up and running</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies that rely on BetterUptime to monitor their critical infrastructure and keep their customers happy.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Get started for free
            </Button>
            <Button size="lg" variant="outline">
              <GlobeIcon className="mr-2 h-4 w-4" /> View live demo
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. 10-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
}