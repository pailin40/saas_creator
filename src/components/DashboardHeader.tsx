import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Calendar } from './ui/calendar';
import { 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Moon, 
  Sun, 
  Search, 
  Download, 
  CalendarIcon,
  HelpCircle,
  Filter
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

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
  onPlatformFilter
}: DashboardHeaderProps = {}) {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

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
    const data = 'Date,Platform,Followers,Engagement,Reach\n2024-01-01,Instagram,125000,15.2%,250000\n';
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-semibold">Social Media Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track your content performance across all platforms
            </p>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content, metrics..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Platform Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Platforms
                {selectedPlatforms.length > 0 && selectedPlatforms[0] !== 'all' && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedPlatforms.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedPlatforms(['all']);
                  onPlatformFilter?.(['all']);
                }}
              >
                All Platforms
              </DropdownMenuItem>
              {platforms.map(platform => (
                <DropdownMenuItem 
                  key={platform}
                  onClick={() => {
                    const newSelection = selectedPlatforms.includes(platform)
                      ? selectedPlatforms.filter(p => p !== platform)
                      : [...selectedPlatforms.filter(p => p !== 'all'), platform];
                    setSelectedPlatforms(newSelection);
                    onPlatformFilter?.(newSelection);
                  }}
                >
                  {platform}
                  {selectedPlatforms.includes(platform) && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Time Range Selector */}
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Date Range */}
          {timeRange === 'custom' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                    ) : (
                      format(dateRange.from, 'MMM dd, yyyy')
                    )
                  ) : (
                    'Pick dates'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}

          {/* Export Button */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          {/* Help Button */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Profile" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Sarah Chen</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    sarah@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}