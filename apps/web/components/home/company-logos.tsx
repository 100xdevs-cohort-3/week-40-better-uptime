"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const companies = [
  "Airbnb", "Dropbox", "Shopify", "Spotify", "Slack", "Netflix"
];

export default function CompanyLogos() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {companies.map((company, index) => (
        <div
          key={company}
          className={cn(
            "text-xl font-semibold text-muted-foreground/70 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            {"delay-100": index % 6 === 1},
            {"delay-200": index % 6 === 2},
            {"delay-300": index % 6 === 3},
            {"delay-400": index % 6 === 4},
            {"delay-500": index % 6 === 5}
          )}
        >
          {company}
        </div>
      ))}
    </div>
  );
}