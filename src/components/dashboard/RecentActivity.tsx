import { Info, Zap, Settings, CheckCircle, AlertTriangle, GitPullRequest } from "lucide-react";

const activities = [
  {
    type: "automated",
    icon: Zap,
    title: "Scheduled appointment reminder",
    subtitle: "patient-flow.js",
    change: "+3 bookings",
    color: "text-metric-positive"
  },
  {
    type: "manual",
    icon: Settings,
    title: "Updated treatment plan",
    subtitle: "treatmentService.js",
    change: "+2 procedures",
    color: "text-metric-positive"
  },
  {
    type: "automated",
    icon: CheckCircle,
    title: "Insurance claim processed",
    subtitle: "billing-system.js",
    change: "+1 claim",
    color: "text-metric-positive"
  },
  {
    type: "manual",
    icon: AlertTriangle,
    title: "Equipment maintenance alert",
    subtitle: "equipment-api.js",
    change: "+1 alert",
    color: "text-metric-positive"
  },
  {
    type: "automated",
    icon: GitPullRequest,
    title: "Patient data backup completed",
    subtitle: "data-backup.js",
    change: "+1 backup",
    color: "text-metric-positive"
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            RECENT ACTIVITY
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
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <activity.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.type === "automated" ? "🤖" : "👤"} {activity.subtitle}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`text-sm font-medium ${activity.color}`}>
                {activity.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};