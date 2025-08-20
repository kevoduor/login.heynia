import { Info } from "lucide-react";

const testsData = [
  {
    name: "appointment-flow",
    tests: 42,
    passes: 15,
    fails: -8,
    avgTime: "12s"
  },
  {
    name: "patient-records",
    tests: 38,
    passes: 22,
    fails: -5,
    avgTime: "9s"
  },
  {
    name: "billing-system",
    tests: 156,
    passes: 100,
    fails: -12,
    avgTime: "20s"
  },
  {
    name: "treatment-plans",
    tests: 28,
    passes: 11,
    fails: -3,
    avgTime: "5s"
  },
  {
    name: "inventory-mgmt",
    tests: 67,
    passes: 21,
    fails: 0,
    avgTime: "8s"
  },
  {
    name: "patient-portal",
    tests: 89,
    passes: 42,
    fails: -15,
    avgTime: "9s"
  },
];

export const TestsTable = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            MOST CRITICAL SYSTEMS
          </h3>
          <Info className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <select className="bg-muted border border-border rounded px-3 py-1 text-sm text-foreground">
          <option>Last month</option>
          <option>Last week</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                System
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Tests
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Passes
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Fails
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                Avg Time
              </th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {testsData.map((test, index) => (
              <tr key={index} className="border-b border-border/50 last:border-b-0">
                <td className="py-3">
                  <span className="text-sm font-medium text-card-foreground">
                    {test.name}
                  </span>
                </td>
                <td className="text-right py-3">
                  <span className="text-sm text-card-foreground">
                    {test.tests > 100 ? `+${test.tests}` : test.tests}
                  </span>
                </td>
                <td className="text-right py-3">
                  <span className="text-sm text-metric-positive">
                    +{test.passes}
                  </span>
                </td>
                <td className="text-right py-3">
                  <span className={`text-sm ${test.fails === 0 ? 'text-muted-foreground' : 'text-metric-negative'}`}>
                    {test.fails === 0 ? '-0' : test.fails}
                  </span>
                </td>
                <td className="text-right py-3">
                  <span className="text-sm text-muted-foreground">
                    {test.avgTime}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};