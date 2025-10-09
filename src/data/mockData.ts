import { PlatformMetrics, ContentItem, ActivityItem, ChartDataPoint } from '../types/dashboard';

export interface PlatformChartDataPoint extends ChartDataPoint {
  instagram_engagement?: number;
  instagram_reach?: number;
  instagram_followers?: number;
  youtube_engagement?: number;
  youtube_reach?: number;
  youtube_followers?: number;
  tiktok_engagement?: number;
  tiktok_reach?: number;
  tiktok_followers?: number;
  twitter_engagement?: number;
  twitter_reach?: number;
  twitter_followers?: number;
}

export const platformMetrics: PlatformMetrics[] = [
  {
    platform: 'Instagram',
    followers: 45200,
    engagement: 8.4,
    reach: 125000,
    posts: 28,
    icon: 'Instagram',
    color: '#E4405F',
    change: 12.5
  },
  {
    platform: 'YouTube',
    followers: 18500,
    engagement: 12.1,
    reach: 89000,
    posts: 8,
    icon: 'Youtube',
    color: '#FF0000',
    change: 8.2
  },
  {
    platform: 'TikTok',
    followers: 67800,
    engagement: 15.7,
    reach: 234000,
    posts: 42,
    icon: 'Music',
    color: '#000000',
    change: 24.3
  },
  {
    platform: 'Twitter',
    followers: 12400,
    engagement: 5.8,
    reach: 67000,
    posts: 89,
    icon: 'Twitter',
    color: '#1DA1F2',
    change: -2.1
  }
];

export const chartData: PlatformChartDataPoint[] = [
  { 
    date: '2024-01', 
    engagement: 6200, 
    reach: 45000, 
    followers: 32000,
    instagram_engagement: 2800, instagram_reach: 18000, instagram_followers: 14500,
    youtube_engagement: 1200, youtube_reach: 8500, youtube_followers: 6200,
    tiktok_engagement: 1800, tiktok_reach: 12000, tiktok_followers: 8100,
    twitter_engagement: 400, twitter_reach: 6500, twitter_followers: 3200
  },
  { 
    date: '2024-02', 
    engagement: 7800, 
    reach: 52000, 
    followers: 35000,
    instagram_engagement: 3200, instagram_reach: 20000, instagram_followers: 15800,
    youtube_engagement: 1500, youtube_reach: 9500, youtube_followers: 6800,
    tiktok_engagement: 2600, tiktok_reach: 15000, tiktok_followers: 9200,
    twitter_engagement: 500, twitter_reach: 7500, twitter_followers: 3200
  },
  { 
    date: '2024-03', 
    engagement: 9200, 
    reach: 58000, 
    followers: 38000,
    instagram_engagement: 3800, instagram_reach: 22000, instagram_followers: 17200,
    youtube_engagement: 1800, youtube_reach: 11000, youtube_followers: 7400,
    tiktok_engagement: 3000, tiktok_reach: 18000, tiktok_followers: 10500,
    twitter_engagement: 600, twitter_reach: 7000, twitter_followers: 2900
  },
  { 
    date: '2024-04', 
    engagement: 8900, 
    reach: 61000, 
    followers: 41000,
    instagram_engagement: 3600, instagram_reach: 24000, instagram_followers: 18500,
    youtube_engagement: 1700, youtube_reach: 12000, youtube_followers: 8000,
    tiktok_engagement: 3200, tiktok_reach: 20000, tiktok_followers: 12000,
    twitter_engagement: 400, twitter_reach: 5000, twitter_followers: 2500
  },
  { 
    date: '2024-05', 
    engagement: 11200, 
    reach: 68000, 
    followers: 44000,
    instagram_engagement: 4200, instagram_reach: 26000, instagram_followers: 19800,
    youtube_engagement: 2200, youtube_reach: 14000, youtube_followers: 8800,
    tiktok_engagement: 4200, tiktok_reach: 22000, tiktok_followers: 13500,
    twitter_engagement: 600, twitter_reach: 6000, twitter_followers: 1900
  },
  { 
    date: '2024-06', 
    engagement: 13500, 
    reach: 75000, 
    followers: 47000,
    instagram_engagement: 5000, instagram_reach: 28000, instagram_followers: 21200,
    youtube_engagement: 2800, youtube_reach: 16000, youtube_followers: 9600,
    tiktok_engagement: 5100, tiktok_reach: 25000, tiktok_followers: 15000,
    twitter_engagement: 600, twitter_reach: 6000, twitter_followers: 1200
  },
  { 
    date: '2024-07', 
    engagement: 15200, 
    reach: 82000, 
    followers: 50000,
    instagram_engagement: 5600, instagram_reach: 30000, instagram_followers: 22800,
    youtube_engagement: 3200, youtube_reach: 18000, youtube_followers: 10500,
    tiktok_engagement: 5800, tiktok_reach: 28000, tiktok_followers: 16200,
    twitter_engagement: 600, twitter_reach: 6000, twitter_followers: 500
  },
  { 
    date: '2024-08', 
    engagement: 17800, 
    reach: 89000, 
    followers: 53000,
    instagram_engagement: 6400, instagram_reach: 32000, instagram_followers: 24500,
    youtube_engagement: 3800, youtube_reach: 20000, youtube_followers: 11400,
    tiktok_engagement: 7000, tiktok_reach: 31000, tiktok_followers: 17100,
    twitter_engagement: 600, twitter_reach: 6000, twitter_followers: 0
  },
  { 
    date: '2024-09', 
    engagement: 19200, 
    reach: 95000, 
    followers: 56000,
    instagram_engagement: 7200, instagram_reach: 34000, instagram_followers: 26200,
    youtube_engagement: 4200, youtube_reach: 22000, youtube_followers: 12300,
    tiktok_engagement: 7200, tiktok_reach: 33000, tiktok_followers: 17500,
    twitter_engagement: 600, twitter_reach: 6000, twitter_followers: 0
  },
  { 
    date: '2024-10', 
    engagement: 21500, 
    reach: 105000, 
    followers: 59000,
    instagram_engagement: 8000, instagram_reach: 38000, instagram_followers: 28000,
    youtube_engagement: 4800, youtube_reach: 25000, youtube_followers: 13200,
    tiktok_engagement: 8100, tiktok_reach: 36000, tiktok_followers: 17800,
    twitter_engagement: 600, twitter_reach: 6000, twitter_followers: 0
  }
];

