import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Shield,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import NotificationBell from '@/components/NotificationBell';

interface DashboardNavigationProps {
  userProfile?: any;
  onSignOut: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ 
  userProfile, 
  onSignOut,
  isDarkMode = false,
  onToggleTheme
}) => {
  const { user } = useAuth();

  return (
    <nav className={`backdrop-blur-sm border-b ${isDarkMode 
      ? 'bg-slate-900 border-slate-700' 
      : 'bg-white/90 border-slate-200/50'
    }`}>
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" linkTo="/" isAuthenticated={!!user} isDarkMode={isDarkMode} />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Wallet & eKYC Status */}
            <div className="flex items-center space-x-2">
              <Badge 
                variant={userProfile?.walletConnected ? "default" : "secondary"}
                className={`${
                  userProfile?.walletConnected 
                    ? 'bg-green-500/20 text-green-600 border-green-500/30' 
                    : 'bg-slate-500/20 text-slate-600 border-slate-500/30'
                }`}
              >
                <Wallet className="w-3 h-3 mr-1" />
                {userProfile?.walletConnected ? 'Connected' : 'Not Connected'}
              </Badge>
              
              <Badge 
                variant={userProfile?.kycStatus === 'verified' ? "default" : "destructive"}
                className={`${
                  userProfile?.kycStatus === 'verified'
                    ? 'bg-green-500/20 text-green-600 border-green-500/30'
                    : 'bg-red-500/20 text-red-600 border-red-500/30'
                }`}
              >
                <Shield className="w-3 h-3 mr-1" />
                eKYC
              </Badge>
            </div>

            {/* Theme Toggle */}
            {onToggleTheme && (
              <div className="flex items-center space-x-1">
                <Sun className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-yellow-500'}`} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleTheme}
                  className={`h-6 w-10 rounded-full p-0 ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600' 
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                >
                  <div className={`h-4 w-4 rounded-full transition-transform ${
                    isDarkMode 
                      ? 'bg-slate-300 translate-x-2' 
                      : 'bg-white -translate-x-2'
                  }`} />
                </Button>
                <Moon className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-slate-400'}`} />
              </div>
            )}

            {/* Notification Bell */}
            <NotificationBell isDarkMode={isDarkMode} />

            {/* Profile Dropdown */}
            <ProfileDropdown isDarkMode={isDarkMode} />

            {/* Logout Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSignOut}
              className={`${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavigation;