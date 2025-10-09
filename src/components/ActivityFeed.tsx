import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ActivityItem } from '../types/dashboard';
import { 
  TrendingUp, 
  UserPlus, 
  Upload, 
  AtSign, 
  Instagram, 
  Youtube, 
  Music, 
  Twitter 
} from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const iconMap = {
  TrendingUp,
  UserPlus,
  Upload,
  AtSign,
};

const platformIconMap = {
  Instagram,
  YouTube: Youtube,
  TikTok: Music,
  Twitter,
};

const platformColors = {
  Instagram: '#E4405F',
  YouTube: '#FF0000',
  TikTok: '#000000',
  Twitter: '#1DA1F2',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = iconMap[activity.icon as keyof typeof iconMap] || TrendingUp;
            const PlatformIcon = platformIconMap[activity.platform as keyof typeof platformIconMap];
            const platformColor = platformColors[activity.platform as keyof typeof platformColors];

            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {PlatformIcon && (
                        <PlatformIcon 
                          className="h-3 w-3 mr-1" 
                          style={{ color: platformColor }} 
                        />
                      )}
                      {activity.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}