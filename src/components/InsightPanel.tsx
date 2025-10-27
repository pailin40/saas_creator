// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Progress } from "./ui/progress";
// import { Badge } from "./ui/badge";
// import {
//   Users,
//   TrendingUp,
//   Target,
//   Calendar,
//   CheckCircle,
//   AlertTriangle,
//   Music,
// } from "lucide-react";

// interface InsightPanelProps {
//   currentFollowers?: number;
//   growthThisPeriod?: number;
//   growthPercentage?: number;
//   averageDailyGrowth?: number;
//   projectedFollowers?: number;
//   goalTarget?: number;
//   daysRemaining?: number;
//   topGrowingPlatform?: {
//     name: string;
//     growth: string;
//     icon: React.ReactNode;
//     sparklineData: number[];
//   };
// }

// export function InsightPanel({
//   currentFollowers = 60234,
//   growthThisPeriod = 12450,
//   growthPercentage = 20.6,
//   averageDailyGrowth = 138,
//   projectedFollowers = 64380,
//   goalTarget = 75000,
//   daysRemaining = 28,
//   topGrowingPlatform = {
//     name: "TikTok",
//     growth: "+45%",
//     icon: <Music className="h-4 w-4" style={{ color: "#000000" }} />,
//     sparklineData: [15, 18, 22, 28, 35, 45, 52],
//   },
// }: InsightPanelProps) {
//   const progressToGoal = (currentFollowers / goalTarget) * 100;
//   const isOnTrack = projectedFollowers >= goalTarget;

//   // Create mini sparkline for top growing platform
//   const createMiniSparkline = (data: number[]) => {
//     const width = 40;
//     const height = 16;
//     const max = Math.max(...data);
//     const min = Math.min(...data);
//     const range = max - min;

//     const points = data
//       .map((point, index) => {
//         const x = (index / (data.length - 1)) * width;
//         const y = height - ((point - min) / range) * height;
//         return `${x},${y}`;
//       })
//       .join(" ");

//     return (
//       <svg width={width} height={height} className="inline-block">
//         <polyline
//           fill="none"
//           stroke="#10b981"
//           strokeWidth="1.5"
//           points={points}
//         />
//       </svg>
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {/* Quick Stats Card */}
//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle className="text-base flex items-center gap-2">
//             <Users className="h-4 w-4" />
//             Quick Stats
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <div className="text-sm text-muted-foreground">
//               Current followers
//             </div>
//             <div className="text-2xl font-bold">
//               {currentFollowers.toLocaleString()}
//             </div>
//           </div>

//           <div>
//             <div className="text-sm text-muted-foreground">
//               Growth this period
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-semibold text-green-600">
//                 +{growthThisPeriod.toLocaleString()}
//               </span>
//               <Badge
//                 variant="secondary"
//                 className="text-xs text-green-600 bg-green-50"
//               >
//                 <TrendingUp className="h-3 w-3 mr-1" />+{growthPercentage}%
//               </Badge>
//             </div>
//           </div>

//           <div>
//             <div className="text-sm text-muted-foreground">
//               Average daily growth
//             </div>
//             <div className="text-lg font-semibold">+{averageDailyGrowth}</div>
//           </div>

//           <div>
//             <div className="text-sm text-muted-foreground">
//               Projected (next 30 days)
//             </div>
//             <div className="text-lg font-semibold text-blue-600">
//               {projectedFollowers.toLocaleString()}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Top Growing Platform */}
//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle className="text-base">Platform Distribution</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {/* Donut Chart */}
//             <div className="relative h-32 w-32 mx-auto">
//               <svg
//                 viewBox="0 0 100 100"
//                 className="w-full h-full transform -rotate-90"
//               >
//                 {/* Instagram - 28K followers (46.5%) */}
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke="#E4405F"
//                   strokeWidth="12"
//                   strokeDasharray="184.5 400"
//                   strokeDashoffset="0"
//                   className="opacity-90"
//                 />
//                 {/* TikTok - 17.8K followers (29.6%) */}
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke="#000000"
//                   strokeWidth="12"
//                   strokeDasharray="117.8 400"
//                   strokeDashoffset="-184.5"
//                   className="opacity-90"
//                 />
//                 {/* YouTube - 13.2K followers (21.9%) */}
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke="#FF0000"
//                   strokeWidth="12"
//                   strokeDasharray="87.2 400"
//                   strokeDashoffset="-302.3"
//                   className="opacity-90"
//                 />
//                 {/* Twitter - 1.2K followers (2%) */}
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke="#1DA1F2"
//                   strokeWidth="12"
//                   strokeDasharray="8 400"
//                   strokeDashoffset="-389.5"
//                   className="opacity-90"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-lg font-bold">60.2K</div>
//                   <div className="text-xs text-muted-foreground">Total</div>
//                 </div>
//               </div>
//             </div>