export const recentContent: ContentItem[] = [
  {
    id: '1',
    title: 'Summer Fashion Trends 2024',
    platform: 'Instagram',
    type: 'post',
    publishedAt: '2024-10-05',
    engagement: 4200,
    reach: 18500,
    likes: 3800,
    comments: 245,
    shares: 157
  },
  {
    id: '2',
    title: 'Day in My Life Vlog',
    platform: 'YouTube',
    type: 'video',
    publishedAt: '2024-10-04',
    engagement: 8900,
    reach: 45000,
    likes: 7200,
    comments: 892,
    shares: 445
  },
  {
    id: '3',
    title: 'Quick Makeup Tutorial',
    platform: 'TikTok',
    type: 'video',
    publishedAt: '2024-10-03',
    engagement: 12400,
    reach: 67000,
    likes: 11200,
    comments: 567,
    shares: 889
  },
  {
    id: '4',
    title: 'Thoughts on sustainability',
    platform: 'Twitter',
    type: 'post',
    publishedAt: '2024-10-02',
    engagement: 1200,
    reach: 8900,
    likes: 890,
    comments: 123,
    shares: 187
  },
  {
    id: '5',
    title: 'Behind the scenes',
    platform: 'Instagram',
    type: 'story',
    publishedAt: '2024-10-01',
    engagement: 2800,
    reach: 12000,
    likes: 2400,
    comments: 89,
    shares: 123
  }
];

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'engagement',
    message: 'Your Instagram post reached 18K people',
    platform: 'Instagram',
    timestamp: '2 hours ago',
    icon: 'TrendingUp'
  },
  {
    id: '2',
    type: 'follower',
    message: 'You gained 247 new YouTube subscribers',
    platform: 'YouTube',
    timestamp: '4 hours ago',
    icon: 'UserPlus'
  },
  {
    id: '3',
    type: 'post',
    message: 'New TikTok video published successfully',
    platform: 'TikTok',
    timestamp: '6 hours ago',
    icon: 'Upload'
  },
  {
    id: '4',
    type: 'mention',
    message: 'You were mentioned in 12 Twitter posts',
    platform: 'Twitter',
    timestamp: '8 hours ago',
    icon: 'AtSign'
  },
  {
    id: '5',
    type: 'engagement',
    message: 'Instagram engagement rate increased by 15%',
    platform: 'Instagram',
    timestamp: '1 day ago',
    icon: 'TrendingUp'
  }
];

