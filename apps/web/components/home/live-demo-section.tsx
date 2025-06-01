"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusCircleIcon, ActivityIcon, BellIcon } from "@/components/icons";

// Types for our demo data
interface Monitor {
  id: number;
  name: string;
  url: string;
  status: "up" | "down" | "degraded";
  responseTime: number;
  lastChecked: string;
}

interface Incident {
  id: number;
  service: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  startTime: string;
  duration?: string;
}

// Demo data
const monitors: Monitor[] = [
  { id: 1, name: "Main Website", url: "https://example.com", status: "up", responseTime: 187, lastChecked: "1m ago" },
  { id: 2, name: "API Endpoint", url: "https://api.example.com/v1/health", status: "up", responseTime: 143, lastChecked: "30s ago" },
  { id: 3, name: "User Dashboard", url: "https://app.example.com/dashboard", status: "degraded", responseTime: 2340, lastChecked: "1m ago" },
  { id: 4, name: "Payment Gateway", url: "https://payments.example.com", status: "down", responseTime: 0, lastChecked: "2m ago" },
  { id: 5, name: "Marketing Site", url: "https://marketing.example.com", status: "up", responseTime: 210, lastChecked: "45s ago" },
];

const incidents: Incident[] = [
  { id: 1, service: "Payment Gateway", status: "investigating", startTime: "Started 12m ago" },
  { id: 2, service: "User Dashboard", status: "identified", startTime: "Started 35m ago" },
  { id: 3, service: "API Endpoint", status: "resolved", startTime: "2h ago", duration: "Lasted 15m" },
];

export default function LiveDemoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"monitors" | "incidents">("monitors");
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('live-demo');
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
  
  // Status color mapping
  const getStatusColor = (status: Monitor["status"] | Incident["status"]) => {
    switch (status) {
      case "up":
      case "resolved":
        return "bg-green-500";
      case "degraded":
      case "monitoring":
      case "identified":
        return "bg-yellow-500";
      case "down":
      case "investigating":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getStatusText = (status: Incident["status"]) => {
    switch (status) {
      case "investigating":
        return "Investigating";
      case "identified":
        return "Identified";
      case "monitoring":
        return "Monitoring";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };
  
  return (
    <section id="live-demo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            See BetterUptime in action
          </h2>
          <p className="text-xl text-muted-foreground">
            A live preview of our monitoring dashboard
          </p>
        </div>
        
        <div 
          className={cn(
            "max-w-4xl mx-auto transition-all duration-1000 transform bg-card rounded-xl overflow-hidden border shadow-xl",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          {/* Dashboard Header */}
          <div className="bg-muted/50 border-b p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">BetterUptime Dashboard</h3>
              <div className="text-sm text-muted-foreground">
                Last updated: Just now
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="flex border-b">
            <button
              className={cn(
                "py-3 px-6 font-medium text-sm flex items-center gap-2 transition-colors",
                activeTab === "monitors" 
                  ? "border-b-2 border-blue-500 text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab("monitors")}
            >
              <StatusCircleIcon className="w-4 h-4" />
              Monitors
            </button>
            <button
              className={cn(
                "py-3 px-6 font-medium text-sm flex items-center gap-2 transition-colors",
                activeTab === "incidents" 
                  ? "border-b-2 border-blue-500 text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab("incidents")}
            >
              <ActivityIcon className="w-4 h-4" />
              Incidents
            </button>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === "monitors" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="font-medium">5 monitors · 3 active incidents</div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Up</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      <span>Degraded</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>Down</span>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y rounded-lg border overflow-hidden">
                  {monitors.map((monitor) => (
                    <div 
                      key={monitor.id} 
                      className="flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn("w-3 h-3 rounded-full", getStatusColor(monitor.status))}></span>
                        <div>
                          <h4 className="font-medium">{monitor.name}</h4>
                          <p className="text-xs text-muted-foreground">{monitor.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {monitor.status === "down" ? "Down" : `${monitor.responseTime} ms`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {monitor.lastChecked}
                          </div>
                        </div>
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center",
                          monitor.status === "up" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          monitor.status === "degraded" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          <StatusCircleIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "incidents" && (
              <div className="space-y-4">
                <div className="font-medium mb-6">Recent incidents</div>
                
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <Card key={incident.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                          incident.status === "resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          incident.status === "monitoring" || incident.status === "identified" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {incident.status === "resolved" ? (
                            <StatusCircleIcon className="h-4 w-4" />
                          ) : (
                            <BellIcon className="h-4 w-4" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{incident.service}</h4>
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                              incident.status === "resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              incident.status === "monitoring" || incident.status === "identified" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            )}>
                              {getStatusText(incident.status)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {incident.status === "resolved" ? 
                              `${incident.startTime}. ${incident.duration}` : 
                              incident.startTime}
                          </p>
                          
                          {incident.status !== "resolved" && (
                            <p className="text-sm">
                              {incident.status === "investigating" ? 
                                "We are investigating reports of issues with this service." : 
                                "We have identified the cause of the issue and are working on a fix."}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}