//             {/* Legend */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-sm"
//                     style={{ backgroundColor: "#E4405F" }}
//                   ></div>
//                   <span>Instagram</span>
//                 </div>
//                 <span className="font-medium">28.0K (46.5%)</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-sm"
//                     style={{ backgroundColor: "#000000" }}
//                   ></div>
//                   <span>TikTok</span>
//                 </div>
//                 <span className="font-medium">17.8K (29.6%)</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-sm"
//                     style={{ backgroundColor: "#FF0000" }}
//                   ></div>
//                   <span>YouTube</span>
//                 </div>
//                 <span className="font-medium">13.2K (21.9%)</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-sm"
//                     style={{ backgroundColor: "#1DA1F2" }}
//                   ></div>
//                   <span>Twitter</span>
//                 </div>
//                 <span className="font-medium">1.2K (2.0%)</span>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, TrendingUp } from "lucide-react";

interface InsightPanelProps {
  growthThisPeriod?: number;
  growthPercentage?: number;
  averageDailyGrowth?: number;
  projectedFollowers?: number;
  bestPerformingPlatform?: {
    name: string;
    growth: number;
    growthPercentage: number;
  };
  growthRate?: number;
}

export function InsightPanel({
  growthThisPeriod = 12450,
  growthPercentage = 20.6,
  averageDailyGrowth = 138,
  bestPerformingPlatform = {
    name: "TikTok",
    growth: 8200,
    growthPercentage: 13.7,
  },
  growthRate = 9.5,
}: InsightPanelProps) {
  return (
    <div className="space-y-4">
      {/* Quick Stats Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2 font-semibold">
            <Users className="h-4 w-4" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Growth this period */}
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Growth this period
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                +{growthThisPeriod.toLocaleString()}
              </span>
              <span className="text-sm text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                <TrendingUp className="h-3 w-3" />+{growthPercentage}%
              </span>
            </div>
          </div>

          {/* Best performing platform */}
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Best performing platform
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">
                {bestPerformingPlatform.name}: +
                {bestPerformingPlatform.growth.toLocaleString()}
              </span>
              <span className="text-sm text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                <TrendingUp className="h-3 w-3" />+
                {bestPerformingPlatform.growthPercentage}%
              </span>
            </div>
          </div>

          {/* Average daily growth */}
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Average daily growth
            </div>
            <div className="text-xl font-bold text-green-600">
              +{averageDailyGrowth}
            </div>
          </div>

          {/* Growth rate */}
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Growth rate
            </div>
            <div className="text-xl font-bold text-blue-600">
              +{growthRate}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Distribution */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Platform Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Pie Chart - Clean with no labels */}
            <div className="relative h-48 w-48 mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* TikTok - 47.5% (Black) */}
                <path
                  d="M 100 100 L 100 10 A 90 90 0 0 1 184.8 71.5 Z"
                  fill="#000000"
                  stroke="white"
                  strokeWidth="3"
                />
                {/* Instagram - 31.6% (Pink) */}
                <path
                  d="M 100 100 L 184.8 71.5 A 90 90 0 0 1 156.5 172.5 Z"
                  fill="#E4405F"
                  stroke="white"
                  strokeWidth="3"
                />
                {/* YouTube - 13.9% (Red) */}
                <path
                  d="M 100 100 L 156.5 172.5 A 90 90 0 0 1 64.7 181.2 Z"
                  fill="#FF0000"
                  stroke="white"
                  strokeWidth="3"
                />
                {/* Twitter - 9.0% (Blue) */}
                <path
                  d="M 100 100 L 64.7 181.2 A 90 90 0 0 1 100 10 Z"
                  fill="#1DA1F2"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#000000" }}
                  />
                  <span className="text-foreground">TikTok</span>
                </div>
                <span className="font-semibold">67.8K (47.5%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#E4405F" }}
                  />
                  <span className="text-foreground">Instagram</span>
                </div>
                <span className="font-semibold">45.2K (31.6%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#FF0000" }}
                  />
                  <span className="text-foreground">YouTube</span>
                </div>
                <span className="font-semibold">18.5K (13.9%)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#1DA1F2" }}
                  />
                  <span className="text-foreground">Twitter</span>
                </div>
                <span className="font-semibold">12.4K (9.0%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