export const overallMetrics = {
  totalFollowers: 144900,
  totalEngagement: 42800,
  totalReach: 515000,
  totalPosts: 167,
  avgEngagementRate: 10.5,
  topPlatform: 'TikTok'
};

// Additional Analytics Data
export const audienceDemographics = {
  ageGroups: [
    { range: '13-17', percentage: 8, count: 11592 },
    { range: '18-24', percentage: 28, count: 40572 },
    { range: '25-34', percentage: 35, count: 50715 },
    { range: '35-44', percentage: 18, count: 26082 },
    { range: '45-54', percentage: 7, count: 10143 },
    { range: '55-64', percentage: 3, count: 4347 },
    { range: '65+', percentage: 1, count: 1449 }
  ],
  gender: [
    { type: 'Female', percentage: 64, count: 92736 },
    { type: 'Male', percentage: 34, count: 49266 },
    { type: 'Non-binary', percentage: 1.5, count: 2174 },
    { type: 'Prefer not to say', percentage: 0.5, count: 724 }
  ],
  topLocations: [
    { country: 'United States', percentage: 42, count: 60858 },
    { country: 'United Kingdom', percentage: 18, count: 26082 },
    { country: 'Canada', percentage: 12, count: 17388 },
    { country: 'Australia', percentage: 8, count: 11592 },
    { country: 'Germany', percentage: 6, count: 8694 },
    { country: 'France', percentage: 5, count: 7245 },
    { country: 'Netherlands', percentage: 4, count: 5796 },
    { country: 'Other', percentage: 5, count: 7245 }
  ],
  activeHours: [
    { hour: '00:00', percentage: 2 }, { hour: '01:00', percentage: 1 },
    { hour: '02:00', percentage: 1 }, { hour: '03:00', percentage: 1 },
    { hour: '04:00', percentage: 1 }, { hour: '05:00', percentage: 2 },
    { hour: '06:00', percentage: 4 }, { hour: '07:00', percentage: 8 },
    { hour: '08:00', percentage: 12 }, { hour: '09:00', percentage: 15 },
    { hour: '10:00', percentage: 18 }, { hour: '11:00', percentage: 22 },
    { hour: '12:00', percentage: 28 }, { hour: '13:00', percentage: 32 },
    { hour: '14:00', percentage: 35 }, { hour: '15:00', percentage: 38 },
    { hour: '16:00', percentage: 42 }, { hour: '17:00', percentage: 45 },
    { hour: '18:00', percentage: 52 }, { hour: '19:00', percentage: 58 },
    { hour: '20:00', percentage: 65 }, { hour: '21:00', percentage: 48 },
    { hour: '22:00', percentage: 32 }, { hour: '23:00', percentage: 18 }
  ]
};

export const topPerformingContent = [
  {
    id: '1',
    title: 'Summer Fashion Haul + Try-On',
    platform: 'Instagram',
    type: 'Reel',
    date: '2024-10-05',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    views: 145200,
    likes: 12800,
    comments: 892,
    shares: 3240,
    engagementRate: 11.7
  },
  {
    id: '2',
    title: 'Day in My Life: Content Creator Edition',
    platform: 'YouTube',
    type: 'Video',
    date: '2024-10-04',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
    views: 89400,
    likes: 7200,
    comments: 445,
    shares: 1890,
    engagementRate: 10.8
  },
  {
    id: '3',
    title: '5-Minute Makeup Challenge',
    platform: 'TikTok',
    type: 'Video',
    date: '2024-10-03',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    views: 298000,
    likes: 28900,
    comments: 1240,
    shares: 8900,
    engagementRate: 13.2
  },
  {
    id: '4',
    title: 'Sustainable Fashion Tips Thread',
    platform: 'Twitter',
    type: 'Thread',
    date: '2024-10-02',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
    views: 45600,
    likes: 2890,
    comments: 445,
    shares: 1240,
    engagementRate: 10.1
  },
  {
    id: '5',
    title: 'Behind the Scenes: Photoshoot',
    platform: 'Instagram',
    type: 'Story',
    date: '2024-10-01',
    thumbnail: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=300&h=200&fit=crop',
    views: 67800,
    likes: 5240,
    comments: 234,
    shares: 890,
    engagementRate: 9.4
  }
];

