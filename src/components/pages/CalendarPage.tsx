import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  Instagram,
  Youtube,
  Music,
  Twitter,
  MoreHorizontal
} from 'lucide-react';

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  // Mock calendar events
  const events = [
    {
      id: '1',
      title: 'Fall Fashion Haul',
      platform: 'Instagram',
      date: '2024-10-08',
      time: '14:00',
      type: 'post',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Productivity Tips Video',
      platform: 'YouTube',
      date: '2024-10-09',
      time: '10:00',
      type: 'video',
      status: 'draft'
    },
    {
      id: '3',
      title: 'Monday Motivation',
      platform: 'TikTok',
      date: '2024-10-07',
      time: '08:00',
      type: 'video',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Weekly Recap Thread',
      platform: 'Twitter',
      date: '2024-10-11',
      time: '16:00',
      type: 'thread',
      status: 'idea'
    },
    {
      id: '5',
      title: 'Behind the Scenes',
      platform: 'Instagram',
      date: '2024-10-12',
      time: '12:00',
      type: 'story',
      status: 'scheduled'
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" style={{ color: '#E4405F' }} />;
      case 'YouTube': return <Youtube className="h-4 w-4" style={{ color: '#FF0000' }} />;
      case 'TikTok': return <Music className="h-4 w-4" style={{ color: '#000000' }} />;
      case 'Twitter': return <Twitter className="h-4 w-4" style={{ color: '#1DA1F2' }} />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'idea': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateStr = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateStr);
      
      days.push({
        date: date,
        dateStr: dateStr,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === currentDateStr.toDateString(),
        events: dayEvents
      });
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">Plan and schedule your content across all platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </div>

      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-1 border border-border/50 ${
                  !day.isCurrentMonth ? 'bg-muted/30' : ''
                } ${day.isToday ? 'bg-primary/5 border-primary/30' : ''}`}
              >
                <div className={`text-sm mb-1 ${
                  !day.isCurrentMonth ? 'text-muted-foreground' : 
                  day.isToday ? 'font-bold text-primary' : ''
                }`}>
                  {day.date.getDate()}
                </div>
                
                {/* Events */}
                <div className="space-y-1">
                  {day.events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded bg-card border border-border/50 cursor-pointer hover:shadow-sm"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {getPlatformIcon(event.platform)}
                        <span className="font-medium truncate">{event.title}</span>
                      </div>
                      <div className="text-muted-foreground">{event.time}</div>
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-muted-foreground pl-1">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(event.platform)}
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Publishing Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">This Week</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">12 posts</div>
                  <div className="text-sm text-muted-foreground">scheduled</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Best Time</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">2:00 PM</div>
                  <div className="text-sm text-muted-foreground">avg engagement</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5" style={{ color: '#E4405F' }} />
                  <span className="font-medium">Most Active</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">Instagram</div>
                  <div className="text-sm text-muted-foreground">8 posts/week</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-500"></div>
                  <span className="font-medium">Success Rate</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">94%</div>
                  <div className="text-sm text-muted-foreground">published on time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}