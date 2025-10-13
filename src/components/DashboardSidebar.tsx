import { cn } from './ui/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
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
  Twitter
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    href: '#overview',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '#analytics',
  },
  {
    title: 'Content',
    icon: FileText,
    href: '#content',
  },
  {
    title: 'Audience',
    icon: Users,
    href: '#audience',
  },
  {
    title: 'Schedule',
    icon: Calendar,
    href: '#schedule',
  },
  {
    title: 'Goals',
    icon: Target,
    href: '#goals',
  },
  {
    title: 'Growth',
    icon: TrendingUp,
    href: '#growth',
  },
];

const platforms = [
  {
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    status: 'connected',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    status: 'connected',
  },
  {
    name: 'TikTok',
    icon: Music,
    color: '#000000',
    status: 'connected',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: '#1DA1F2',
    status: 'connected',
  },
];

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export function DashboardSidebar({ activeItem, onNavigate }: DashboardSidebarProps) {

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">SOMI</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          <div className="px-3 py-2">
            <h3 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
              Navigation
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant={activeItem === item.href.slice(1) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    activeItem === item.href.slice(1) && "bg-secondary"
                  )}
                  onClick={() => onNavigate(item.href.slice(1))}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="px-3 py-2">
            <h3 className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
              Platforms
            </h3>
            <div className="space-y-1">
              {platforms.map((platform) => (
                <Button
                  key={platform.name}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <platform.icon 
                    className="mr-2 h-4 w-4" 
                    style={{ color: platform.color }}
                  />
                  {platform.name}
                  <div className="ml-auto h-2 w-2 rounded-full bg-green-500"></div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-6 border-t border-border">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}