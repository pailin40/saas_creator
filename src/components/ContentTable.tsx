import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ContentItem } from '../types/dashboard';
import { 
  Instagram, 
  Youtube, 
  Music, 
  Twitter, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Copy,
  Edit
} from 'lucide-react';
import { useState } from 'react';

interface ContentTableProps {
  content: ContentItem[];
  onLoadMore?: () => void;
  hasMoreContent?: boolean;
}

type SortField = 'title' | 'platform' | 'type' | 'publishedAt' | 'engagement' | 'reach';
type SortDirection = 'asc' | 'desc';

const platformIconMap = {
  Instagram,
  YouTube: Youtube,
  TikTok: Music,
  Twitter,
};

const platformColors = {
  Instagram: '#E4405F',
  YouTube: '#FF0000',
  TikTok: '#000000',
  Twitter: '#1DA1F2',
};

const typeColors = {
  post: 'bg-blue-50 text-blue-700',
  video: 'bg-purple-50 text-purple-700',
  story: 'bg-green-50 text-green-700',
  reel: 'bg-orange-50 text-orange-700',
};

export function ContentTable({ content, onLoadMore, hasMoreContent = false }: ContentTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('publishedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Filter and sort content
  const filteredContent = content
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter;
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      return matchesSearch && matchesPlatform && matchesType;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'publishedAt') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredContent.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on items:`, selectedItems);
    // Implement bulk actions here
    setSelectedItems([]);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
        )}
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Content Performance</CardTitle>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} selected
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('duplicate')}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('edit')}>
                    <Edit className="mr-2 h-4 w-4" />
                    Bulk Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-40">
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
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="post">Post</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="story">Story</SelectItem>
              <SelectItem value="reel">Reel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <SortableHeader field="title">Content</SortableHeader>
              <SortableHeader field="platform">Platform</SortableHeader>
              <SortableHeader field="type">Type</SortableHeader>
              <SortableHeader field="publishedAt">Published</SortableHeader>
              <SortableHeader field="engagement">
                <div className="text-right">Engagement</div>
              </SortableHeader>
              <SortableHeader field="reach">
                <div className="text-right">Reach</div>
              </SortableHeader>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.map((item) => {
              const PlatformIcon = platformIconMap[item.platform as keyof typeof platformIconMap];
              const platformColor = platformColors[item.platform as keyof typeof platformColors];
              const typeColorClass = typeColors[item.type as keyof typeof typeColors];

              return (
                <TableRow key={item.id} className={selectedItems.includes(item.id) ? 'bg-muted/50' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {formatNumber(item.likes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {formatNumber(item.comments)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="h-3 w-3" />
                          {formatNumber(item.shares)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {PlatformIcon && (
                        <PlatformIcon 
                          className="h-4 w-4" 
                          style={{ color: platformColor }} 
                        />
                      )}
                      <span className="text-sm">{item.platform}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs ${typeColorClass}`}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(item.publishedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Heart className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{formatNumber(item.engagement)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{formatNumber(item.reach)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* Load More Button */}
        {hasMoreContent && (
          <div className="flex justify-center pt-4 border-t">
            <Button variant="outline" onClick={onLoadMore}>
              Load More Content
            </Button>
          </div>
        )}
        
        {filteredContent.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No content found matching your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}