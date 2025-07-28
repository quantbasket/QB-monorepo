import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, TrendingUp, Award, Wallet, Users } from 'lucide-react';

interface NotificationBellProps {
  isDarkMode?: boolean;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ isDarkMode = false }) => {
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
        <DropdownMenuLabel className={isDarkMode ? 'text-white' : 'text-slate-900'}>
          Notifications
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
  );
};

export default NotificationBell;