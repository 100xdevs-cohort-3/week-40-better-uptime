"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ServerIcon,
  BellIcon,
  ShieldIcon,
  LineChartIcon,
  StatusCircleIcon,
  GlobeIcon,
  PieChartIcon,
  SmartphoneIcon,
  MessageSquareIcon,
} from '@/components/icons';

// Define feature tabs
const featureTabs = [
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: <ServerIcon className="h-4 w-4" />,
  },
  {
    id: 'alerting',
    label: 'Alerting',
    icon: <BellIcon className="h-4 w-4" />,
  },
  {
    id: 'status-page',
    label: 'Status Page',
    icon: <StatusCircleIcon className="h-4 w-4" />,
  },
  {
    id: 'reporting',
    label: 'Reporting',
    icon: <LineChartIcon className="h-4 w-4" />,
  },
];

export default function FeaturesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('monitoring');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-background/90">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Powerful features for complete <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">monitoring</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to monitor your websites, APIs, and services with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 mb-10">
          <Tabs 
            defaultValue="monitoring" 
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <div className="flex justify-center mb-10 ">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 pb-12">
                {featureTabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 py-3 px-6"
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="monitoring" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={cn(
                  "transition-all duration-1000 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Comprehensive monitoring for all your systems
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Monitor everything from websites and APIs to servers and background jobs. Get notified when anything goes wrong.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <GlobeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Website Monitoring</h3>
                        <p className="text-muted-foreground">
                          Monitor your websites from multiple locations globally. Check for response times, status codes, and content validation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                        <ServerIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">API Monitoring</h3>
                        <p className="text-muted-foreground">
                          Monitor your API endpoints with custom request methods, headers, and body. Validate JSON responses with flexible assertion rules.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <ShieldIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">SSL Certificate Monitoring</h3>
                        <p className="text-muted-foreground">
                          Get notified before your SSL certificates expire. Prevent security warnings and downtime.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Start monitoring
                  </Button>
                </div>
                
                <div className={cn(
                  "relative transition-all duration-1000 delay-300 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
                    <Image
                      src="https://images.pexels.com/photos/5474296/pexels-photo-5474296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Monitoring Dashboard"
                      width={600}
                      height={400}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alerting" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={cn(
                  "transition-all duration-1000 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Intelligent alerts for quick response
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Get notified through your preferred channels when issues arise. Customize escalation policies and on-call schedules.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                        <BellIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Multi-channel Notifications</h3>
                        <p className="text-muted-foreground">
                          Get alerts via email, SMS, phone calls, Slack, Discord, Microsoft Teams, and more.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                        <SmartphoneIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">On-call Schedules</h3>
                        <p className="text-muted-foreground">
                          Create custom on-call schedules and rotations for your team. Ensure the right person gets notified at the right time.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                        <MessageSquareIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Escalation Policies</h3>
                        <p className="text-muted-foreground">
                          Define escalation policies to ensure critical issues are addressed promptly if the primary contact doesn't respond.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Set up alerts
                  </Button>
                </div>
                
                <div className={cn(
                  "relative transition-all duration-1000 delay-300 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
                    <Image
                      src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Alerting Interface"
                      width={600}
                      height={400}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="status-page" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={cn(
                  "transition-all duration-1000 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Beautiful, customizable status pages
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Keep your customers informed with branded status pages. Display real-time status of your services and communicate incidents effectively.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                        <StatusCircleIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Custom Branding</h3>
                        <p className="text-muted-foreground">
                          Add your logo, colors, and custom domain to match your brand identity.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                        <GlobeIcon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Automated Updates</h3>
                        <p className="text-muted-foreground">
                          Status pages automatically update when incidents are detected or resolved.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                        <MessageSquareIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Incident Communication</h3>
                        <p className="text-muted-foreground">
                          Create and update incidents with clear communication to keep your customers informed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Create status page
                  </Button>
                </div>
                
                <div className={cn(
                  "relative transition-all duration-1000 delay-300 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
                    <Image
                      src="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Status Page"
                      width={600}
                      height={400}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reporting" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={cn(
                  "transition-all duration-1000 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    Detailed analytics and reporting
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Gain insights into your systems' performance with detailed analytics. Track uptime, response times, and reliability over time.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Uptime Reports</h3>
                        <p className="text-muted-foreground">
                          Track uptime percentages and SLA compliance across all your services.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                        <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Performance Analytics</h3>
                        <p className="text-muted-foreground">
                          Monitor response times and performance trends to identify areas for improvement.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <ServerIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Custom Reports</h3>
                        <p className="text-muted-foreground">
                          Generate custom reports for specific time periods, services, or incidents.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    View reports
                  </Button>
                </div>
                
                <div className={cn(
                  "relative transition-all duration-1000 delay-300 transform",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}>
                  <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
                    <Image
                      src="https://images.pexels.com/photos/7947403/pexels-photo-7947403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Analytics Dashboard"
                      width={600}
                      height={400}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Feature Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
              All the features you need
            </h2>
            <p className="text-xl text-muted-foreground">
              BetterUptime comes packed with everything to keep your services running smoothly.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <GlobeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                title: "Global Monitoring",
                description: "Monitor from multiple regions worldwide for accurate uptime data."
              },
              {
                icon: <BellIcon className="h-5 w-5 text-red-600 dark:text-red-400" />,
                title: "Advanced Alerting",
                description: "Customizable alerts with escalation policies and on-call schedules."
              },
              {
                icon: <StatusCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />,
                title: "Status Pages",
                description: "Branded status pages to communicate service status to customers."
              },
              {
                icon: <ShieldIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
                title: "SSL Monitoring",
                description: "Get notified before your SSL certificates expire."
              },
              {
                icon: <ServerIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
                title: "API Monitoring",
                description: "Comprehensive API testing with custom requests and validations."
              },
              {
                icon: <LineChartIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
                title: "Detailed Analytics",
                description: "Visualize performance metrics and uptime over time."
              },
              {
                icon: <MessageSquareIcon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />,
                title: "Incident Management",
                description: "Track and manage incidents from detection to resolution."
              },
              {
                icon: <PieChartIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
                title: "SLA Monitoring",
                description: "Track service level agreement compliance with detailed reports."
              },
              {
                icon: <SmartphoneIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
                title: "Mobile Apps",
                description: "Stay informed on the go with our mobile applications."
              }
            ].map((feature, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">
              Ready to improve your service reliability?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of companies that trust BetterUptime to monitor their critical infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Start your free trial
              </Button>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}