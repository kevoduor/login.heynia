import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Activity, 
  Settings, 
  Search,
  TrendingUp,
  Shield,
  MessageSquare,
  CreditCard,
  FileText,
  Wrench,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import heyniaIcon from "@/assets/heynia-icon.png";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Patients", active: false },
  { icon: Calendar, label: "Appointments", active: false },
  { icon: Activity, label: "Treatments", active: false },
];

const systemHealthItems = [
  { icon: TrendingUp, label: "System Overview", active: false },
  { icon: Shield, label: "Risk Map", active: false },
  { icon: MessageSquare, label: "Healing Activity", active: false },
];

const automationItems = [
  { icon: Wrench, label: "AI Engine", active: false },
  { icon: FileText, label: "Smart Reports", active: false },
  { icon: TrendingUp, label: "Analytics Engine", active: false },
];

const integrationItems = [
  { icon: CreditCard, label: "Payment Systems", active: false },
  { icon: Settings, label: "Connected Tools", active: false },
];

const administrationItems = [
  { icon: Settings, label: "Settings", active: false },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { user, signOut } = useAuth();
  return (
    <div className={cn("flex flex-col h-full bg-sidebar border-r border-sidebar-border", className)}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <img src={heyniaIcon} alt="HeyNia" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-lg text-sidebar-foreground">HeyNia</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/60" />
          <input 
            type="text"
            placeholder="Search"
            className="w-full bg-sidebar-accent border border-sidebar-border rounded-lg pl-10 pr-4 py-2 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="bg-sidebar-border text-sidebar-foreground/60 px-1.5 py-0.5 rounded text-xs">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-8">
          {/* Main Navigation */}
          <div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* System Health */}
          <div>
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              System Health
            </h3>
            <nav className="space-y-1">
              {systemHealthItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Automation Engines */}
          <div>
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Automation Engines
            </h3>
            <nav className="space-y-1">
              {automationItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Integrations
            </h3>
            <nav className="space-y-1">
              {integrationItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Administration */}
          <div>
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Administration
            </h3>
            <nav className="space-y-1">
              {administrationItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};