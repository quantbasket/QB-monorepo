import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Home, 
  TrendingUp, 
  Leaf, 
  Users, 
  BarChart3, 
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

interface DashboardNavigationProps {
  userProfile?: any;
  onSignOut: () => void;
  isDarkMode?: boolean;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ 
  userProfile, 
  onSignOut,
  isDarkMode = false
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`backdrop-blur-sm border-b ${isDarkMode 
      ? 'bg-gray-800/50 border-gray-700/50' 
      : 'bg-white/50 border-gray-200/50'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Logo size="md" linkTo="/" isAuthenticated={!!user} isDarkMode={isDarkMode} />
            
            {/* Back to Main Site */}
            <Link to="/">
              <Button variant="ghost" size="sm" className={`${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}>
                <Home className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* Wallet Status */}
            <Badge variant="secondary" className="bg-green-500/20 text-green-600">
              <Wallet className="w-3 h-3 mr-1" />
              {userProfile?.walletConnected ? 'Wallet Connected' : 'Authenticated'}
            </Badge>

            {/* User Avatar and Menu */}
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={userProfile?.avatarUrl} />
                <AvatarFallback>{userProfile?.name?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              
              <div className="hidden md:block text-sm">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProfile?.name || user?.user_metadata?.full_name || 'User'}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user?.email}
                </p>
              </div>

              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavigation; 