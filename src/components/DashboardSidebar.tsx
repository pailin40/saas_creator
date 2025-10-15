import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Settings,
  Calendar,
  Target,
  TrendingUp,
  Instagram,
  Youtube,
  Music,
  Twitter,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/overview",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Content",
    icon: FileText,
    href: "/content",
  },
  {
    title: "Audience",
    icon: Users,
    href: "/audience",
  },
  {
    title: "Schedule",
    icon: Calendar,
    href: "/schedule",
  },
  {
    title: "Goals",
    icon: Target,
    href: "/goals",
  },
  {
    title: "Growth",
    icon: TrendingUp,
    href: "/growth",
  },
];

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    color: "#e440d9ff",
    href: "/instagram",
  },
  {
    name: "YouTube",
    icon: Youtube,
    color: "#FF0000",
    href: "/youtube",
  },
  {
    name: "TikTok",
    icon: Music,
    color: "#000000",
    href: "/tiktok",
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "#1DA1F2",
    href: "/twitter",
  },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active path
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-card">
      <ScrollArea className="flex-1 px-3 pt-6">
        <div className="space-y-6">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={currentPath === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentPath === item.href && "bg-secondary"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>

          <div className="px-3 space-y-1">
            {platforms.map((platform) => (
              <Button
                key={platform.name}
                variant={currentPath === platform.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentPath === platform.href && "bg-secondary"
                )}
                onClick={() => handleNavigation(platform.href)}
              >
                <platform.icon
                  className="mr-2 h-4 w-4"
                  style={{ color: platform.color }}
                />
                {platform.name}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="px-3 py-2 border-t border-border">
        <Button
          variant={currentPath === "/settings" ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start",
            currentPath === "/settings" && "bg-secondary"
          )}
          onClick={() => handleNavigation("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
