"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden border transition-all duration-300",
        isHovered ? "shadow-lg -translate-y-1" : "shadow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
        isHovered ? "opacity-[0.03]" : "",
        "from-blue-500 to-purple-600"
      )} />
      <CardContent className="p-6">
        <div className={cn(
          "mb-4 rounded-full w-12 h-12 flex items-center justify-center transition-transform duration-300",
          isHovered ? "scale-110" : "",
          "bg-primary/5"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}