export const contentTypePerformance = [
  { type: 'Video', avgEngagement: 12.4, avgReach: 85000, totalCount: 45 },
  { type: 'Reel', avgEngagement: 15.8, avgReach: 120000, totalCount: 28 },
  { type: 'Post', avgEngagement: 8.2, avgReach: 45000, totalCount: 67 },
  { type: 'Story', avgEngagement: 6.8, avgReach: 38000, totalCount: 89 },
  { type: 'Carousel', avgEngagement: 9.6, avgReach: 52000, totalCount: 23 }
];

export const sentimentData = {
  overall: { positive: 78, neutral: 18, negative: 4 },
  byPlatform: [
    { platform: 'Instagram', positive: 82, neutral: 15, negative: 3 },
    { platform: 'YouTube', positive: 85, neutral: 12, negative: 3 },
    { platform: 'TikTok', positive: 72, neutral: 23, negative: 5 },
    { platform: 'Twitter', positive: 65, neutral: 28, negative: 7 }
  ],
  trends: [
    { date: '2024-06', positive: 75, neutral: 20, negative: 5 },
    { date: '2024-07', positive: 78, neutral: 18, negative: 4 },
    { date: '2024-08', positive: 76, neutral: 19, negative: 5 },
    { date: '2024-09', positive: 80, neutral: 16, negative: 4 },
    { date: '2024-10', positive: 78, neutral: 18, negative: 4 }
  ],
  topKeywords: {
    positive: ['amazing', 'love', 'beautiful', 'inspiring', 'helpful'],
    negative: ['disappointing', 'boring', 'fake', 'overpriced', 'repetitive']
  }
};

export const hashtagPerformance = [
  { hashtag: '#fashion', timesUsed: 45, totalReach: 890000, totalEngagement: 78000, engagementRate: 8.8 },
  { hashtag: '#ootd', timesUsed: 32, totalReach: 650000, totalEngagement: 62000, engagementRate: 9.5 },
  { hashtag: '#lifestyle', timesUsed: 28, totalReach: 420000, totalEngagement: 45000, engagementRate: 10.7 },
  { hashtag: '#beauty', timesUsed: 24, totalReach: 380000, totalEngagement: 42000, engagementRate: 11.1 },
  { hashtag: '#sustainable', timesUsed: 18, totalReach: 290000, totalEngagement: 38000, engagementRate: 13.1 }
];

export const videoAnalytics = {
  averageWatchTime: '2:34',
  completionRate: 68,
  totalVideoViews: 2840000,
  averageViewDuration: 154,
  retention: [
    { second: 0, percentage: 100 },
    { second: 15, percentage: 85 },
    { second: 30, percentage: 72 },
    { second: 45, percentage: 65 },
    { second: 60, percentage: 58 },
    { second: 90, percentage: 45 },
    { second: 120, percentage: 38 },
    { second: 150, percentage: 32 },
    { second: 180, percentage: 25 }
  ]
};

export const trafficSources = [
  { source: 'Home Feed', percentage: 35, impressions: 1050000 },
  { source: 'Explore Page', percentage: 28, impressions: 840000 },
  { source: 'Hashtags', percentage: 15, impressions: 450000 },
  { source: 'Profile Visits', percentage: 12, impressions: 360000 },
  { source: 'Shares', percentage: 6, impressions: 180000 },
  { source: 'External Links', percentage: 4, impressions: 120000 }
];

export const peakActivityTimes = {
  heatmapData: [
    // Monday
    [2, 1, 1, 1, 2, 4, 8, 12, 15, 18, 22, 28, 32, 35, 38, 42, 45, 52, 58, 65, 48, 32, 18, 8],
    // Tuesday  
    [1, 1, 1, 1, 2, 5, 9, 14, 17, 20, 25, 30, 35, 38, 42, 45, 48, 55, 62, 68, 52, 35, 20, 10],
    // Wednesday
    [2, 1, 1, 1, 2, 4, 8, 13, 16, 19, 24, 29, 34, 37, 41, 44, 47, 54, 60, 67, 50, 34, 19, 9],
    // Thursday
    [1, 1, 1, 1, 3, 6, 10, 15, 18, 21, 26, 31, 36, 39, 43, 46, 49, 56, 63, 70, 53, 36, 21, 11],
    // Friday
    [2, 1, 1, 2, 3, 5, 9, 14, 17, 20, 25, 30, 35, 38, 42, 48, 55, 62, 70, 78, 65, 45, 28, 15],
    // Saturday
    [3, 2, 1, 1, 2, 3, 6, 10, 14, 18, 23, 28, 38, 45, 52, 58, 65, 72, 75, 68, 55, 38, 25, 18],
    // Sunday
    [2, 1, 1, 1, 2, 4, 7, 11, 15, 19, 24, 32, 42, 48, 55, 62, 68, 75, 78, 70, 58, 42, 28, 15]
  ]
};

