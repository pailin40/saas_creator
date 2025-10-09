import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { 
  allContent,
  contentPerformanceSummary,
  contentTypeDistribution,
  quickFilters,
  contentComments,
  contentAnalytics
} from '../../data/mockData';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Clock,
  Upload,
  Grid3X3,
  List,
  CheckSquare,
  ExternalLink,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Star,
  Instagram,
  Youtube,
  Music,
  Twitter,
  Image as ImageIcon,
  Video,
  FileText,
  Zap,
  Play
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const platformIcons = {
  'Instagram': Instagram,
  'YouTube': Youtube,
  'TikTok': Music,
  'Twitter': Twitter
};

const platformColors = {
  'Instagram': '#E4405F',
  'YouTube': '#FF0000',
  'TikTok': '#000000',
  'Twitter': '#1DA1F2'
};

const contentTypeIcons = {
  'Post': ImageIcon,
  'Video': Video,
  'Story': Clock,
  'Reel': Play,
  'Thread': FileText,
  'Carousel': Grid3X3
};

export function ContentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedContentType, setSelectedContentType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedContentItem, setSelectedContentItem] = useState<any>(null);

  // Filter content based on search and filters
  const filteredContent = allContent.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const matchesType = selectedContentType === 'all' || item.type === selectedContentType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesCampaign = selectedCampaign === 'all' || item.campaign === selectedCampaign;

    return matchesSearch && matchesPlatform && matchesType && matchesStatus && matchesCampaign;
  });

  // Sort content
  const sortedContent = [...filteredContent].sort((a, b) => {
    let aValue = a[sortBy as keyof typeof a];
    let bValue = b[sortBy as keyof typeof b];
    
    if (sortBy === 'engagement') {
      aValue = a.engagement.engagementRate;
      bValue = b.engagement.engagementRate;
    }
    
    if (sortBy === 'publishedAt' || sortBy === 'scheduledFor') {
      aValue = new Date(aValue || 0).getTime();
      bValue = new Date(bValue || 0).getTime();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleContentSelect = (contentId: string) => {
    setSelectedContent(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContent.length === sortedContent.length) {
      setSelectedContent([]);
    } else {
      setSelectedContent(sortedContent.map(item => item.id));
    }
  };

  const openDetailModal = (content: any) => {
    setSelectedContentItem(content);
    setDetailModalOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'scheduled': return 'secondary';
      case 'draft': return 'outline';
      case 'failed': return 'destructive';
      case 'expired': return 'outline';
      default: return 'outline';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const ContentCard = ({ content }: { content: any }) => {
    const PlatformIcon = platformIcons[content.platform as keyof typeof platformIcons];
    const ContentTypeIcon = contentTypeIcons[content.type as keyof typeof contentTypeIcons];
    
    return (
      <Card className="group hover:shadow-md transition-all duration-200 relative overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={selectedContent.includes(content.id)}
            onCheckedChange={() => handleContentSelect(content.id)}
            className="bg-white/80 border-white/80"
          />
        </div>
        
        <div className="relative">
          <img 
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => openDetailModal(content)}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <div 
              className="p-1.5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${platformColors[content.platform as keyof typeof platformColors]}20` }}
            >
              <PlatformIcon 
                className="h-3 w-3" 
                style={{ color: platformColors[content.platform as keyof typeof platformColors] }}
              />
            </div>
            <Badge variant="outline" className="bg-white/80">
              <ContentTypeIcon className="h-3 w-3 mr-1" />
              {content.type}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold line-clamp-2 cursor-pointer" onClick={() => openDetailModal(content)}>
              {content.title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => openDetailModal(content)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  Reschedule
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {content.caption}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>
              {content.status === 'published' 
                ? new Date(content.publishedAt).toLocaleDateString()
                : content.status === 'scheduled'
                  ? `Scheduled for ${new Date(content.scheduledFor).toLocaleDateString()}`
                  : 'Draft'
              }
            </span>
            <Badge variant={getStatusBadgeVariant(content.status)}>
              {content.status}
            </Badge>
          </div>
          
          {content.status === 'published' && (
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Eye className="h-3 w-3" />
                </div>
                <div className="font-medium">{formatNumber(content.engagement.views)}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Heart className="h-3 w-3" />
                </div>
                <div className="font-medium">{formatNumber(content.engagement.likes)}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <MessageCircle className="h-3 w-3" />
                </div>
                <div className="font-medium">{formatNumber(content.engagement.comments)}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                </div>
                <div className="font-medium">{content.engagement.engagementRate}%</div>
              </div>
            </div>
          )}
          
          {content.campaign && (
            <div className="mt-3 pt-3 border-t">
              <Badge variant="outline" className="text-xs">
                {content.campaign}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const ContentListItem = ({ content }: { content: any }) => {
    const PlatformIcon = platformIcons[content.platform as keyof typeof platformIcons];
    const ContentTypeIcon = contentTypeIcons[content.type as keyof typeof contentTypeIcons];
    
    return (
      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
        <Checkbox
          checked={selectedContent.includes(content.id)}
          onCheckedChange={() => handleContentSelect(content.id)}
        />
        
        <img 
          src={content.thumbnail}
          alt={content.title}
          className="w-16 h-12 object-cover rounded cursor-pointer"
          onClick={() => openDetailModal(content)}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate cursor-pointer" onClick={() => openDetailModal(content)}>
              {content.title}
            </h3>
            <div className="flex items-center gap-1">
              <PlatformIcon className="h-4 w-4" style={{ color: platformColors[content.platform as keyof typeof platformColors] }} />
              <Badge variant="outline" className="text-xs">
                <ContentTypeIcon className="h-3 w-3 mr-1" />
                {content.type}
              </Badge>
              <Badge variant={getStatusBadgeVariant(content.status)} className="text-xs">
                {content.status}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground truncate mb-2">
            {content.caption}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              {content.status === 'published' 
                ? new Date(content.publishedAt).toLocaleDateString()
                : content.status === 'scheduled'
                  ? `Scheduled: ${new Date(content.scheduledFor).toLocaleDateString()}`
                  : 'Draft'
              }
            </span>
            {content.status === 'published' && (
              <>
                <span>{formatNumber(content.engagement.views)} views</span>
                <span>{formatNumber(content.engagement.likes)} likes</span>
                <span>{content.engagement.engagementRate}% engagement</span>
              </>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => openDetailModal(content)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Clock className="h-4 w-4 mr-2" />
              Reschedule
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <div className="flex gap-6">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Enhanced Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Content Management</h1>
            <p className="text-muted-foreground">Manage and analyze your content across all platforms</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Performance Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, caption, hashtags, or campaign..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Platform Filter */}
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>

              {/* Content Type Filter */}
              <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Post">Posts</SelectItem>
                  <SelectItem value="Video">Videos</SelectItem>
                  <SelectItem value="Story">Stories</SelectItem>
                  <SelectItem value="Reel">Reels</SelectItem>
                  <SelectItem value="Thread">Threads</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt">Date Published</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="platform">Platform</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedContent.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedContent.length === sortedContent.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium">
                    {selectedContent.length} of {sortedContent.length} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Bulk Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {sortedContent.map((content) => (
              <ContentListItem key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
                <p className="text-muted-foreground">Calendar view will be implemented soon</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {sortedContent.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No content found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Content
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Content Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">{contentPerformanceSummary.totalPosts}</div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{contentPerformanceSummary.avgEngagementRate}%</div>
                <div className="text-sm text-muted-foreground">Avg Engagement</div>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Best Performing Type</span>
                <Badge variant="outline">{contentPerformanceSummary.bestPerformingType}</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-3">Optimal Posting Times</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(contentPerformanceSummary.optimalPostingTimes).map(([platform, time]) => (
                  <div key={platform} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{platform}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={contentTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="percentage"
                  label={({type, percentage}) => `${percentage}%`}
                >
                  {contentTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {contentTypeDistribution.map((item, index) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{item.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  className="w-full justify-between"
                  size="sm"
                >
                  <span>{filter.label}</span>
                  <Badge variant="secondary">{filter.count}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedContentItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedContentItem.title}
                  <Badge variant={getStatusBadgeVariant(selectedContentItem.status)}>
                    {selectedContentItem.status}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedContentItem.platform} • {selectedContentItem.type} • 
                  {selectedContentItem.status === 'published' 
                    ? ` Published ${new Date(selectedContentItem.publishedAt).toLocaleString()}`
                    : selectedContentItem.status === 'scheduled'
                      ? ` Scheduled for ${new Date(selectedContentItem.scheduledFor).toLocaleString()}`
                      : ' Draft'
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Full Preview */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Preview</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={selectedContentItem.thumbnail}
                        alt={selectedContentItem.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Caption</h4>
                    <ScrollArea className="h-32 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{selectedContentItem.caption}</p>
                    </ScrollArea>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedContentItem.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">#{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Analytics */}
                <div className="space-y-4">
                  {selectedContentItem.status === 'published' && (
                    <>
                      <div>
                        <h3 className="font-semibold mb-3">Performance Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <div className="text-2xl font-bold">{formatNumber(selectedContentItem.engagement.views)}</div>
                            <div className="text-sm text-muted-foreground">Views</div>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <div className="text-2xl font-bold">{formatNumber(selectedContentItem.engagement.likes)}</div>
                            <div className="text-sm text-muted-foreground">Likes</div>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <div className="text-2xl font-bold">{formatNumber(selectedContentItem.engagement.comments)}</div>
                            <div className="text-sm text-muted-foreground">Comments</div>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <div className="text-2xl font-bold">{selectedContentItem.engagement.engagementRate}%</div>
                            <div className="text-sm text-muted-foreground">Engagement Rate</div>
                          </div>
                        </div>
                      </div>

                      {contentAnalytics[selectedContentItem.id] && (
                        <div>
                          <h4 className="font-medium mb-3">Engagement Timeline</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={contentAnalytics[selectedContentItem.id].hourlyBreakdown}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="hour" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="engagement" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-3">Top Comments</h4>
                        <div className="space-y-3 max-h-40 overflow-y-auto">
                          {contentComments
                            .filter(comment => comment.contentId === selectedContentItem.id)
                            .map((comment) => (
                              <div key={comment.id} className="p-3 bg-muted rounded-lg">
                                <div className="flex items-start justify-between mb-1">
                                  <span className="font-medium text-sm">@{comment.author}</span>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Heart className="h-3 w-3" />
                                    {comment.likes}
                                  </div>
                                </div>
                                <p className="text-sm">{comment.text}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Panel */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Post
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Platform
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Boost Post
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}