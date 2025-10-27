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
          {/* Overall Button */}
          <button
            onClick={() => onViewModeChange("overall")}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground cursor-pointer"
          >
            {viewMode === "overall" ? (
              <svg
                className="h-5 w-5 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            <span
              className={
                viewMode === "overall"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              Overall
            </span>
          </button>

          {/* By Platform Button */}
          <button
            onClick={() => onViewModeChange("platform")}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground cursor-pointer"
          >
            {viewMode === "platform" ? (
              <svg
                className="h-5 w-5 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
            <span
              className={
                viewMode === "platform"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              By Platform
            </span>
          </button>
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
