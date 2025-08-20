import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { HealthOverview } from "@/components/dashboard/HealthOverview";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TestsTable } from "@/components/dashboard/TestsTable";
import { ImpactChart } from "@/components/dashboard/ImpactChart";
import { BottomMetrics } from "@/components/dashboard/BottomMetrics";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar className="h-screen" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-background sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  System Status: <span className="text-success font-medium">Healthy</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              title="PATIENTS TREATED"
              value="1,247"
              change={7.6}
              changeLabel="than last month"
              icon={Users}
              trend="up"
            />
            <MetricCard 
              title="APPOINTMENTS SCHEDULED"
              value="856"
              change={17.4}
              changeLabel="than last month"
              icon={Calendar}
              trend="up"
            />
            <MetricCard 
              title="REVENUE GENERATED"
              value="$89K"
              change={11.3}
              changeLabel="than last month"
              icon={DollarSign}
              trend="up"
            />
          </div>
          
          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthOverview />
            <TestsTable />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityChart />
            <RecentActivity />
            <ImpactChart />
          </div>
          
          {/* Bottom Metrics */}
          <BottomMetrics />
        </div>
      </div>
    </div>
  );
};

export default Index;
