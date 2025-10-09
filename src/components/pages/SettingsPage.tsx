import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Instagram,
  Youtube,
  Music,
  Twitter,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  ExternalLink
} from 'lucide-react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: true,
    weeklyReports: false,
    platformAlerts: true
  });

  const connectedPlatforms = [
    {
      platform: 'Instagram',
      icon: <Instagram className="h-5 w-5" style={{ color: '#E4405F' }} />,
      connected: true,
      username: '@sarah_creator',
      followers: '28.0K'
    },
    {
      platform: 'YouTube',
      icon: <Youtube className="h-5 w-5" style={{ color: '#FF0000' }} />,
      connected: true,
      username: 'Sarah Creator',
      followers: '13.2K'
    },
    {
      platform: 'TikTok',
      icon: <Music className="h-5 w-5" style={{ color: '#000000' }} />,
      connected: true,
      username: '@sarahcreates',
      followers: '17.8K'
    },
    {
      platform: 'Twitter',
      icon: <Twitter className="h-5 w-5" style={{ color: '#1DA1F2' }} />,
      connected: false,
      username: '',
      followers: ''
    }
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk-prod-••••••••••••••••••••••••',
      created: '2024-09-15',
      lastUsed: '2024-10-07'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk-dev-••••••••••••••••••••••••',
      created: '2024-08-22',
      lastUsed: '2024-10-05'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="sarah@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  className="w-full p-3 border border-input rounded-md resize-none"
                  rows={3}
                  defaultValue="Content creator focused on lifestyle, fashion, and productivity. Helping others live their best life through authentic storytelling."
                />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedPlatforms.map((platform) => (
                  <div key={platform.platform} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {platform.icon}
                      <div>
                        <div className="font-medium">{platform.platform}</div>
                        {platform.connected ? (
                          <div className="text-sm text-muted-foreground">
                            {platform.username} • {platform.followers} followers
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">Not connected</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.connected ? (
                        <>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <Check className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Manage
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-post to all connected platforms</Label>
                  <p className="text-sm text-muted-foreground">Automatically share content across all platforms</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Cross-platform analytics</Label>
                  <p className="text-sm text-muted-foreground">Combine metrics from all platforms</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sync posting schedules</Label>
                  <p className="text-sm text-muted-foreground">Coordinate posting times across platforms</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your account via email</p>
                </div>
                <Switch 
                  checked={notifications.emailUpdates}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailUpdates: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified about important events</p>
                </div>
                <Switch 
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly analytics summaries</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Platform Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alerts for platform-specific events</p>
                </div>
                <Switch 
                  checked={notifications.platformAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, platformAlerts: checked }))}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="daily" name="frequency" value="daily" />
                  <Label htmlFor="daily">Daily digest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="weekly" name="frequency" value="weekly" defaultChecked />
                  <Label htmlFor="weekly">Weekly summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="monthly" name="frequency" value="monthly" />
                  <Label htmlFor="monthly">Monthly report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="never" name="frequency" value="never" />
                  <Label htmlFor="never">Never</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button>Update Password</Button>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground">Chrome on macOS • New York, US</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Mobile App</div>
                      <div className="text-sm text-muted-foreground">iPhone • Last active 2 hours ago</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>API Keys</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{key.name}</div>
                      <div className="text-sm text-muted-foreground font-mono">{key.key}</div>
                      <div className="text-sm text-muted-foreground">
                        Created: {key.created} • Last used: {key.lastUsed}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Getting Started Guide</div>
                    <div className="text-sm text-muted-foreground">Learn how to use our API</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">API Reference</div>
                    <div className="text-sm text-muted-foreground">Complete API documentation</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Rate Limits</div>
                    <div className="text-sm text-muted-foreground">Current: 1000 requests/hour</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}