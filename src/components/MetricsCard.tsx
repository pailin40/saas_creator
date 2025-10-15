// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Progress } from "./ui/progress";
// import { TrendingUp, TrendingDown, Target } from "lucide-react";

// interface MetricsCardProps {
//   title: string;
//   value: string | number;
//   change?: number;
//   icon?: React.ReactNode;
//   target?: number;
//   status?: "good" | "warning" | "critical";
// }

// export function MetricsCard({
//   title,
//   value,
//   change,
//   icon,
//   target,
//   status = "good",
// }: MetricsCardProps) {
//   const isPositive = change && change > 0;
//   const isNegative = change && change < 0;

//   // Create sparkline SVG
//   const createSparkline = (data: number[]) => {
//     if (data.length < 2) return null;

//     const width = 60;
//     const height = 20;
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
//           stroke={isPositive ? "#10b981" : isNegative ? "#ef4444" : "#6b7280"}
//           strokeWidth="1.5"
//           points={points}
//         />
//       </svg>
//     );
//   };

//   const getStatusColor = () => {
//     switch (status) {
//       case "good":
//         return "text-green-600 bg-green-50";
//       case "warning":
//         return "text-yellow-600 bg-yellow-50";
//       case "critical":
//         return "text-red-600 bg-red-50";
//       default:
//         return "text-green-600 bg-green-50";
//     }
//   };

//   const currentValue =
//     typeof value === "string"
//       ? parseFloat(value.replace(/[^0-9.]/g, ""))
//       : value;
//   const targetProgress = target
//     ? Math.min((currentValue / target) * 100, 100)
//     : undefined;

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <div className="flex items-center gap-2">
//           <div className="p-2">{icon}</div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">
//           {typeof value === "number" ? value.toLocaleString() : value}
//         </div>

//         {target && (
//           <div className="mt-2 space-y-1">
//             <div className="flex items-center justify-between text-xs text-muted-foreground">
//               <span>Progress to target</span>
//               <span className="flex items-center gap-1">
//                 <Target className="h-3 w-3" />
//                 {target.toLocaleString()}
//               </span>
//             </div>
//             <Progress value={targetProgress} className="h-2" />
//           </div>
//         )}

//         {change !== undefined && (
//           <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
//             {isPositive && <TrendingUp className="h-3 w-3 text-green-500" />}
//             {isNegative && <TrendingDown className="h-3 w-3 text-red-500" />}
//             <Badge
//               variant="secondary"
//               className={`text-xs ${getStatusColor()}`}
//             >
//               {change > 0 ? "+" : ""}
//               {change}%
//             </Badge>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  target?: number;
  status?: "good" | "warning" | "critical";
}

export function MetricsCard({
  title,
  value,
  change,
  icon,
  target,
  status = "good",
}: MetricsCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "critical":
        return "text-red-600 bg-red-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  const currentValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.]/g, ""))
      : value;
  const targetProgress = target
    ? Math.min((currentValue / target) * 100, 100)
    : undefined;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Main metric and change indicator - side by side */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>

          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
              <Badge
                variant="secondary"
                className={`text-xs ${getStatusColor()}`}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </Badge>
            </div>
          )}
        </div>

        {/* Progress bar section */}
        {target && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress to target</span>
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {target.toLocaleString()}
              </span>
            </div>
            <Progress value={targetProgress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
