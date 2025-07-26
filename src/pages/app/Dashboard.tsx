'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Sprout, 
  Hammer, 
  Users, 
  BarChart3, 
  Sun, 
  Moon,
  Settings,
  Award,
  Gift,
  RefreshCw,
  DollarSign,
  Euro,
  IndianRupee,
  Banknote,
  Coins,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DashboardNavigation from '@/components/DashboardNavigation';
import LoadingScreen from '@/components/LoadingScreen';
import { DashboardService, UserProfile, UserTokens, PortfolioSummary } from '@/services/dashboardService';

// Token definitions
const tokenDefinitions = {
  portfolio: [
    { symbol: 'PORT1', name: 'Growth Portfolio', price: 45.67, icon: TrendingUp },
    { symbol: 'PORT2', name: 'Stable Portfolio', price: 23.45, icon: BarChart3 },
    { symbol: 'PORT3', name: 'Tech Portfolio', price: 78.90, icon: TrendingUp }
  ],
  impact: [
    { symbol: 'ECO', name: 'Eco Sustainability', price: 12.34, icon: Leaf },
    { symbol: 'VEG', name: 'Vegan Impact', price: 8.90, icon: Sprout },
    { symbol: 'MAKE', name: 'Maker Community', price: 15.67, icon: Hammer }
  ],
  quant: [
    { symbol: 'STRD', name: 'Straddle Strategy', price: 34.56, icon: BarChart3 },
    { symbol: 'ARBT', name: 'Arbitrage Strategy', price: 28.90, icon: TrendingUp },
    { symbol: 'GRID', name: 'Grid Strategy', price: 41.23, icon: BarChart3 }
  ]
};

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
  const [userTokens, setUserTokens] = useState<UserTokens | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Get user from auth context
  const { user, signOut, loading: authLoading } = useAuth();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    location: '',
    email: ''
  });

  const [buyForm, setBuyForm] = useState({
    category: '',
    symbol: '',
    amount: 0
  });

  // Load user data when user is authenticated
  useEffect(() => {
    if (user && !authLoading) {
      loadUserData();
    } else if (!authLoading && !user) {
      setDataLoading(false);
    }
  }, [user, authLoading]);

  // Reset dark mode when component unmounts (user leaves dashboard)
  useEffect(() => {
    return () => {
      // Ensure dark mode is reset when leaving dashboard
      setIsDarkMode(false);
    };
  }, []);

  const loadUserData = async () => {
    try {
      setDataLoading(true);
      if (!user) return;

      // Load user profile from service
      const profile = await DashboardService.getUserProfile(user.id);
      if (profile) {
        setUserProfile(profile);
        setProfileForm({
          name: profile.full_name || user.user_metadata?.full_name || 'Demo User',
          location: profile.location || 'Demo Location',
          email: user.email || ''
        });
      }

      // Load user tokens from service
      const tokens = await DashboardService.getUserTokens(user.id);
      setUserTokens(tokens);

      // Load portfolio summary from service
      const summary = await DashboardService.getPortfolioSummary(user.id);
      setPortfolioSummary(summary);

    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  const handleBuyToken = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Mock token purchase
      const updatedTokens = { ...userTokens };
      if (updatedTokens[buyForm.category] && updatedTokens[buyForm.category][buyForm.symbol] !== undefined) {
        updatedTokens[buyForm.category][buyForm.symbol] += buyForm.amount;
      }
      
      setUserTokens(updatedTokens);
      toast.success(`Successfully bought ${buyForm.amount} ${buyForm.symbol} tokens! (Demo Mode)`);
      setBuyForm({ category: '', symbol: '', amount: 0 });
      
    } catch (error) {
      console.error('Buy token error:', error);
      toast.error(error.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReportImpact = async (type, description) => {
    if (!user) return;

    setLoading(true);
    try {
      // Mock impact reporting
      const symbolMap = { eco: 'ECO', veg: 'VEG', make: 'MAKE' };
      const symbol = symbolMap[type.toLowerCase()];
      const rewardAmount = 1;
      
      if (symbol && userTokens?.impact[symbol] !== undefined) {
        const updatedTokens = { ...userTokens };
        updatedTokens.impact[symbol] += rewardAmount;
        setUserTokens(updatedTokens);
        
        // Update impact score
        const updatedProfile = { ...userProfile };
        updatedProfile.impactScore = (updatedProfile.impactScore || 0) + 1;
        setUserProfile(updatedProfile);
      }

      toast.success(`Impact action recorded! +${rewardAmount} ${symbol} tokens (Demo Mode)`);
      
    } catch (error) {
      console.error('Report impact error:', error);
      toast.error(error.message || 'Impact report failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemBenefit = async (benefitType, cost, token) => {
    if (!user) return;

    setLoading(true);
    try {
      // Mock benefit redemption
      const updatedTokens = { ...userTokens };
      if (updatedTokens.community[token] >= cost) {
        updatedTokens.community[token] -= cost;
        setUserTokens(updatedTokens);
        toast.success(`Successfully redeemed ${benefitType}! (Demo Mode)`);
      } else {
        toast.error('Insufficient community tokens');
      }
      
    } catch (error) {
      console.error('Redeem benefit error:', error);
      toast.error(error.message || 'Redemption failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Mock profile update
      const updatedProfile = { ...userProfile, ...profileForm, updatedAt: new Date().toISOString() };
      setUserProfile(updatedProfile);
      toast.success('Profile updated successfully! (Demo Mode)');
      
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Dark mode is local to Dashboard only - doesn't affect other pages
    // This prevents Login/Signup pages from being affected by Dashboard dark mode
  };

  const getCurrencyRate = (currency) => {
    const rates = {
      USD: 1,
      EUR: 0.85,
      INR: 83.12,
      RUB: 74.55,
      CNY: 7.24
    };
    return rates[currency] || 1;
  };

  const formatPrice = (price, currency) => {
    const rate = getCurrencyRate(currency);
    const convertedPrice = price * rate;
    const currencyData = currencies.find(c => c.code === currency);
    return `${currencyData?.symbol}${convertedPrice.toFixed(2)}`;
  };

  const copyReferralCode = () => {
    if (userProfile?.referralCode) {
      navigator.clipboard.writeText(userProfile.referralCode);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
      toast.success('Referral code copied!');
    }
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

  // This shouldn't happen due to ProtectedRoute, but just in case
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Portfolio Value</p>
                        <p className="text-2xl font-bold">
                          {formatPrice(portfolioSummary?.totalPortfolioValue || 0, selectedCurrency)}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">Community Tokens</p>
                        <p className="text-2xl font-bold">{portfolioSummary?.totalCommunityTokens || 0}</p>
                      </div>
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">Impact Score</p>
                        <p className="text-2xl font-bold">{portfolioSummary?.impactScore || 0}</p>
                      </div>
                      <Award className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">Active Strategies</p>
                        <p className="text-2xl font-bold">{portfolioSummary?.activeStrategies || 0}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className={`${isDarkMode 
                ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                : 'bg-white/95 border-gray-200/50'
              }`}>
                <CardHeader>
                  <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className={`h-20 flex-col ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 hover:text-white hover:border-gray-500' 
                          : 'border-gray-300 bg-white/50 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setSelectedTab('trading')}
                    >
                      <TrendingUp className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      Buy Tokens
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-20 flex-col ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 hover:text-white hover:border-gray-500' 
                          : 'border-gray-300 bg-white/50 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setSelectedTab('trading')}
                    >
                      <TrendingDown className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                      Sell Tokens
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-20 flex-col ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 hover:text-white hover:border-gray-500' 
                          : 'border-gray-300 bg-white/50 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setSelectedTab('community')}
                    >
                      <Gift className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      Claim Rewards
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-20 flex-col ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 hover:text-white hover:border-gray-500' 
                          : 'border-gray-300 bg-white/50 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setSelectedTab('impact')}
                    >
                      <Award className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      Report Impact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trading Tab */}
            <TabsContent value="trading" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Buy Tokens Form */}
                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Buy Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBuyToken} className="space-y-4">
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          Token Category
                        </label>
                        <Select value={buyForm.category} onValueChange={(value) => setBuyForm({...buyForm, category: value, symbol: ''})}>
                          <SelectTrigger className={`${isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                          }`}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className={`${isDarkMode 
                            ? 'bg-gray-800 border-gray-600' 
                            : 'bg-white border-gray-300'
                          }`}>
                            <SelectItem value="portfolio" className={`${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}>
                              Portfolio Tokens
                            </SelectItem>
                            <SelectItem value="impact" className={`${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}>
                              Impact Tokens
                            </SelectItem>
                            <SelectItem value="quant" className={`${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}>
                              Quant Strategy Tokens
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {buyForm.category && (
                        <div className="space-y-2">
                          <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Token
                          </label>
                          <Select value={buyForm.symbol} onValueChange={(value) => setBuyForm({...buyForm, symbol: value})}>
                            <SelectTrigger className={`${isDarkMode 
                              ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                            }`}>
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent className={`${isDarkMode 
                              ? 'bg-gray-800 border-gray-600' 
                              : 'bg-white border-gray-300'
                            }`}>
                              {tokenDefinitions[buyForm.category]?.map(token => (
                                <SelectItem key={token.symbol} value={token.symbol} className={`${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}>
                                  {token.name} ({token.symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          Amount
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={buyForm.amount}
                          onChange={(e) => setBuyForm({...buyForm, amount: parseFloat(e.target.value) || 0})}
                          required
                          className={`${isDarkMode 
                            ? 'bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                          }`}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading || !buyForm.category || !buyForm.symbol}>
                        {loading ? 'Processing...' : 'Buy Tokens'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Token Listings */}
                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Available Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(tokenDefinitions).map(([category, tokens]) => (
                      <div key={category} className="space-y-2">
                        <h4 className={`font-medium capitalize ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {category} Tokens
                        </h4>
                        {tokens.map(token => (
                          <div key={token.symbol} className={`flex items-center justify-between p-3 border rounded-lg ${
                            isDarkMode 
                              ? 'border-gray-600 bg-gray-700/30' 
                              : 'border-gray-200 bg-gray-50/50'
                          }`}>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {token.symbol.slice(0, 2)}
                              </div>
                              <div>
                                <p className={`font-medium text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {token.name}
                                </p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {token.symbol}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {formatPrice(token.price, selectedCurrency)}
                              </p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Balance: {userTokens?.[category]?.[token.symbol] || 0}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Impact Tokens */}
                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Impact Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {tokenDefinitions.impact.map(token => {
                      const IconComponent = token.icon;
                      return (
                        <div key={token.symbol} className={`flex items-center justify-between p-4 border rounded-lg ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700/30' 
                            : 'border-gray-200 bg-gray-50/50'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {token.name}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {token.symbol}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {formatPrice(token.price, selectedCurrency)}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Balance: {userTokens?.impact?.[token.symbol] || 0}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Impact Actions */}
                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Report Impact Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button 
                        className={`w-full justify-start ${
                          isDarkMode 
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30' 
                            : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                        }`}
                        onClick={() => handleReportImpact('eco', 'Eco-friendly action reported')}
                        disabled={loading}
                      >
                        <Leaf className="w-4 h-4 mr-2" />
                        Eco-Friendly Action
                      </Button>
                      <Button 
                        className={`w-full justify-start ${
                          isDarkMode 
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30' 
                            : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                        }`}
                        onClick={() => handleReportImpact('veg', 'Vegan choice reported')}
                        disabled={loading}
                      >
                        <Sprout className="w-4 h-4 mr-2" />
                        Vegan Choice
                      </Button>
                      <Button 
                        className={`w-full justify-start ${
                          isDarkMode 
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30' 
                            : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                        }`}
                        onClick={() => handleReportImpact('make', 'Maker project reported')}
                        disabled={loading}
                      >
                        <Hammer className="w-4 h-4 mr-2" />
                        Maker Project
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Your Impact Progress</p>
                      <div className="space-y-2">
                        <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                          <span>ECO Tokens</span>
                          <span>{userTokens?.impact?.ECO || 0}</span>
                        </div>
                        <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                          <span>VEG Tokens</span>
                          <span>{userTokens?.impact?.VEG || 0}</span>
                        </div>
                        <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                          <span>MAKE Tokens</span>
                          <span>{userTokens?.impact?.MAKE || 0}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Community Tokens */}
                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community Tokens</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`flex items-center justify-between p-4 border rounded-lg ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700/30' 
                        : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          SA
                        </div>
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>SAE Community</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>SAE</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Balance: {userTokens?.community?.SAE || 0}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Community Token</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between p-4 border rounded-lg ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700/30' 
                        : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          RO
                        </div>
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Roto Community</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>ROTO</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Balance: {userTokens?.community?.ROTO || 0}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Community Token</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Redeem Benefits */}
                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Redeem Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`p-4 border rounded-lg ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700/30' 
                        : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Premium Features</p>
                        <Badge className={`${isDarkMode ? 'bg-blue-600/50 text-blue-200' : ''}`}>100 SAE</Badge>
                      </div>
                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Unlock advanced trading features</p>
                      <Button 
                        size="sm" 
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30' 
                            : ''
                        }`}
                        onClick={() => handleRedeemBenefit('Premium Features', 100, 'SAE')}
                        disabled={loading || (userTokens?.community?.SAE || 0) < 100}
                      >
                        {(userTokens?.community?.SAE || 0) < 100 ? 'Insufficient Tokens' : 'Redeem'}
                      </Button>
                    </div>
                    
                    <div className={`p-4 border rounded-lg ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700/30' 
                        : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Priority Support</p>
                        <Badge className={`${isDarkMode ? 'bg-purple-600/50 text-purple-200' : ''}`}>50 ROTO</Badge>
                      </div>
                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Get priority customer support</p>
                      <Button 
                        size="sm" 
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30' 
                            : ''
                        }`}
                        onClick={() => handleRedeemBenefit('Priority Support', 50, 'ROTO')}
                        disabled={loading || (userTokens?.community?.ROTO || 0) < 50}
                      >
                        {(userTokens?.community?.ROTO || 0) < 50 ? 'Insufficient Tokens' : 'Redeem'}
                      </Button>
                    </div>
                    
                    <div className={`p-4 border rounded-lg ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700/30' 
                        : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Exclusive Events</p>
                        <Badge className={`${isDarkMode ? 'bg-pink-600/50 text-pink-200' : ''}`}>200 SAE</Badge>
                      </div>
                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Access to exclusive community events</p>
                      <Button 
                        size="sm" 
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border border-pink-500/30' 
                            : ''
                        }`}
                        onClick={() => handleRedeemBenefit('Exclusive Events', 200, 'SAE')}
                        disabled={loading || (userTokens?.community?.SAE || 0) < 200}
                      >
                        {(userTokens?.community?.SAE || 0) < 200 ? 'Insufficient Tokens' : 'Redeem'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className={`lg:col-span-2 ${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userTokens && Object.entries(userTokens).map(([category, categoryTokens]) => (
                        <div key={category} className="space-y-2">
                          <h4 className={`font-medium capitalize ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{category} Tokens</h4>
                          <div className="grid gap-2">
                            {Object.entries(categoryTokens).map(([symbol, balance]) => (
                              <div key={symbol} className={`flex justify-between items-center p-3 rounded-lg ${
                                isDarkMode 
                                  ? 'bg-gray-700/50 border border-gray-600' 
                                  : 'bg-muted/50'
                              }`}>
                                <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{symbol}</span>
                                <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{String(balance)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-lg' 
                  : 'bg-white/95 border-gray-200/50'
                }`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Total Value</span>
                        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {formatPrice(portfolioSummary?.totalPortfolioValue || 0, selectedCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>24h Change</span>
                        <span className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}>+5.67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Community Tokens</span>
                        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{portfolioSummary?.totalCommunityTokens || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Impact Score</span>
                        <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{portfolioSummary?.impactScore || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  );
}