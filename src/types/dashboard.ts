export interface PlatformMetrics {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  posts: number;
  icon: string;
  color: string;
  change: number;
}

export interface ContentItem {
  id: string;
  title: string;
  platform: string;
  type: 'post' | 'video' | 'story' | 'reel';
  publishedAt: string;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface ActivityItem {
  id: string;
  type: 'post' | 'follower' | 'engagement' | 'mention';
  message: string;
  platform: string;
  timestamp: string;
  icon: string;
}

export interface ChartDataPoint {
  date: string;
  engagement: number;
  reach: number;
  followers: number;
}