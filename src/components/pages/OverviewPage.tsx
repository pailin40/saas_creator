import { MetricsCard } from '../MetricsCard';
import { PlatformCard } from '../PlatformCard';
import { AnalyticsChart } from '../AnalyticsChart';
import { ActivityFeed } from '../ActivityFeed';
import { ContentTable } from '../ContentTable';
import { InsightPanel } from '../InsightPanel';
import { 
  platformMetrics, 
  chartData, 
  recentContent, 
  recentActivity, 
  overallMetrics
} from '../../data/mockData';
import { 
  Users, 
  Heart, 
  Eye, 
  TrendingUp,
  Target
} from 'lucide-react';

export function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Followers"
          value={overallMetrics.totalFollowers}
          change={8.2}
          icon={<Users className="h-4 w-4" />}
          description="Across all platforms"
          sparklineData={[120, 125, 130, 128, 135, 140, 138]}
          target={150000}
          status="good"
        />
        <MetricsCard
          title="Total Engagement"
          value={overallMetrics.totalEngagement}
          change={15.1}
          icon={<Heart className="h-4 w-4" />}
          description="This month"
          sparklineData={[45, 52, 48, 55, 60, 58, 62]}
          target={75000}
          status="good"
        />
        <MetricsCard
          title="Total Reach"
          value={`${(overallMetrics.totalReach / 1000).toFixed(0)}K`}
          change={12.5}
          icon={<Eye className="h-4 w-4" />}
          description="People reached"
          sparklineData={[280, 290, 285, 300, 310, 305, 320]}
          target={400000}
          status="warning"
        />
        <MetricsCard
          title="Avg. Engagement Rate"
          value={`${overallMetrics.avgEngagementRate}%`}
          change={3.2}
          icon={<TrendingUp className="h-4 w-4" />}
          description="Across platforms"
          sparklineData={[4.5, 4.8, 4.6, 4.9, 5.1, 4.8, 5.2]}
          target={6}
          status="warning"
        />
      </div>

      {/* Platform Performance */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Platform Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformMetrics.map((platform) => (
            <PlatformCard 
              key={platform.platform} 
              platform={platform}
              onViewDetails={(platform) => console.log('View details for', platform)}
              onRefresh={(platform) => console.log('Refresh data for', platform)}
              onDisconnect={(platform) => console.log('Disconnect', platform)}
            />
          ))}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          data={chartData}
          title="Engagement Over Time"
          dataKey="engagement"
          color="hsl(var(--chart-1))"
          type="area"
        />
        <AnalyticsChart
          data={chartData}
          title="Reach Growth"
          dataKey="reach"
          color="hsl(var(--chart-2))"
          type="line"
        />
      </div>

      {/* Follower Growth Chart with Insights - 70/30 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7">
          <AnalyticsChart
            data={chartData}
            title="Follower Growth"
            dataKey="followers"
            color="hsl(var(--chart-3))"
            type="area"
            target={75000}
            showLegend={false}
          />
        </div>
        <div className="lg:col-span-3">
          <InsightPanel 
            currentFollowers={60234}
            growthThisPeriod={12450}
            growthPercentage={20.6}
            averageDailyGrowth={138}
            projectedFollowers={64380}
            goalTarget={75000}
            daysRemaining={28}
            topGrowingPlatform={{
              name: 'TikTok',
              growth: '+45%',
              icon: <Target className="h-4 w-4" style={{ color: '#000000' }} />,
              sparklineData: [15, 18, 22, 28, 35, 45, 52]
            }}
          />
        </div>
      </div>

      {/* Activity and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ActivityFeed activities={recentActivity} />
        </div>
        <div className="lg:col-span-2">
          <ContentTable content={recentContent} />
        </div>
      </div>
    </div>
  );
}