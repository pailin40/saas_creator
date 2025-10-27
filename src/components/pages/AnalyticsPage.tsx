import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ChartControls } from '../ChartControls';
import { AnalyticsChart } from '../AnalyticsChart';
import { MetricsCard } from '../MetricsCard';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { 
  chartData, 
  platformMetrics,
  audienceDemographics,
  topPerformingContent,
  contentTypePerformance,
  sentimentData,
  hashtagPerformance,
  videoAnalytics,
  trafficSources,
  peakActivityTimes
} from '../../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Eye, 
  Heart, 
  Users, 
  Download,
  Calendar,
  Filter,
  Search,
  ArrowUpDown,
  Clock,
  MapPin,
  Globe,
  Play,
  MessageCircle,
  Share2,
  Bookmark,
  Hash,
  MousePointer,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  Star,
  Instagram,
  Youtube,
  Music,
  Twitter,
  ExternalLink,
  Home,
  Compass,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "#22c55e",
  },
  reach: {
    label: "Reach", 
    color: "#16a34a",
  },
  followers: {
    label: "Followers",
    color: "#15803d",
  },
  percentage: {
    label: "Percentage",
    color: "#22c55e",
  },
  avgEngagement: {
    label: "Avg Engagement Rate %",
    color: "#22c55e",
  },
};

