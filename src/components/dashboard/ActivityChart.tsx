import { Info } from "lucide-react";

const activityData = [
  { label: "Week 1", autoFix: 78, manualFix: 22 },
  { label: "Week 2", autoFix: 75, manualFix: 25 },
  { label: "Week 3", autoFix: 82, manualFix: 18 },
  { label: "Week 4", autoFix: 85, manualFix: 15 },
];

export const ActivityChart = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            TREATMENT ACTIVITY
          </h3>
          <Info className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <select className="bg-muted border border-border rounded px-3 py-1 text-sm text-foreground">
          <option>Last month</option>
          <option>Last week</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {/* Stats */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-metric-positive">↗ 82.4%</span>
            <span className="text-sm text-muted-foreground">AI Assisted</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-metric-positive">↗ 17.6%</span>
            <span className="text-sm text-muted-foreground">Manual</span>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-48 relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 40}
                x2="400"
                y2={i * 40}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
            
            {/* AI Assisted line */}
            <path
              d="M50,156 Q150,140 250,116 T350,84"
              fill="none"
              stroke="hsl(var(--chart-primary))"
              strokeWidth="3"
              className="drop-shadow-sm"
            />
            
            {/* Manual line */}
            <path
              d="M50,176 Q150,180 250,164 T350,140"
              fill="none"
              stroke="hsl(var(--chart-secondary))"
              strokeWidth="3"
              className="drop-shadow-sm"
            />
            
            {/* Data points */}
            {activityData.map((_, index) => (
              <g key={index}>
                <circle
                  cx={50 + index * 100}
                  cy={156 - index * 18}
                  r="4"
                  fill="hsl(var(--chart-primary))"
                  className="drop-shadow-sm"
                />
                <circle
                  cx={50 + index * 100}
                  cy={176 - index * 9}
                  r="4"
                  fill="hsl(var(--chart-secondary))"
                  className="drop-shadow-sm"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};