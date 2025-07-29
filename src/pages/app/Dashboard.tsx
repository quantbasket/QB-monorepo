import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { DollarSign, Euro, IndianRupee, Banknote, Coins } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboardContext';
import DashboardNavigation from '@/components/DashboardNavigation';
import LoadingScreen from '@/components/LoadingScreen';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const currencies = [
  { code: 'USD', symbol: '$', icon: DollarSign },
  { code: 'EUR', symbol: '€', icon: Euro },
  { code: 'INR', symbol: '₹', icon: IndianRupee },
  { code: 'RUB', symbol: '₽', icon: Banknote },
  { code: 'CNY', symbol: '¥', icon: Coins }
];

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTab, setSelectedTab] = useState('overview');

  const { user, signOut, loading: authLoading } = useAuth();
  const {
    userProfile,
    portfolioSummary,
    dataLoading
  } = useDashboard();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getCurrencyRate = (currency: string) => {
    const rates = {
      USD: 1,
      EUR: 0.85,
      INR: 83.12,
      RUB: 74.55,
      CNY: 7.24
    };
    return rates[currency] || 1;
  };

  const formatPrice = (price: number, currency: string) => {
    const rate = getCurrencyRate(currency);
    const convertedPrice = price * rate;
    const currencyData = currencies.find(c => c.code === currency);
    return `${currencyData?.symbol}${convertedPrice.toFixed(2)}`;
  };

  // Show loading state while auth is loading or data is loading
  if (authLoading || dataLoading) {
    return (
      <LoadingScreen 
        message="Loading your dashboard..."
        subMessage="Please wait while we prepare your Quant Basket experience"
        size="md"
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Background Gradient */}
      <div className={`fixed inset-0 ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' 
        : 'bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600'
      }`} />
      
      <div className={`relative z-10 min-h-screen backdrop-blur-sm ${isDarkMode 
        ? 'bg-gray-900/95' 
        : 'bg-white/95'
      }`}>
        {/* Dashboard Navigation */}
        <DashboardNavigation 
          userProfile={userProfile} 
          onSignOut={handleSignOut}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
        
        {/* Dashboard Header */}
        <header className={`border-b backdrop-blur-sm ${isDarkMode 
          ? 'border-slate-700/50 bg-slate-800/50' 
          : 'border-slate-200/50 bg-white/50'
        }`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className={`w-24 ${isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : 'bg-white border-slate-300'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode 
                    ? 'bg-slate-800 border-slate-600' 
                    : 'bg-white border-slate-300'
                  }>
                    {currencies.map(currency => (
                      <SelectItem 
                        key={currency.code} 
                        value={currency.code}
                        className={isDarkMode ? 'text-white hover:bg-slate-700' : 'text-slate-900 hover:bg-slate-50'}
                      >
                        <div className="flex items-center space-x-2">
                          <currency.icon className="w-4 h-4" />
                          <span>{currency.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className={`grid w-full grid-cols-5 ${isDarkMode 
              ? 'bg-slate-800/50' 
              : 'bg-white/50'
            }`}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <DashboardOverview
                portfolioSummary={portfolioSummary}
                isDarkMode={isDarkMode}
                selectedCurrency={selectedCurrency}
                formatPrice={formatPrice}
                onTabChange={setSelectedTab}
              />
            </TabsContent>

            {/* Other tabs - simplified placeholders for now */}
            <TabsContent value="trading" className="space-y-6">
              <div className={`p-8 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Trading functionality coming soon...
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className={`p-8 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Impact tracking coming soon...
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <div className={`p-8 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Community features coming soon...
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <div className={`p-8 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Portfolio details coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}