import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ServerIcon, 
  BellIcon, 
  ShieldIcon,
  LineChartIcon,
  PieChartIcon,
  ZapIcon,
  StatusCircleIcon,
  RotateIcon
} from "@/components/icons";
import FeatureCard from "@/components/home/feature-card";
import HeroSection from "@/components/home/hero-section";
import TestimonialSection from "@/components/home/testimonial-section";
import CompanyLogos from "@/components/home/company-logos";
import PricingSection from "@/components/home/pricing-section";
import FaqSection from "@/components/home/faq-section";
import CtaSection from "@/components/home/cta-section";
import LiveDemoSection from "@/components/home/live-demo-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* Companies */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl font-medium text-muted-foreground mb-8">
            Trusted by innovative companies worldwide
          </h2>
          <CompanyLogos />
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
              Complete monitoring for your entire stack
            </h2>
            <p className="text-xl text-muted-foreground">
              Get alerted before your customers notice any problems with your services.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<ServerIcon className="h-6 w-6 text-blue-500" />}
              title="Website Monitoring" 
              description="Monitor your websites with HTTP(S) checks from multiple regions around the world."
            />
            <FeatureCard 
              icon={<StatusCircleIcon className="h-6 w-6 text-green-500" />}
              title="Status Page" 
              description="Create beautiful status pages to keep your customers informed about your service status."
            />
            <FeatureCard 
              icon={<BellIcon className="h-6 w-6 text-orange-500" />}
              title="Smart Alerts" 
              description="Get notified via SMS, email, Slack, and more when your services go down."
            />
            <FeatureCard 
              icon={<ShieldIcon className="h-6 w-6 text-purple-500" />}
              title="SSL Monitoring" 
              description="Receive alerts before your SSL certificates expire and prevent security warnings."
            />
            <FeatureCard 
              icon={<LineChartIcon className="h-6 w-6 text-indigo-500" />}
              title="Detailed Reports" 
              description="Get insightful analytics and uptime reports to improve your service reliability."
            />
            <FeatureCard 
              icon={<ZapIcon className="h-6 w-6 text-yellow-500" />}
              title="API Monitoring" 
              description="Test your API endpoints for availability, performance, and correctness."
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/features">
              <Button variant="outline" size="lg" className="group">
                Explore all features
                <RotateIcon className="ml-2 h-4 w-4 transition-transform group-hover:rotate-90" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Live Demo */}
      <LiveDemoSection />
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Pricing */}
      <PricingSection />
      
      {/* FAQ */}
      <FaqSection />
      
      {/* CTA */}
      <CtaSection />
    </div>
  );
}