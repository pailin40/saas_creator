import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox"; // Add this import at the top
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Search,
  Download,
  CalendarIcon,
  HelpCircle,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface DashboardHeaderProps {
  onTimeRangeChange?: (range: string) => void;
  onSearchChange?: (query: string) => void;
  onExport?: () => void;
  onPlatformFilter?: (platforms: string[]) => void;
}

export function DashboardHeader({
  onTimeRangeChange,
  onSearchChange,
  onExport,
  onPlatformFilter,
}: DashboardHeaderProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("7d");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange?.(e.target.value);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleExport = () => {
    onExport?.();
    // Mock export functionality
    const data =
      "Date,Platform,Followers,Engagement,Reach\n2024-01-01,Instagram,125000,15.2%,250000\n";
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter"];

  return (
    <header className="border-b border-border bg-card shadow-md z-10">
      <div className="flex h-16 items-center px-6 gap-x-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1
            className="text-2xl text-primary"
            style={{ fontFamily: '"PT Sans", sans-serif' }}
          >
            SOMI
          </h1>
        </div>

        {/* Search bar - centered and expanded */}
        <div className="flex-1 flex justify-center">
          {/* <div className="relative w-96"> */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content, metrics..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Platform Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-[115px]">
                <Filter className="h-4 w-4 mr-2" />
                Platforms
                {selectedPlatforms.length > 0 &&
                  selectedPlatforms[0] !== "all" && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedPlatforms.length}
                    </Badge>
                  )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-none">
              <div className="px-2 py-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-platforms"
                    checked={selectedPlatforms.includes("all")}
                    onCheckedChange={() => {
                      setSelectedPlatforms(["all"]);
                      onPlatformFilter?.(["all"]);
                    }}
                  />
                  <label
                    htmlFor="all-platforms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    All Platforms
                  </label>
                </div>
                <DropdownMenuSeparator />
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.toLowerCase()}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const newSelection = [
                            ...selectedPlatforms.filter((p) => p !== "all"),
                            platform,
                          ];
                          setSelectedPlatforms(newSelection);
                          onPlatformFilter?.(newSelection);
                        } else {
                          const newSelection = selectedPlatforms.filter(
                            (p) => p !== platform
                          );
                          setSelectedPlatforms(
                            newSelection.length > 0 ? newSelection : ["all"]
                          );
                          onPlatformFilter?.(
                            newSelection.length > 0 ? newSelection : ["all"]
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={platform.toLowerCase()}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Time Range Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-[115px]">
                {timeRange === "7d"
                  ? "Last 7 days"
                  : timeRange === "30d"
                  ? "Last 30 days"
                  : timeRange === "1d"
                  ? "Today"
                  : timeRange === "365d"
                  ? "This year"
                  : "Custom range"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-none">
              {[
                { label: "Today", value: "1d" },
                { label: "Last 7 days", value: "7d" },
                { label: "Last 30 days", value: "30d" },
                { label: "This year", value: "365d" },
                { label: "Custom range", value: "custom" },
              ].map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleTimeRangeChange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Pick dates button - only show when custom range is selected */}
          {timeRange === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MMM dd")} - ${format(
                        dateRange.to,
                        "MMM dd"
                      )}`
                    : "Pick dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || {})}
                  />
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Export */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          {/* User Profile */}
          <Avatar>
            <AvatarImage src="/path/to/profile.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
