// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Progress } from "./ui/progress";
// import { Badge } from "./ui/badge";
// import { Target, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

// interface MilestoneTrackerProps {
//   currentFollowers: number;
//   goalTarget: number;
//   daysRemaining: number;
//   projectedFollowers: number;
// }

// export function MilestoneTracker({
//   currentFollowers,
//   goalTarget,
//   daysRemaining,
//   projectedFollowers,
// }: MilestoneTrackerProps) {
//   const progressToGoal = (currentFollowers / goalTarget) * 100;
//   const isOnTrack = projectedFollowers >= goalTarget;

//   return (
//     <Card>
//       <CardHeader className="pb-4">
//         <CardTitle className="text-base flex items-center gap-2 font-semibold">
//           <Target className="h-5 w-5" />
//           Milestone Tracker
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Progress bar */}
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <span className="text-base text-muted-foreground">
//               Progress to 75K goal
//             </span>
//             <span className="font-semibold text-lg">
//               {Math.round(progressToGoal)}%
//             </span>
//           </div>
//           <Progress
//             value={progressToGoal}
//             className="h-3"
//             indicatorClassName={!isOnTrack ? "bg-yellow-500" : "bg-primary"}
//           />
//         </div>

//         {/* Days remaining and status */}
//         <div className="flex items-center justify-between pt-1">
//           <div className="flex items-center gap-2 text-base text-muted-foreground">
//             <Calendar className="h-4 w-4" />
//             <span>{daysRemaining} days remaining</span>
//           </div>
//           <Badge
//             variant="secondary"
//             className={`px-3 py-1 ${
//               !isOnTrack
//                 ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
//                 : "bg-green-50 text-green-700 hover:bg-green-50"
//             }`}
//           >
//             {!isOnTrack ? (
//               <>
//                 <AlertTriangle className="h-4 w-4 mr-1.5" />
//                 Behind
//               </>
//             ) : (
//               <>
//                 <CheckCircle className="h-4 w-4 mr-1.5" />
//                 On track
//               </>
//             )}
//           </Badge>
//         </div>

//         {/* Need more followers text */}
//         <div className="text-base text-muted-foreground">
//           Need {(goalTarget - currentFollowers).toLocaleString()} more followers
//           to reach goal
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Target, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

interface MilestoneTrackerProps {
  currentFollowers: number;
  goalTarget: number;
  daysRemaining: number;
  projectedFollowers: number;
}

export function MilestoneTracker({
  currentFollowers,
  goalTarget,
  daysRemaining,
  projectedFollowers,
}: MilestoneTrackerProps) {
  const progressToGoal = (currentFollowers / goalTarget) * 100;
  const isOnTrack = projectedFollowers >= goalTarget;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2 font-semibold">
          <Target className="h-5 w-5" />
          Milestone Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-base text-muted-foreground">
              Progress to 75K goal
            </span>
            <span className="font-semibold text-lg">
              {Math.round(progressToGoal)}%
            </span>
          </div>
          <Progress
            value={progressToGoal}
            className="h-3"
            indicatorColor={!isOnTrack ? "#eab308" : undefined}
            backgroundColor={!isOnTrack ? "#fef3c7" : undefined}
          />
        </div>

        {/* Days remaining and status */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{daysRemaining} days remaining</span>
          </div>
          <Badge
            variant="secondary"
            className={`px-3 py-1 ${
              !isOnTrack
                ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                : "bg-green-50 text-green-700 hover:bg-green-50"
            }`}
          >
            {!isOnTrack ? (
              <>
                <AlertTriangle className="h-4 w-4 mr-1.5" />
                Behind
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1.5" />
                On track
              </>
            )}
          </Badge>
        </div>

        {/* Need more followers text */}
        <div className="text-base text-muted-foreground">
          Need {(goalTarget - currentFollowers).toLocaleString()} more followers
          to reach goal
        </div>
      </CardContent>
    </Card>
  );
}
