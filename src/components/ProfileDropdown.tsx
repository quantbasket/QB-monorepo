import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  User, 
  Settings, 
  Wallet, 
  Upload, 
  MapPin, 
  Phone, 
  Calendar,
  Shield,
  Camera
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardService } from '@/services/dashboardService';

// Countries data
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'RU', name: 'Russia' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NO', name: 'Norway' }
];

interface ProfileDropdownProps {
  isDarkMode?: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isDarkMode = false }) => {
  const { user } = useAuth();
  const { userProfile, updateProfile, loading } = useDashboard();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: userProfile?.full_name || '',
    username: userProfile?.username || '',
    phone_number: userProfile?.phone_number || '',
    location: userProfile?.location || '',
    country: userProfile?.country || '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      let avatarUrl = userProfile?.avatar_url;

      // Upload avatar if a new file is selected
      if (avatarFile) {
        setUploading(true);
        avatarUrl = await DashboardService.uploadAvatar(user.id, avatarFile);
        if (!avatarUrl) {
          toast.error('Failed to upload avatar');
          return;
        }
      }

      const success = await updateProfile({
        ...profileForm,
        avatar_url: avatarUrl
      });

      if (success) {
        setIsProfileOpen(false);
        setAvatarFile(null);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setAvatarFile(file);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
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
          className={`w-80 ${isDarkMode 
            ? 'bg-slate-900/95 border-slate-700 backdrop-blur-md' 
            : 'bg-white/95 border-slate-200 backdrop-blur-md'
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
            onClick={() => setIsProfileOpen(true)}
            className={`cursor-pointer ${isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            <User className="mr-2 h-4 w-4" />
            Profile Settings
          </DropdownMenuItem>
          
          <DropdownMenuItem className={`cursor-pointer ${isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}>
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700 text-white' 
            : 'bg-white border-slate-200'
        }`}>
          <DialogHeader>
            <DialogTitle className={`text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Profile Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Account Information */}
            <Card className={`${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <CardHeader>
                <CardTitle className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                    Member since: {formatDate(userProfile?.created_at || user?.created_at || new Date().toISOString())}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={userProfile?.walletConnected ? "default" : "secondary"}
                    className="text-xs"
                  >
                    <Wallet className="w-3 h-3 mr-1" />
                    Wallet: {userProfile?.walletConnected ? 'Connected' : 'Not Connected'}
                  </Badge>
                  <Badge 
                    variant={userProfile?.kycStatus === 'verified' ? "default" : "destructive"}
                    className="text-xs"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    eKYC: {userProfile?.kycStatus || 'Pending'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Profile Form */}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>Profile Picture</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage 
                      src={avatarFile ? URL.createObjectURL(avatarFile) : userProfile?.avatar_url} 
                      alt="Profile" 
                    />
                    <AvatarFallback>
                      <Camera className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label 
                      htmlFor="avatar-upload" 
                      className={`cursor-pointer inline-flex items-center px-3 py-2 text-sm rounded-md border ${
                        isDarkMode 
                          ? 'border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-200' 
                          : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Label>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                    placeholder="Create unique username"
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <Label htmlFor="phone_number" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                  Phone Number
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="phone_number"
                    type="tel"
                    value={profileForm.phone_number}
                    onChange={(e) => setProfileForm({...profileForm, phone_number: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className={`flex-1 ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}`}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className={isDarkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-700' : ''}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Country
                  </Label>
                  <Select value={profileForm.country} onValueChange={(value) => setProfileForm({...profileForm, country: value})}>
                    <SelectTrigger className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-600' : ''}>
                      {countries.map(country => (
                        <SelectItem 
                          key={country.code} 
                          value={country.code}
                          className={isDarkMode ? 'text-slate-200 hover:bg-slate-700' : ''}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Address/Location
                  </Label>
                  <Input
                    id="location"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                    placeholder="City, State/Province"
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                  />
                </div>
              </div>

              <Separator />

              {/* Wallet Connection */}
              <Card className={`${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    Wallet Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                        {userProfile?.walletConnected ? 'Wallet Connected' : 'No Wallet Connected'}
                      </p>
                      {userProfile?.walletAddress && (
                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {userProfile.walletAddress}
                        </p>
                      )}
                    </div>
                    <Button 
                      type="button" 
                      variant={userProfile?.walletConnected ? "destructive" : "default"}
                      size="sm"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      {userProfile?.walletConnected ? 'Disconnect' : 'Connect MetaMask'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsProfileOpen(false)}
                  className={isDarkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-700' : ''}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || uploading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading || uploading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDropdown;