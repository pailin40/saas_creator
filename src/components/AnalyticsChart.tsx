import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { ChartControls } from './ChartControls';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  ReferenceLine,
  Legend
} from 'recharts';
import { ChartDataPoint } from '../types/dashboard';
import { PlatformChartDataPoint } from '../data/mockData';
import { TrendingUp, TrendingDown, Target, ZoomIn } from 'lucide-react';

interface AnalyticsChartProps {
  data: PlatformChartDataPoint[];
  title: string;
  dataKey: keyof ChartDataPoint;
  color?: string;
  type?: 'line' | 'area';
  target?: number;
  showLegend?: boolean;
  onDrillDown?: (dataKey: string) => void;
}

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-1))",
  },
  reach: {
    label: "Reach",
    color: "hsl(var(--chart-2))",
  },
  followers: {
    label: "Followers",
    color: "hsl(var(--chart-3))",
  },
}

const platformColors = {
  instagram: '#E4405F',
  youtube: '#FF0000',
  tiktok: '#000000',
  twitter: '#1DA1F2'
};

export function AnalyticsChart({ 
  data, 
  title, 
  dataKey, 
  color = "hsl(var(--chart-1))", 
  type = 'line',
  target,
  showLegend = true,
  onDrillDown
}: AnalyticsChartProps) {
  const [viewMode, setViewMode] = useState<'overall' | 'platform'>('overall');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'youtube', 'tiktok', 'twitter']);
  const [dateRange, setDateRange] = useState('90d');
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  // Calculate trend based on view mode
  const getDataForTrend = () => {
    if (viewMode === 'overall') {
      return {
        first: data[0]?.[dataKey] as number || 0,
        last: data[data.length - 1]?.[dataKey] as number || 0
      };
    } else {
      // For platform view, calculate combined trend from selected platforms
      const firstCombined = selectedPlatforms.reduce((sum, platform) => {
        const key = `${platform}_${dataKey}` as keyof PlatformChartDataPoint;
        return sum + (data[0]?.[key] as number || 0);
      }, 0);
      const lastCombined = selectedPlatforms.reduce((sum, platform) => {
        const key = `${platform}_${dataKey}` as keyof PlatformChartDataPoint;
        return sum + (data[data.length - 1]?.[key] as number || 0);
      }, 0);
      return { first: firstCombined, last: lastCombined };
    }
  };

  const trendData = getDataForTrend();
  const trend = trendData.first > 0 ? ((trendData.last - trendData.first) / trendData.first) * 100 : 0;
  const isPositiveTrend = trend > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {title}
            {target && (
              <Badge variant="outline" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Target: {formatValue(target)}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`text-xs ${isPositiveTrend ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}
            >
              {isPositiveTrend ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </Badge>
            {onDrillDown && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDrillDown(dataKey as string)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <ChartControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={handlePlatformToggle}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] min-h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={250} debounceMs={50}>
            {type === 'area' ? (
              <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tickFormatter={formatValue}
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  width={60}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                    formatter={(value: number, name: string) => [formatValue(value), name]}
                  />} 
                />
                {(showLegend && viewMode === 'platform') && <Legend />}
                {target && (
                  <ReferenceLine 
                    y={target} 
                    stroke="#ef4444" 
                    strokeDasharray="5 5" 
                    label={{ value: "Target", position: "topRight" }}
                  />
                )}
                {viewMode === 'overall' ? (
                  <Area
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.2}
                    strokeWidth={2}
                    name={chartConfig[dataKey as keyof typeof chartConfig]?.label || dataKey as string}
                  />
                ) : (
                  selectedPlatforms.map((platform) => (
                    <Area
                      key={platform}
                      type="monotone"
                      dataKey={`${platform}_${dataKey}`}
                      stroke={platformColors[platform as keyof typeof platformColors]}
                      fill={platformColors[platform as keyof typeof platformColors]}
                      fillOpacity={0.1}
                      strokeWidth={2}
                      name={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    />
                  ))
                )}
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tickFormatter={formatValue}
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  width={60}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                    formatter={(value: number, name: string) => [formatValue(value), name]}
                  />} 
                />
                {(showLegend && viewMode === 'platform') && <Legend />}
                {target && (
                  <ReferenceLine 
                    y={target} 
                    stroke="#ef4444" 
                    strokeDasharray="5 5" 
                    label={{ value: "Target", position: "topRight" }}
                  />
                )}
                {viewMode === 'overall' ? (
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ fill: color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name={chartConfig[dataKey as keyof typeof chartConfig]?.label || dataKey as string}
                  />
                ) : (
                  selectedPlatforms.map((platform) => (
                    <Line
                      key={platform}
                      type="monotone"
                      dataKey={`${platform}_${dataKey}`}
                      stroke={platformColors[platform as keyof typeof platformColors]}
                      strokeWidth={2}
                      dot={{ fill: platformColors[platform as keyof typeof platformColors], strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5 }}
                      name={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    />
                  ))
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}