// Extended Content Management Data
export const allContent = [
  {
    id: '1',
    title: 'Summer Fashion Haul + Try-On',
    caption: 'Sharing my latest summer fashion finds! Which piece is your favorite? 💕 Links in bio! #summerhaul #fashion #ootd #style',
    platform: 'Instagram',
    type: 'Reel',
    status: 'published',
    publishedAt: '2024-10-05T14:30:00Z',
    scheduledFor: null,
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    engagement: {
      views: 145200,
      likes: 12800,
      comments: 892,
      shares: 3240,
      saves: 5680,
      engagementRate: 11.7
    },
    reach: 124500,
    impressions: 178900,
    audienceDemographics: {
      topCountries: ['US', 'UK', 'CA'],
      ageRange: '18-34',
      gender: { female: 78, male: 22 }
    },
    tags: ['summer2024', 'fashion', 'haul'],
    campaign: 'Summer Collection 2024'
  },
  {
    id: '2',
    title: 'Day in My Life: Content Creator Edition',
    caption: 'Come along for a typical day in my life as a content creator! From morning routines to late-night editing sessions ✨',
    platform: 'YouTube',
    type: 'Video',
    status: 'published',
    publishedAt: '2024-10-04T10:00:00Z',
    scheduledFor: null,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    engagement: {
      views: 89400,
      likes: 7200,
      comments: 445,
      shares: 1890,
      saves: 0,
      engagementRate: 10.8
    },
    reach: 89400,
    impressions: 156780,
    audienceDemographics: {
      topCountries: ['US', 'CA', 'AU'],
      ageRange: '25-44',
      gender: { female: 65, male: 35 }
    },
    tags: ['dayinmylife', 'contentcreator', 'behind-the-scenes'],
    campaign: null
  },
  {
    id: '3',
    title: '5-Minute Makeup Challenge',
    caption: 'Can I do a full makeup look in just 5 minutes? Let\'s find out! 💄⏰ #5minutemakeup #challenge #quickmakeup',
    platform: 'TikTok',
    type: 'Video',
    status: 'published',
    publishedAt: '2024-10-03T19:00:00Z',
    scheduledFor: null,
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    engagement: {
      views: 298000,
      likes: 28900,
      comments: 1240,
      shares: 8900,
      saves: 0,
      engagementRate: 13.2
    },
    reach: 298000,
    impressions: 425600,
    audienceDemographics: {
      topCountries: ['US', 'UK', 'DE'],
      ageRange: '16-24',
      gender: { female: 82, male: 18 }
    },
    tags: ['makeup', 'challenge', 'quick'],
    campaign: 'Beauty Week'
  },
  {
    id: '4',
    title: 'Sustainable Fashion Tips Thread',
    caption: 'Thread: How to build a sustainable wardrobe on a budget 🌱👗 1/8',
    platform: 'Twitter',
    type: 'Thread',
    status: 'published',
    publishedAt: '2024-10-02T12:00:00Z',
    scheduledFor: null,
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    engagement: {
      views: 45600,
      likes: 2890,
      comments: 445,
      shares: 1240,
      saves: 0,
      engagementRate: 10.1
    },
    reach: 45600,
    impressions: 67890,
    audienceDemographics: {
      topCountries: ['US', 'UK', 'CA'],
      ageRange: '25-35',
      gender: { female: 68, male: 32 }
    },
    tags: ['sustainability', 'fashion', 'budget'],
    campaign: null
  },
  {
    id: '5',
    title: 'Behind the Scenes: Photoshoot',
    caption: 'BTS from yesterday\'s photoshoot! The final results are coming soon 📸✨',
    platform: 'Instagram',
    type: 'Story',
    status: 'expired',
    publishedAt: '2024-10-01T16:00:00Z',
    scheduledFor: null,
    thumbnail: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=400&h=300&fit=crop',
    engagement: {
      views: 67800,
      likes: 5240,
      comments: 234,
      shares: 890,
      saves: 0,
      engagementRate: 9.4
    },
    reach: 67800,
    impressions: 67800,
    audienceDemographics: {
      topCountries: ['US', 'UK', 'FR'],
      ageRange: '18-28',
      gender: { female: 75, male: 25 }
    },
    tags: ['bts', 'photoshoot', 'coming-soon'],
    campaign: 'Autumn Lookbook'
  },
  {
    id: '6',
    title: 'Fall Fashion Haul',
    caption: 'Excited to share my fall fashion picks! Cozy sweaters and trendy boots ahead 🍂👢 #fallhaul #fashion',
    platform: 'Instagram',
    type: 'Post',
    status: 'scheduled',
    publishedAt: null,
    scheduledFor: '2024-10-08T14:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    engagement: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      engagementRate: 0
    },
    reach: 0,
    impressions: 0,
    audienceDemographics: null,
    tags: ['fall', 'fashion', 'haul'],
    campaign: 'Fall Collection 2024'
  },
  {
    id: '7',
    title: 'Productivity Tips for Creators',
    caption: 'My top 5 productivity tips that helped me grow my content creation business 📈✨',
    platform: 'YouTube',
    type: 'Video',
    status: 'draft',
    publishedAt: null,
    scheduledFor: '2024-10-09T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    engagement: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      engagementRate: 0
    },
    reach: 0,
    impressions: 0,
    audienceDemographics: null,
    tags: ['productivity', 'tips', 'business'],
    campaign: null
  },
  {
    id: '8',
    title: 'Monday Motivation',
    caption: 'Starting the week with positive vibes! What are your goals for this week? 💪 #mondaymotivation',
    platform: 'TikTok',
    type: 'Video',
    status: 'scheduled',
    publishedAt: null,
    scheduledFor: '2024-10-07T08:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    engagement: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      engagementRate: 0
    },
    reach: 0,
    impressions: 0,
    audienceDemographics: null,
    tags: ['motivation', 'monday', 'goals'],
    campaign: 'Weekly Motivation Series'
  }
];

