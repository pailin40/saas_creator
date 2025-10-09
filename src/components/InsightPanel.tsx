import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Music
} from 'lucide-react';

interface InsightPanelProps {
  currentFollowers?: number;
  growthThisPeriod?: number;
  growthPercentage?: number;
  averageDailyGrowth?: number;
  projectedFollowers?: number;
  goalTarget?: number;
  daysRemaining?: number;
  topGrowingPlatform?: {
    name: string;
    growth: string;
    icon: React.ReactNode;
    sparklineData: number[];
  };
}

export function InsightPanel({
  currentFollowers = 60234,
  growthThisPeriod = 12450,
  growthPercentage = 20.6,
  averageDailyGrowth = 138,
  projectedFollowers = 64380,
  goalTarget = 75000,
  daysRemaining = 28,
  topGrowingPlatform = {
    name: 'TikTok',
    growth: '+45%',
    icon: <Music className="h-4 w-4" style={{ color: '#000000' }} />,
    sparklineData: [15, 18, 22, 28, 35, 45, 52]
  }
}: InsightPanelProps) {
  
  const progressToGoal = (currentFollowers / goalTarget) * 100;
  const isOnTrack = projectedFollowers >= goalTarget;
  
  // Create mini sparkline for top growing platform
  const createMiniSparkline = (data: number[]) => {
    const width = 40;
    const height = 16;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="inline-block">
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick Stats Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Current followers</div>
            <div className="text-2xl font-bold">{currentFollowers.toLocaleString()}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Growth this period</div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-green-600">
                +{growthThisPeriod.toLocaleString()}
              </span>
              <Badge variant="secondary" className="text-xs text-green-600 bg-green-50">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{growthPercentage}%
              </Badge>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Average daily growth</div>
            <div className="text-lg font-semibold">+{averageDailyGrowth}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Projected (next 30 days)</div>
            <div className="text-lg font-semibold text-blue-600">
              {projectedFollowers.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestone Tracker */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4" />
            Milestone Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress to 75K goal</span>
              <span className="font-medium">{Math.round(progressToGoal)}%</span>
            </div>
            <Progress value={progressToGoal} className="h-3" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{daysRemaining} days remaining</span>
            </div>
            <div className="flex items-center gap-1">
              {isOnTrack ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">On track</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600 font-medium">Behind</span>
                </>
              )}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Need {(goalTarget - currentFollowers).toLocaleString()} more followers to reach goal
          </div>
        </CardContent>
      </Card>

      {/* Top Growing Platform */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Donut Chart */}
            <div className="relative h-32 w-32 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Instagram - 28K followers (46.5%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#E4405F"
                  strokeWidth="12"
                  strokeDasharray="184.5 400"
                  strokeDashoffset="0"
                  className="opacity-90"
                />
                {/* TikTok - 17.8K followers (29.6%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#000000"
                  strokeWidth="12"
                  strokeDasharray="117.8 400"
                  strokeDashoffset="-184.5"
                  className="opacity-90"
                />
                {/* YouTube - 13.2K followers (21.9%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#FF0000"
                  strokeWidth="12"
                  strokeDasharray="87.2 400"
                  strokeDashoffset="-302.3"
                  className="opacity-90"
                />
                {/* Twitter - 1.2K followers (2%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#1DA1F2"
                  strokeWidth="12"
                  strokeDasharray="8 400"
                  strokeDashoffset="-389.5"
                  className="opacity-90"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold">60.2K</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#E4405F' }}></div>
                  <span>Instagram</span>
                </div>
                <span className="font-medium">28.0K (46.5%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#000000' }}></div>
                  <span>TikTok</span>
                </div>
                <span className="font-medium">17.8K (29.6%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#FF0000' }}></div>
                  <span>YouTube</span>
                </div>
                <span className="font-medium">13.2K (21.9%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1DA1F2' }}></div>
                  <span>Twitter</span>
                </div>
                <span className="font-medium">1.2K (2.0%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}