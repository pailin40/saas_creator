import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { PlatformMetrics } from '../types/dashboard';
import { 
  Instagram, 
  Youtube, 
  Music, 
  Twitter, 
  Users, 
  Heart, 
  Eye, 
  FileText,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ExternalLink,
  Settings,
  RefreshCw,
  Unlink,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PlatformCardProps {
  platform: PlatformMetrics;
  onViewDetails?: (platform: string) => void;
  onRefresh?: (platform: string) => void;
  onDisconnect?: (platform: string) => void;
}

const iconMap = {
  Instagram,
  Youtube,
  Music,
  Twitter,
};

export function PlatformCard({ 
  platform, 
  onViewDetails,
  onRefresh,
  onDisconnect 
}: PlatformCardProps) {
  const IconComponent = iconMap[platform.icon as keyof typeof iconMap] || Users;
  const isPositive = platform.change > 0;
  
  // Mock last synced time - in real app this would come from platform data
  const lastSynced = new Date(Date.now() - Math.random() * 3600000); // Random time within last hour

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <IconComponent className="h-5 w-5" style={{ color: platform.color }} />
          {platform.platform}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary" 
            className={`text-xs ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}
          >
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {platform.change > 0 ? '+' : ''}{platform.change}%
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails?.(platform.platform)}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRefresh?.(platform.platform)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDisconnect?.(platform.platform)}
                className="text-red-600"
              >
                <Unlink className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              Followers
            </div>
            <div className="text-lg font-semibold">{platform.followers.toLocaleString()}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="h-3 w-3" />
              Engagement
            </div>
            <div className="text-lg font-semibold">{platform.engagement}%</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Engagement Rate</span>
            <span>{platform.engagement}%</span>
          </div>
          <Progress value={platform.engagement} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Reach:</span>
            <span>{(platform.reach / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Posts:</span>
            <span>{platform.posts}</span>
          </div>
        </div>
        
        {/* Last Synced */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
          <Clock className="h-3 w-3" />
          <span>Last synced {formatDistanceToNow(lastSynced, { addSuffix: true })}</span>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(platform.platform)}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Details
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onRefresh?.(platform.platform)}
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}