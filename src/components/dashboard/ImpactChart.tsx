import { Info } from "lucide-react";

const impactData = [
  { label: "Legacy system improved", value: 40, color: "hsl(var(--chart-primary))" },
  { label: "Staff efficiency", value: 30, color: "hsl(var(--chart-secondary))" },
  { label: "Patient satisfaction", value: 20, color: "hsl(var(--chart-tertiary))" },
  { label: "Equipment upgraded", value: 10, color: "hsl(var(--chart-quaternary))" },
];

export const ImpactChart = () => {
  const total = impactData.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            CLINIC IMPACT
          </h3>
          <Info className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <select className="bg-muted border border-border rounded px-3 py-1 text-sm text-foreground">
          <option>Last month</option>
          <option>Last week</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          {impactData.map((item, index) => {
            const percentage = Math.round((item.value / total) * 100);
            return (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-card-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-card-foreground">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-card-foreground">42K</div>
              <div className="text-sm text-muted-foreground">Improvements</div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 ml-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {impactData.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${(percentage / 100) * 351.86} 351.86`;
                const strokeDashoffset = -((cumulativePercentage / 100) * 351.86);
                cumulativePercentage += percentage;
                
                return (
                  <circle
                    key={index}
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};