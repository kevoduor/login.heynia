import React from "react";
import { LucideIcon, TrendingUp, TrendingDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon?: LucideIcon;
  trend?: "up" | "down";
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon,
  trend,
  className 
}: MetricCardProps) => {
  const isPositive = change > 0;
  const trendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;
  
  return (
    <div className={cn("bg-card border border-border rounded-lg p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <Info className="w-4 h-4 text-muted-foreground/60" />
        </div>
        {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-card-foreground">
          {value}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={cn(
            "flex items-center space-x-1 text-sm font-medium",
            isPositive ? "text-metric-positive" : "text-metric-negative"
          )}>
            {trendIcon && React.createElement(trendIcon, { className: "w-4 h-4" })}
            <span>{isPositive ? "+" : ""}{change}%</span>
          </div>
          <span className="text-sm text-muted-foreground">{changeLabel}</span>
        </div>
      </div>
      
      {/* Mini chart area */}
      <div className="mt-4 h-12 flex items-end justify-end">
        <svg className="w-24 h-8" viewBox="0 0 100 32">
          <path
            d={isPositive 
              ? "M0,24 Q25,20 50,16 T100,8" 
              : "M0,8 Q25,12 50,16 T100,24"
            }
            fill="none"
            stroke={isPositive ? "hsl(var(--metric-positive))" : "hsl(var(--metric-negative))"}
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
};