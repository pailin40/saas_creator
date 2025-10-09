import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Circle, 
  Instagram, 
  Youtube, 
  Music, 
  Twitter,
  ChevronDown
} from 'lucide-react';

export interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface ChartControlsProps {
  viewMode: 'overall' | 'platform';
  onViewModeChange: (mode: 'overall' | 'platform') => void;
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="h-4 w-4" />,
    color: '#E4405F'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <Youtube className="h-4 w-4" />,
    color: '#FF0000'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <Music className="h-4 w-4" />,
    color: '#000000'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <Twitter className="h-4 w-4" />,
    color: '#1DA1F2'
  }
];

const dateRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '180d', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' }
];

export function ChartControls({
  viewMode,
  onViewModeChange,
  selectedPlatforms,
  onPlatformToggle,
  dateRange,
  onDateRangeChange
}: ChartControlsProps) {
  return (
    <div className="space-y-3 mb-4 border-b border-border pb-4">
      {/* Row 1 - View Toggle and Date Range */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Label className="text-sm text-muted-foreground">View:</Label>
          <div className="flex gap-4">
            <Button
              variant={viewMode === 'overall' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('overall')}
              className="flex items-center gap-2 h-8"
            >
              <Circle className="h-3 w-3" />
              Overall
            </Button>
            <Button
              variant={viewMode === 'platform' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('platform')}
              className="flex items-center gap-2 h-8"
            >
              <Circle className="h-3 w-3" />
              By Platform
            </Button>
          </div>
        </div>
        
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Row 2 - Platform Checkboxes (conditional) */}
      {viewMode === 'platform' && (
        <div className="flex items-center gap-4 mt-3">
          <Label className="text-sm text-muted-foreground">Platforms:</Label>
          <div className="flex gap-4">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex items-center gap-2">
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={() => onPlatformToggle(platform.id)}
                  className="h-4 w-4"
                />
                <div style={{ color: platform.color }}>
                  {platform.icon}
                </div>
                <Label 
                  htmlFor={platform.id} 
                  className="text-sm cursor-pointer"
                >
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