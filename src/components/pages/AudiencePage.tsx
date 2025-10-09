import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Calendar,
  UserPlus,
  UserMinus,
  Globe,
  Smartphone,
  Monitor,
  Download
} from 'lucide-react';

export function AudiencePage() {
  const demographicsData = [
    { age: '18-24', percentage: 35, count: '21,250' },
    { age: '25-34', percentage: 28, count: '17,020' },
    { age: '35-44', percentage: 20, count: '12,150' },
    { age: '45-54', percentage: 12, count: '7,290' },
    { age: '55+', percentage: 5, count: '3,040' }
  ];

  const locationData = [
    { country: 'United States', percentage: 42, flag: '🇺🇸' },
    { country: 'Canada', percentage: 18, flag: '🇨🇦' },
    { country: 'United Kingdom', percentage: 15, flag: '🇬🇧' },
    { country: 'Australia', percentage: 12, flag: '🇦🇺' },
    { country: 'Germany', percentage: 8, flag: '🇩🇪' },
    { country: 'Others', percentage: 5, flag: '🌍' }
  ];

  const topFollowers = [
    { name: 'Sarah Johnson', username: '@sarahj_designs', followers: '125K', avatar: '/api/placeholder/32/32' },
    { name: 'Mike Chen', username: '@mikechen_photo', followers: '89K', avatar: '/api/placeholder/32/32' },
    { name: 'Emma Wilson', username: '@emmawilson_art', followers: '67K', avatar: '/api/placeholder/32/32' },
    { name: 'Alex Rodriguez', username: '@alexr_fitness', followers: '54K', avatar: '/api/placeholder/32/32' },
    { name: 'Lisa Thompson', username: '@lisathompson_', followers: '43K', avatar: '/api/placeholder/32/32' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audience</h1>
          <p className="text-muted-foreground">Understand your audience demographics and behavior</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Audience Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">144,900</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <UserPlus className="h-3 w-3" />
              +15.3% this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unfollows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <div className="flex items-center gap-1 text-sm text-red-600">
              <UserMinus className="h-3 w-3" />
              +5.2% this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              +2.1% vs avg
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographicsData.map((demo) => (
                <div key={demo.age} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{demo.age} years</span>
                    <span className="font-medium">{demo.count} ({demo.percentage}%)</span>
                  </div>
                  <Progress value={demo.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationData.map((location) => (
                <div key={location.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{location.flag}</span>
                    <span className="font-medium">{location.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={location.percentage} className="h-2 w-20" />
                    <span className="text-sm font-medium w-10 text-right">{location.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Female</span>
                  <span className="font-medium">58%</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Male</span>
                  <span className="font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Non-binary/Other</span>
                  <span className="font-medium">2%</span>
                </div>
                <Progress value={2} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Mobile</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">78%</div>
                  <div className="text-sm text-muted-foreground">112,920 users</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Desktop</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">18%</div>
                  <div className="text-sm text-muted-foreground">26,082 users</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Tablet</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">4%</div>
                  <div className="text-sm text-muted-foreground">5,796 users</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Followers */}
      <Card>
        <CardHeader>
          <CardTitle>Most Influential Followers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topFollowers.map((follower, index) => (
              <div key={follower.username} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-muted-foreground w-6">#{index + 1}</div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={follower.avatar} alt={follower.name} />
                    <AvatarFallback>{follower.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{follower.name}</div>
                    <div className="text-sm text-muted-foreground">{follower.username}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{follower.followers}</div>
                  <div className="text-sm text-muted-foreground">followers</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}