export function AnalyticsPage() {
  const [engagementViewMode, setEngagementViewMode] = useState<'overall' | 'platform'>('overall');
  const [reachViewMode, setReachViewMode] = useState<'overall' | 'platform'>('overall');
  const [followersViewMode, setFollowersViewMode] = useState<'overall' | 'platform'>('overall');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'youtube', 'tiktok', 'twitter']);
  const [dateRange, setDateRange] = useState('90d');
  const [sortBy, setSortBy] = useState('engagement');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [demographicsExpanded, setDemographicsExpanded] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('2 minutes ago');

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const handleRefresh = () => {
    setLastUpdated('Just now');
    // Simulate data refresh
  };

  const platformIcons = {
    'Instagram': Instagram,
    'YouTube': Youtube,
    'TikTok': Music,
    'Twitter': Twitter
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Impressions"
          value="2.4M"
          change={18.2}
          icon={<Eye className="h-4 w-4" />}
          description="Last 30 days"
          sparklineData={[180, 190, 185, 200, 210, 205, 220]}
          status="good"
        />
        <MetricsCard
          title="Engagement Rate"
          value="8.4%"
          change={-2.1}
          icon={<Heart className="h-4 w-4" />}
          description="Avg across platforms"
          sparklineData={[8.5, 8.2, 8.8, 8.1, 8.4, 8.0, 8.4]}
          status="warning"
        />
        <MetricsCard
          title="Click-through Rate"
          value="3.2%"
          change={5.8}
          icon={<MousePointer className="h-4 w-4" />}
          description="From social posts"
          sparklineData={[2.8, 3.0, 2.9, 3.1, 3.3, 3.2, 3.4]}
          status="good"
        />
        <MetricsCard
          title="Conversion Rate"
          value="1.8%"
          change={12.5}
          icon={<Target className="h-4 w-4" />}
          description="Social to website"
          sparklineData={[1.4, 1.6, 1.5, 1.7, 1.9, 1.8, 2.0]}
          status="good"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Engagement Over Time</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-3 w-3" />
                +246.8%
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartControls
              viewMode={engagementViewMode}
              onViewModeChange={setEngagementViewMode}
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={(platform) => {
                setSelectedPlatforms(prev => 
                  prev.includes(platform) 
                    ? prev.filter(p => p !== platform)
                    : [...prev, platform]
                );
              }}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              showPlatformToggles={engagementViewMode === 'platform'}
            />
            
            <div className="mt-4">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `Date: ${value}`}
                          formatter={(value, name) => [value.toLocaleString(), name]}
                        />
                      }
                    />
                    {engagementViewMode === 'overall' ? (
                      <Area 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#22c55e" 
                        fill="#22c55e"
                        fillOpacity={0.3}
                      />
                    ) : (
                      <>
                        {selectedPlatforms.includes('instagram') && (
                          <Area type="monotone" dataKey="instagram_engagement" stroke="#E4405F" fill="#E4405F" fillOpacity={0.1} />
                        )}
                        {selectedPlatforms.includes('youtube') && (
                          <Area type="monotone" dataKey="youtube_engagement" stroke="#FF0000" fill="#FF0000" fillOpacity={0.1} />
                        )}
                        {selectedPlatforms.includes('tiktok') && (
                          <Area type="monotone" dataKey="tiktok_engagement" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                        )}
                        {selectedPlatforms.includes('twitter') && (
                          <Area type="monotone" dataKey="twitter_engagement" stroke="#1DA1F2" fill="#1DA1F2" fillOpacity={0.1} />
                        )}
                      </>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Reach Analysis Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Reach Analysis</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="h-3 w-3" />
                +133
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartControls
              viewMode={reachViewMode}
              onViewModeChange={setReachViewMode}
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={(platform) => {
                setSelectedPlatforms(prev => 
                  prev.includes(platform) 
                    ? prev.filter(p => p !== platform)
                    : [...prev, platform]
                );
              }}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              showPlatformToggles={reachViewMode === 'platform'}
            />
            
            <div className="mt-4">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `Date: ${value}`}
                          formatter={(value, name) => [value.toLocaleString(), name]}
                        />
                      }
                    />
                    {reachViewMode === 'overall' ? (
                      <Line 
                        type="monotone" 
                        dataKey="reach" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    ) : (
                      <>
                        {selectedPlatforms.includes('instagram') && (
                          <Line type="monotone" dataKey="instagram_reach" stroke="#E4405F" strokeWidth={2} dot={{ r: 3 }} />
                        )}
                        {selectedPlatforms.includes('youtube') && (
                          <Line type="monotone" dataKey="youtube_reach" stroke="#FF0000" strokeWidth={2} dot={{ r: 3 }} />
                        )}
                        {selectedPlatforms.includes('tiktok') && (
                          <Line type="monotone" dataKey="tiktok_reach" stroke="#000000" strokeWidth={2} dot={{ r: 3 }} />
                        )}
                        {selectedPlatforms.includes('twitter') && (
                          <Line type="monotone" dataKey="twitter_reach" stroke="#1DA1F2" strokeWidth={2} dot={{ r: 3 }} />
                        )}
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Follower Growth Trends Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Follower Growth Trends</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-3 w-3" />
              +84.4%
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartControls
            viewMode={followersViewMode}
            onViewModeChange={setFollowersViewMode}
            selectedPlatforms={selectedPlatforms}
            onPlatformToggle={(platform) => {
              setSelectedPlatforms(prev => 
                prev.includes(platform) 
                  ? prev.filter(p => p !== platform)
                  : [...prev, platform]
              );
            }}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            showPlatformToggles={followersViewMode === 'platform'}
          />
          
            <div className="mt-4">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `Date: ${value}`}
                          formatter={(value, name) => [value.toLocaleString(), name]}
                        />
                      }
                    />
                    {/* Target line */}
                    <Line 
                      type="monotone" 
                      dataKey={() => 75000} 
                      stroke="#888" 
                      strokeDasharray="5 5" 
                      dot={false}
                      strokeWidth={1}
                    />
                    {followersViewMode === 'overall' ? (
                      <Area 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="#22c55e" 
                        fill="#22c55e"
                        fillOpacity={0.3}
                      />
                    ) : (
                      <>
                        {selectedPlatforms.includes('instagram') && (
                          <Area type="monotone" dataKey="instagram_followers" stroke="#E4405F" fill="#E4405F" fillOpacity={0.1} />
                        )}
                        {selectedPlatforms.includes('youtube') && (
                          <Area type="monotone" dataKey="youtube_followers" stroke="#FF0000" fill="#FF0000" fillOpacity={0.1} />
                        )}
                        {selectedPlatforms.includes('tiktok') && (
                          <Area type="monotone" dataKey="tiktok_followers" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                        )}
                        {selectedPlatforms.includes('twitter') && (
                          <Area type="monotone" dataKey="twitter_followers" stroke="#1DA1F2" fill="#1DA1F2" fillOpacity={0.1} />
                        )}
                      </>
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
        </CardContent>
      </Card>

      {/* Platform Performance Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformMetrics.map((platform) => {
              const IconComponent = platformIcons[platform.platform as keyof typeof platformIcons];
              return (
                <Card key={platform.platform} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${platform.color}20` }}
                        >
                          <IconComponent 
                            className="h-5 w-5" 
                            style={{ color: platform.color }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{platform.platform}</div>
                          <div className="text-sm text-muted-foreground">
                            {platform.followers.toLocaleString()} followers
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Engagement Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{platform.engagement}%</span>
                          <Badge 
                            variant="secondary"
                            className={`text-xs ${platform.change > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                          >
                            {platform.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {platform.change > 0 ? "+" : ""}{platform.change}%
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Reach</span>
                        <span className="font-medium">{(platform.reach / 1000).toFixed(0)}K</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Posts</span>
                        <span className="font-medium">{platform.posts}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="detailed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="detailed">Detailed Breakdown</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Top Content</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          <TabsTrigger value="video">Video Analytics</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Detailed Analytics Breakdown Table */}
        <TabsContent value="detailed">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Detailed Analytics Breakdown</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Table
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('metric')} className="hover:bg-transparent">
                          Metric
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                      <th className="text-left p-3">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('instagram')} className="hover:bg-transparent">
                          Instagram
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                      <th className="text-left p-3">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('youtube')} className="hover:bg-transparent">
                          YouTube
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                      <th className="text-left p-3">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('tiktok')} className="hover:bg-transparent">
                          TikTok
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                      <th className="text-left p-3">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('twitter')} className="hover:bg-transparent">
                          Twitter
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                      <th className="text-left p-3">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('total')} className="hover:bg-transparent">
                          Total
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="p-3 font-medium">Impressions</td>
                      <td className="p-3">892K</td>
                      <td className="p-3">567K</td>
                      <td className="p-3">1.2M</td>
                      <td className="p-3">234K</td>
                      <td className="p-3 font-semibold">2.9M</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="p-3 font-medium">Engagement</td>
                      <td className="p-3">75K</td>
                      <td className="p-3">68K</td>
                      <td className="p-3">189K</td>
                      <td className="p-3">14K</td>
                      <td className="p-3 font-semibold">346K</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="p-3 font-medium">Clicks</td>
                      <td className="p-3">28K</td>
                      <td className="p-3">45K</td>
                      <td className="p-3">38K</td>
                      <td className="p-3">7K</td>
                      <td className="p-3 font-semibold">118K</td>
                    </tr>
                    <tr className="hover:bg-muted/50 cursor-pointer">
                      <td className="p-3 font-medium">Conversions</td>
                      <td className="p-3">504</td>
                      <td className="p-3">810</td>
                      <td className="p-3">684</td>
                      <td className="p-3">126</td>
                      <td className="p-3 font-semibold">2,124</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Demographics */}
        <TabsContent value="audience">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={audienceDemographics.ageGroups} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="range" type="category" />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => [`${value}%`, 'Percentage']}
                          />
                        }
                      />
                      <Bar dataKey="percentage" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceDemographics.topLocations.map((location, index) => (
                    <div key={location.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{location.country}</div>
                          <div className="text-sm text-muted-foreground">{location.count.toLocaleString()} followers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{location.percentage}%</div>
                        <Progress value={location.percentage} className="w-16 h-2 mt-1" />
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
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={audienceDemographics.gender}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      label={({type, percentage}) => `${type}: ${percentage}%`}
                    >
                      {audienceDemographics.gender.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Peak Activity Times */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Activity Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={audienceDemographics.activeHours}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => [`${value}%`, 'Activity']}
                          />
                        }
                      />
                      <Area 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="#16a34a" 
                        fill="#16a34a"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Top Performing Content */}
        <TabsContent value="content">
          <div className="space-y-6">
            {/* Content Type Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Content Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contentTypePerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="avgEngagement" fill="#22c55e" name="Avg Engagement Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Performing Content Grid */}
            <div className="grid grid-cols-1 gap-6">
              {topPerformingContent.map((content) => (
                <Card key={content.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold mb-1">{content.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{content.platform}</Badge>
                              <Badge variant="outline">{content.type}</Badge>
                              <span>{content.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                              <Eye className="h-3 w-3" />
                              Views
                            </div>
                            <div className="font-semibold">{(content.views / 1000).toFixed(0)}K</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                              <Heart className="h-3 w-3" />
                              Likes
                            </div>
                            <div className="font-semibold">{(content.likes / 1000).toFixed(1)}K</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                              <MessageCircle className="h-3 w-3" />
                              Comments
                            </div>
                            <div className="font-semibold">{content.comments.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                              <Share2 className="h-3 w-3" />
                              Shares
                            </div>
                            <div className="font-semibold">{content.shares.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                              <TrendingUp className="h-3 w-3" />
                              Eng. Rate
                            </div>
                            <div className="font-semibold">{content.engagementRate}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Hashtag Performance */}
        <TabsContent value="hashtags">
          <Card>
            <CardHeader>
              <CardTitle>Hashtag Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Hashtag</th>
                      <th className="text-left p-3">Times Used</th>
                      <th className="text-left p-3">Total Reach</th>
                      <th className="text-left p-3">Total Engagement</th>
                      <th className="text-left p-3">Engagement Rate</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hashtagPerformance.map((hashtag, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{hashtag.hashtag}</span>
                          </div>
                        </td>
                        <td className="p-3">{hashtag.timesUsed}</td>
                        <td className="p-3">{(hashtag.totalReach / 1000).toFixed(0)}K</td>
                        <td className="p-3">{(hashtag.totalEngagement / 1000).toFixed(0)}K</td>
                        <td className="p-3">
                          <Badge variant="outline">{hashtag.engagementRate}%</Badge>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Analytics */}
        <TabsContent value="video">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Avg Watch Time</span>
                  </div>
                  <div className="text-2xl font-bold">{videoAnalytics.averageWatchTime}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                  </div>
                  <div className="text-2xl font-bold">{videoAnalytics.completionRate}%</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Views</span>
                  </div>
                  <div className="text-2xl font-bold">{(videoAnalytics.totalVideoViews / 1000000).toFixed(1)}M</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Avg Duration</span>
                  </div>
                  <div className="text-2xl font-bold">{Math.floor(videoAnalytics.averageViewDuration / 60)}:{(videoAnalytics.averageViewDuration % 60).toString().padStart(2, '0')}</div>
                </CardContent>
              </Card>
            </div>

            {/* Video Retention Curve */}
            <Card>
              <CardHeader>
                <CardTitle>Video Retention Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={videoAnalytics.retention}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="second" label={{ value: 'Seconds', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: '% Retention', angle: -90, position: 'insideLeft' }} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => [`${value}%`, 'Retention']}
                          />
                        }
                      />
                      <Area 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="#15803d" 
                        fill="#15803d"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Sources */}
        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      label={({source, percentage}) => `${source}: ${percentage}%`}
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div>
                          <div className="font-medium">{source.source}</div>
                          <div className="text-sm text-muted-foreground">
                            {(source.impressions / 1000).toFixed(0)}K impressions
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{source.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-900">TikTok engagement increased 45% this week</div>
                        <div className="text-sm text-green-700">Your video content is performing exceptionally well</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-900">Best posting time: 7-9 PM on weekdays</div>
                        <div className="text-sm text-blue-700">65% higher engagement during these hours</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="flex items-start gap-3">
                      <Play className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-purple-900">Video content gets 3x more engagement</div>
                        <div className="text-sm text-purple-700">Consider increasing video production</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-orange-900">Hashtag #sustainable drove 12% of reach</div>
                        <div className="text-sm text-orange-700">Use more sustainability-focused hashtags</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goal Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Goal Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Monthly Followers Goal</span>
                      <span className="text-sm text-muted-foreground">73% complete</span>
                    </div>
                    <Progress value={73} className="h-3" />
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>144.9K / 200K</span>
                      <Badge variant="outline">On Track</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Engagement Rate Goal</span>
                      <span className="text-sm text-muted-foreground">84% complete</span>
                    </div>
                    <Progress value={84} className="h-3" />
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>8.4% / 10%</span>
                      <Badge variant="outline">On Track</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Video Watch Time Goal</span>
                      <span className="text-sm text-muted-foreground">51% complete</span>
                    </div>
                    <Progress value={51} className="h-3" />
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>2:34 / 5:00</span>
                      <Badge variant="destructive">At Risk</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}