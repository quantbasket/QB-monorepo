import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const { userProfile, updateProfile } = useDashboard();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    location: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    wallet_address: '',
    bank_account: '',
    pan_number: '',
    kyc_document: ''
  });

  const handleProfileOpen = () => {
    if (userProfile) {
      setProfileForm({
        full_name: userProfile.full_name || '',
        location: userProfile.location || '',
        phone_number: userProfile.phone_number || '',
        address: (userProfile as any).address || '',
        date_of_birth: (userProfile as any).date_of_birth || '',
        wallet_address: (userProfile as any).wallet_address || '',
        bank_account: (userProfile as any).bank_account || '',
        pan_number: (userProfile as any).pan_number || '',
        kyc_document: (userProfile as any).kyc_document || ''
      });
    }
    setIsProfileOpen(true);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(profileForm);
    if (success) {
      setIsProfileOpen(false);
    }
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
            onClick={handleProfileOpen}
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

      {/* Enhanced Profile Settings Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className={`max-w-2xl max-h-[80vh] overflow-y-auto z-50 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-700 text-white' 
            : 'bg-white border-slate-200'
        }`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              Profile Settings
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                  Full Name *
                </Label>
                <Input
                  id="full_name"
                  value={profileForm.full_name}
                  onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                  className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                  Phone Number *
                </Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={profileForm.phone_number}
                  onChange={(e) => setProfileForm({...profileForm, phone_number: e.target.value})}
                  className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                  Date of Birth
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={profileForm.date_of_birth}
                  onChange={(e) => setProfileForm({...profileForm, date_of_birth: e.target.value})}
                  className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                  Location
                </Label>
                <Input
                  id="location"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                  className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                Complete Address
              </Label>
              <Input
                id="address"
                value={profileForm.address}
                onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                placeholder="Street, City, State, Country, Postal Code"
              />
            </div>

            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Financial Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wallet_address" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Wallet Address
                  </Label>
                  <Input
                    id="wallet_address"
                    value={profileForm.wallet_address}
                    onChange={(e) => setProfileForm({...profileForm, wallet_address: e.target.value})}
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                    placeholder="0x..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank_account" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    Bank Account (Last 4 digits)
                  </Label>
                  <Input
                    id="bank_account"
                    value={profileForm.bank_account}
                    onChange={(e) => setProfileForm({...profileForm, bank_account: e.target.value})}
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                    placeholder="****1234"
                    maxLength={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pan_number" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    PAN Number
                  </Label>
                  <Input
                    id="pan_number"
                    value={profileForm.pan_number}
                    onChange={(e) => setProfileForm({...profileForm, pan_number: e.target.value})}
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kyc_document" className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
                    KYC Document Type
                  </Label>
                  <Input
                    id="kyc_document"
                    value={profileForm.kyc_document}
                    onChange={(e) => setProfileForm({...profileForm, kyc_document: e.target.value})}
                    className={isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}
                    placeholder="Aadhaar/Passport/Driver's License"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsProfileOpen(false)}
                className={isDarkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-700' : ''}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDropdown;