import { Info } from "lucide-react";

const metricsData = [
  {
    title: "APPOINTMENT FREQUENCY",
    value: "2d 4hrs",
    change: "+38%",
    changeType: "positive",
    subtitle: "Elite",
    subtitleValue: "285 Total Appointments"
  },
  {
    title: "PATIENT SATISFACTION RATE",
    value: "97%",
    change: "+12%",
    changeType: "positive",
    subtitle: "High",
    subtitleValue: "48 Total Reviews"
  },
  {
    title: "TREATMENT CYCLE TIME",
    value: "1d 8hrs",
    change: "-26%",
    changeType: "positive",
    subtitle: "Low",
    subtitleValue: "243 Total Treatments"
  },
  {
    title: "REVENUE RESPONSE TIME",
    value: "3.2hrs",
    change: "-7%",
    changeType: "positive",
    subtitle: "Mid",
    subtitleValue: "48 Total Claims"
  },
];

export const BottomMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {metric.title}
              </h3>
              <Info className="w-3 h-3 text-muted-foreground/60" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-2xl font-bold text-card-foreground">
              {metric.value}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  metric.changeType === "positive" ? "text-metric-positive" : "text-metric-negative"
                }`}>
                  {metric.change}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  metric.subtitle === "Elite" ? "bg-success/20 text-success" :
                  metric.subtitle === "High" ? "bg-primary/20 text-primary" :
                  metric.subtitle === "Low" ? "bg-destructive/20 text-destructive" :
                  "bg-warning/20 text-warning"
                }`}>
                  {metric.subtitle}
                </span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {metric.subtitleValue}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};