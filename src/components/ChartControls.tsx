import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Circle,
  Instagram,
  Youtube,
  Music,
  Twitter,
  ChevronDown,
} from "lucide-react";

export interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface ChartControlsProps {
  viewMode: "overall" | "platform";
  onViewModeChange: (mode: "overall" | "platform") => void;
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
}

const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="h-4 w-4" />,
    color: "#E4405F",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="h-4 w-4" />,
    color: "#FF0000",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <Music className="h-4 w-4" />,
    color: "#000000",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <Twitter className="h-4 w-4" />,
    color: "#1DA1F2",
  },
];

export function ChartControls({
  viewMode,
  onViewModeChange,
  selectedPlatforms,
  onPlatformToggle,
}: ChartControlsProps) {
  return (
    <div className="space-y-3 mb-4 border-b border-border pb-4">
      {/* Row 1 - View Toggle */}
      <div className="flex items-center gap-4">
        <Label className="text-sm text-muted-foreground">View:</Label>
        <div className="flex gap-4">
          <Button
            variant={viewMode === "overall" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("overall")}
            className="flex items-center gap-2 h-8"
          >
            <Circle className="h-3 w-3" />
            Overall
          </Button>
          <Button
            variant={viewMode === "platform" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("platform")}
            className="flex items-center gap-2 h-8"
          >
            <Circle className="h-3 w-3" />
            By Platform
          </Button>
        </div>
      </div>

      {/* Row 2 - Platform Checkboxes (conditional) */}
      {viewMode === "platform" && (
        <div className="flex items-center gap-4 mt-3">
          <div className="flex gap-4">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex items-center gap-2">
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={() => onPlatformToggle(platform.id)}
                  className="h-4 w-4"
                />
                <div style={{ color: platform.color }}>{platform.icon}</div>
                <Label htmlFor={platform.id} className="text-sm cursor-pointer">
                  {platform.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
