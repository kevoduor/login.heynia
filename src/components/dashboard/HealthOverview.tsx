import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

const healthLevels = [
  { label: "Critical", value: 12, percentage: "15%", color: "bg-health-critical" },
  { label: "High", value: 18, percentage: "22%", color: "bg-health-high" },
  { label: "Medium", value: 8, percentage: "10%", color: "bg-health-medium" },
  { label: "Low", value: 45, percentage: "53%", color: "bg-health-low" },
];

export const HealthOverview = () => {
  const overallScore = 87;
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            CLINIC HEALTH OVERVIEW
          </h3>
          <Info className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <select className="bg-muted border border-border rounded px-3 py-1 text-sm text-foreground">
          <option>Last month</option>
          <option>Last week</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="space-y-6">
        {/* Overall Health Score */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-4xl font-bold text-card-foreground">{overallScore}</span>
            <span className="text-2xl text-muted-foreground">/100</span>
            <span className="text-sm text-muted-foreground ml-2">Overall Health</span>
          </div>
          
          {/* Health bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
            <div className="h-full bg-health-critical" style={{ width: "15%" }} />
            <div className="h-full bg-health-high" style={{ width: "22%" }} />
            <div className="h-full bg-health-medium" style={{ width: "10%" }} />
            <div className="h-full bg-health-low" style={{ width: "53%" }} />
          </div>
        </div>
        
        {/* Health Breakdown */}
        <div className="space-y-3">
          {healthLevels.map((level) => (
            <div key={level.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={cn("w-3 h-3 rounded-full", level.color)} />
                <span className="text-sm font-medium text-card-foreground">{level.label}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{level.percentage}</span>
                <span className="text-sm font-medium text-card-foreground w-8 text-right">
                  {level.value}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Change indicator */}
        <div className="flex items-center space-x-2 pt-4 border-t border-border">
          <span className="text-sm text-metric-positive">↗ 5%</span>
          <span className="text-sm text-muted-foreground">fewer critical issues than last month</span>
        </div>
      </div>
    </div>
  );
};