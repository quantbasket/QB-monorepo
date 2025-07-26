import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  Settings, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Award,
  Wallet,
  Users,
  AlertCircle,
  Check
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon: React.ComponentType<any>;
}

interface NotificationBellProps {
  isDarkMode?: boolean;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ isDarkMode = false }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Portfolio Update',
      message: 'Your portfolio value increased by 5.2%',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      icon: TrendingUp
    },
    {
      id: '2',
      type: 'info',
      title: 'New Impact Token',
      message: 'You earned 2 ECO tokens for your sustainability actions',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      icon: Award
    },
    {
      id: '3',
      type: 'warning',
      title: 'Wallet Connection',
      message: 'Please verify your wallet connection for enhanced security',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      icon: Wallet
    },
    {
      id: '4',
      type: 'info',
      title: 'Community Update',
      message: 'New community features are now available',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      icon: Users
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    portfolio: true,
    impact: true,
    community: true,
    security: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`relative ${
              isDarkMode 
                ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className={`w-80 ${
            isDarkMode 
              ? 'bg-slate-900/95 border-slate-700 backdrop-blur-md' 
              : 'bg-white/95 border-slate-200 backdrop-blur-md'
          }`} 
          align="end"
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Notifications</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className={`text-xs ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Check className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className={`${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <ScrollArea className="h-80">
            <div className="space-y-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center">
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    No notifications yet
                  </p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`p-4 cursor-pointer ${
                        !notification.read 
                          ? isDarkMode 
                            ? 'bg-slate-800/50' 
                            : 'bg-blue-50/50'
                          : ''
                      } ${
                        isDarkMode 
                          ? 'hover:bg-slate-800' 
                          : 'hover:bg-slate-50'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className={`mt-1 ${getNotificationIcon(notification.type)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notification Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className={`max-w-md ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700 text-white' 
            : 'bg-white border-slate-200'
        }`}>
          <DialogHeader>
            <DialogTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Notification Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Delivery Methods */}
            <div className="space-y-4">
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                Delivery Methods
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <Label htmlFor="email" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, email: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <Label htmlFor="sms" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      SMS Notifications
                    </Label>
                  </div>
                  <Switch
                    id="sms"
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, sms: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <Label htmlFor="push" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      Push Notifications
                    </Label>
                  </div>
                  <Switch
                    id="push"
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, push: checked})
                    }
                  />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="space-y-4">
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                Notification Types
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <Label htmlFor="portfolio" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      Portfolio Updates
                    </Label>
                  </div>
                  <Switch
                    id="portfolio"
                    checked={notificationSettings.portfolio}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, portfolio: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <Label htmlFor="impact" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      Impact Rewards
                    </Label>
                  </div>
                  <Switch
                    id="impact"
                    checked={notificationSettings.impact}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, impact: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <Label htmlFor="community" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      Community Updates
                    </Label>
                  </div>
                  <Switch
                    id="community"
                    checked={notificationSettings.community}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, community: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <Label htmlFor="security" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                      Security Alerts
                    </Label>
                  </div>
                  <Switch
                    id="security"
                    checked={notificationSettings.security}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, security: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSettingsOpen(false)}
                className={isDarkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-700' : ''}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setIsSettingsOpen(false)}
                className="bg-primary hover:bg-primary/90"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationBell;