import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, TrendingUp, Award, Wallet, Users, Settings, Check } from 'lucide-react';

interface NotificationBellProps {
  isDarkMode?: boolean;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ isDarkMode = false }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    portfolio: true,
    impact: true
  });

  // Simplified mock notifications - no complex state management
  const notifications = [
    {
      id: '1',
      title: 'Portfolio Update',
      message: 'Your portfolio value increased by 5.2%',
      time: '30m ago',
      icon: TrendingUp,
      type: 'success'
    },
    {
      id: '2',
      title: 'New Impact Token',
      message: 'You earned 2 ECO tokens',
      time: '2h ago',
      icon: Award,
      type: 'info'
    }
  ];

  const unreadCount = notifications.length;

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
          className={`w-80 z-50 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-700' 
              : 'bg-white border-slate-200'
          }`} 
          align="end"
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Notifications</span>
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
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 ${
                  isDarkMode 
                    ? 'hover:bg-slate-800 text-slate-200' 
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="text-blue-500">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs opacity-75">{notification.message}</p>
                    <p className="text-xs opacity-50">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Simple Notification Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className={`max-w-md z-50 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-700 text-white' 
            : 'bg-white border-slate-200'
        }`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              Notification Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                Delivery Methods
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Email Notifications
                  </Label>
                  <Switch
                    id="email"
                    checked={settings.email}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, email: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="push" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Push Notifications
                  </Label>
                  <Switch
                    id="push"
                    checked={settings.push}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, push: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                Notification Types
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="portfolio" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Portfolio Updates
                  </Label>
                  <Switch
                    id="portfolio"
                    checked={settings.portfolio}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, portfolio: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="impact" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Impact Rewards
                  </Label>
                  <Switch
                    id="impact"
                    checked={settings.impact}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, impact: checked})
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