export const contentPerformanceSummary = {
  totalPosts: 167,
  avgEngagementRate: 10.8,
  bestPerformingType: 'Reel',
  optimalPostingTimes: {
    Instagram: '7-9 PM weekdays',
    YouTube: '10 AM weekends',
    TikTok: '6-8 PM daily',
    Twitter: '12-2 PM weekdays'
  }
};

export const contentTypeDistribution = [
  { type: 'Posts', count: 45, percentage: 35 },
  { type: 'Videos', count: 32, percentage: 25 },
  { type: 'Stories', count: 28, percentage: 22 },
  { type: 'Reels', count: 23, percentage: 18 }
];

export const quickFilters = [
  { id: 'top-performing', label: 'Top Performing', count: 12 },
  { id: 'needs-attention', label: 'Needs Attention', count: 8 },
  { id: 'recently-published', label: 'Recently Published', count: 15 },
  { id: 'expiring-soon', label: 'Expiring Soon', count: 3 }
];

export const contentComments = [
  {
    id: '1',
    contentId: '1',
    author: 'sarah_style',
    text: 'Love this outfit! Where did you get that top?',
    timestamp: '2024-10-05T15:30:00Z',
    likes: 23,
    sentiment: 'positive'
  },
  {
    id: '2',
    contentId: '1',
    author: 'fashion_lover_23',
    text: 'You always have the best style inspo! 💕',
    timestamp: '2024-10-05T16:15:00Z',
    likes: 45,
    sentiment: 'positive'
  },
  {
    id: '3',
    contentId: '1',
    author: 'trendy_girl',
    text: 'Not really my style but you look great!',
    timestamp: '2024-10-05T17:20:00Z',
    likes: 12,
    sentiment: 'neutral'
  }
];

export const contentAnalytics = {
  '1': {
    hourlyBreakdown: [
      { hour: '14:00', views: 2400, engagement: 180 },
      { hour: '15:00', views: 12800, engagement: 890 },
      { hour: '16:00', views: 18900, engagement: 1240 },
      { hour: '17:00', views: 22100, engagement: 1680 },
      { hour: '18:00', views: 28400, engagement: 2100 },
      { hour: '19:00', views: 34200, engagement: 2890 },
      { hour: '20:00', views: 41800, engagement: 3450 },
      { hour: '21:00', views: 45200, engagement: 3820 }
    ],
    sentimentAnalysis: {
      positive: 82,
      neutral: 15,
      negative: 3
    },
    topComments: [
      { text: 'Love this outfit!', likes: 45, sentiment: 'positive' },
      { text: 'Where did you get that top?', likes: 23, sentiment: 'neutral' },
      { text: 'You always have the best style!', likes: 67, sentiment: 'positive' }
    ]
  }
};