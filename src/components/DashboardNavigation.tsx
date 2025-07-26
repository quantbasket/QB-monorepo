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

interface DashboardNavigationProps {
  userProfile?: any;
  onSignOut: () => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ 
  userProfile, 
  onSignOut 
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">QB</span>
              </div>
              <span className="text-xl font-bold">Quant Basket</span>
            </Link>
            
            {/* Back to Main Site */}
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
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
                <p className="font-medium">{userProfile?.name || user?.user_metadata?.full_name || 'User'}</p>
                <p className="text-muted-foreground text-xs">{user?.email}</p>
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