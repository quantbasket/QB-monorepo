import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, Settings, Wallet, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboardContext';

interface ProfileDropdownProps {
  isDarkMode?: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isDarkMode = false }) => {
  const { user } = useAuth();
  const { userProfile } = useDashboard();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name || 'User'} />
            <AvatarFallback>
              {userProfile?.full_name?.[0] || user?.email?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={`w-80 z-50 ${isDarkMode 
          ? 'bg-slate-900 border-slate-700' 
          : 'bg-white border-slate-200'
        }`} 
        align="end"
      >
        <div className="flex items-center space-x-3 p-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name || 'User'} />
            <AvatarFallback>
              {userProfile?.full_name?.[0] || user?.email?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {userProfile?.full_name || user?.user_metadata?.full_name || 'User'}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {user?.email}
            </p>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={userProfile?.walletConnected ? "default" : "secondary"}
                className="text-xs"
              >
                <Wallet className="w-3 h-3 mr-1" />
                {userProfile?.walletConnected ? 'Connected' : 'Not Connected'}
              </Badge>
              <Badge 
                variant={userProfile?.kycStatus === 'verified' ? "default" : "destructive"}
                className="text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                eKYC
              </Badge>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className={`cursor-pointer ${
            isDarkMode 
              ? 'text-slate-200 hover:bg-slate-800' 
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <User className="mr-2 h-4 w-4" />
          Profile Settings
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className={`cursor-pointer ${
            isDarkMode 
              ? 'text-slate-200 hover:bg-slate-800' 
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Settings className="mr-2 h-4 w-4" />
          Preferences
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;