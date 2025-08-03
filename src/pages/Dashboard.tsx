import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  DollarSign, 
  Euro, 
  IndianRupee, 
  Banknote, 
  Coins,
  TrendingUp,
  Users,
  Vote,
  Activity,
  FileText,
  MessageCircle,
  Settings,
  ExternalLink,
  Calendar,
  Award,
  Target,
  Zap,
  Leaf,
  Globe,
  Heart,
  BookOpen,
  Dumbbell,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Camera,
  MapPin,
  Star,
  Trophy,
  Timer,
  Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboardContext';
import DashboardNavigation from '@/components/DashboardNavigation';
import LoadingScreen from '@/components/LoadingScreen';

const currencies = [
  { code: 'USD', symbol: '$', icon: DollarSign },
  { code: 'EUR', symbol: '€', icon: Euro },
  { code: 'INR', symbol: '₹', icon: IndianRupee },
  { code: 'RUB', symbol: '₽', icon: Banknote },
  { code: 'CNY', symbol: '¥', icon: Coins }
];

// Mock data for community token
const mockTokenData = {
  name: "Community Coin",
  ticker: "COMM",
  logo: "🪙",
  description: "Empowering communities through value exchange",
  launchDate: "2024-01-15",
  status: "Live",
  communitySize: 1247,
  governancePower: 2.3,
  currentPrice: 0.45,
  marketCap: 562000,
  volume24h: 12500,
  growth7d: 12.5,
  userBalance: 150,
  stakedAmount: 50,
  claimableRewards: 5.2,
  votesParticipated: 8
};

// Mock data for impact coin
const mockImpactData = {
  name: "EcoAction Token",
  ticker: "ECO",
  logo: "🌱",
  theme: "Sustainability",
  mission: "Incentivizing verified environmental actions for a greener future",
  launchStatus: "Ongoing",
  sdgTag: "SDG #13 – Climate Action",
  totalImpact: "1,200 kg CO₂ offset",
  verifiedActions: 94.2,
  partners: ["GreenOrg", "CarbonAPI", "EcoVerify"],
  currentValue: 0.75,
  totalSupply: 1000000,
  circulatingSupply: 450000,
  userHoldings: 75,
  missionsCompleted: 12,
  impactScore: 850,
  claimableRewards: 8.5,
  mintingRule: "1 EcoToken per 10kg CO₂ offset",
  burnTrigger: "Burned if unused for 90 days",
  conversionRate: "1 EcoToken = $0.15 carbon credit"
};

// Mock data for quant strategy
const mockQuantData = {
  name: "Quant Strategy Alpha",
  ticker: "QSA",
  logo: "⚡",
  strategy: "AI-Driven Portfolio Optimization",
  status: "Active",
  aum: 2500000,
  performance30d: 8.7,
  sharpeRatio: 1.85,
  maxDrawdown: -3.2,
  userInvestment: 50000,
  unrealizedPnL: 4350,
  allocatedAssets: 12,
  riskScore: 6.5
};

// Mock data for portfolio tokens
const mockPortfolioData = {
  name: "Portfolio Token Basket",
  ticker: "PTB",
  logo: "📊",
  composition: "Diversified Asset Bundle",
  status: "Live",
  netAssetValue: 1.25,
  totalAssets: 850000,
  fee: 0.75,
  yield30d: 5.2,
  userHoldings: 400,
  dividendEarned: 125.50,
  assets: 25,
  rebalanceFreq: "Monthly"
};

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dashboardType, setDashboardType] = useState<'community' | 'impact' | 'quant' | 'portfolio'>('community');

  const { user, signOut, loading: authLoading } = useAuth();
  const {
    userProfile,
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

  const formatPrice = (price: number, currency: string) => {
    const rates = { USD: 1, EUR: 0.85, INR: 83.12, RUB: 74.55, CNY: 7.24 };
    const rate = rates[currency] || 1;
    const convertedPrice = price * rate;
    const currencyData = currencies.find(c => c.code === currency);
    return `${currencyData?.symbol}${convertedPrice.toFixed(2)}`;
  };

  const getDashboardTitle = () => {
    switch(dashboardType) {
      case 'impact': return 'Impact Tokens Dashboard';
      case 'quant': return 'Quant Strategies Dashboard';
      case 'portfolio': return 'Portfolio Tokens Dashboard';
      default: return 'Community Tokens Dashboard';
    }
  };

  const getBackgroundStyle = () => {
    switch(dashboardType) {
      case 'impact': 
        return isDarkMode 
          ? 'bg-slate-900' 
          : 'bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50';
      case 'quant':
        return isDarkMode 
          ? 'bg-slate-900'
          : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50';
      case 'portfolio':
        return isDarkMode 
          ? 'bg-slate-900'
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50';
      default:
        return isDarkMode 
          ? 'bg-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
    }
  };

  if (authLoading || dataLoading) {
    return (
      <LoadingScreen 
        message={`Loading your ${getDashboardTitle().toLowerCase()}...`}
        subMessage={`Please wait while we prepare your experience`}
        size="md"
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className={`fixed inset-0 ${getBackgroundStyle()}`} />
      
      <div className={`relative z-10 min-h-screen ${isDarkMode 
        ? 'bg-slate-900' 
        : 'bg-white/98'
      }`}>
        <DashboardNavigation 
          userProfile={userProfile} 
          onSignOut={handleSignOut}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
        
        <header className={`border-b ${isDarkMode 
          ? 'border-slate-700 bg-slate-800' 
          : 'border-slate-200/50 bg-white/50'
        } backdrop-blur-sm`}>
          <div className="w-full px-4 py-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-6">
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                  Dashboard
                </h1>
                
                {/* Dashboard Type Toggle - Fixed position */}
                <div className={`flex items-center space-x-0 p-1 rounded-lg ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
                } min-w-fit`}>
                  <Button
                    variant={dashboardType === 'community' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDashboardType('community')}
                    className={`px-3 py-2 min-w-[90px] ${dashboardType === 'community' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : isDarkMode ? 'text-slate-300 hover:bg-slate-600' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🪙 Community
                  </Button>
                  <Button
                    variant={dashboardType === 'impact' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDashboardType('impact')}
                    className={`px-3 py-2 min-w-[80px] ${dashboardType === 'impact' 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600' 
                      : isDarkMode ? 'text-slate-300 hover:bg-slate-600' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🌱 Impact
                  </Button>
                  <Button
                    variant={dashboardType === 'quant' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDashboardType('quant')}
                    className={`px-3 py-2 min-w-[80px] ${dashboardType === 'quant' 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600' 
                      : isDarkMode ? 'text-slate-300 hover:bg-slate-600' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ⚡ Quant
                  </Button>
                  <Button
                    variant={dashboardType === 'portfolio' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDashboardType('portfolio')}
                    className={`px-3 py-2 min-w-[90px] ${dashboardType === 'portfolio' 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600' 
                      : isDarkMode ? 'text-slate-300 hover:bg-slate-600' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    📊 Portfolio
                  </Button>
                </div>
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

        <main className="w-full px-4 py-4">
          {dashboardType === 'community' ? (
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className={`grid w-full grid-cols-8 ${isDarkMode 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
              }`}>
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Performance</TabsTrigger>
                <TabsTrigger value="holdings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">My Holdings</TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Activity</TabsTrigger>
                <TabsTrigger value="governance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Governance</TabsTrigger>
                <TabsTrigger value="engage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Engage</TabsTrigger>
                <TabsTrigger value="tokenomics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Tokenomics</TabsTrigger>
                <TabsTrigger value="contract" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Contract</TabsTrigger>
              </TabsList>

              {/* Community Token Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200'} backdrop-blur-sm`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl relative">
                          {mockTokenData.logo}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <CardTitle className={`text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent`}>
                            {mockTokenData.name} ({mockTokenData.ticker})
                          </CardTitle>
                          <p className={`text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} font-medium`}>
                            {mockTokenData.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                        {mockTokenData.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-blue-50/80 border border-blue-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Launch Date</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.launchDate}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-cyan-50/80 border border-cyan-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Users className="w-5 h-5 text-cyan-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>Community Size</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.communitySize.toLocaleString()}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-purple-50/80 border border-purple-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-purple-400 to-indigo-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Vote className="w-5 h-5 text-purple-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Governance Power</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.governancePower}%
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-green-50/80 border border-green-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-green-400 to-emerald-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Current Price</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {formatPrice(mockTokenData.currentPrice, selectedCurrency)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Market Cap
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {formatPrice(mockTokenData.marketCap, selectedCurrency)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        24h Volume
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {formatPrice(mockTokenData.volume24h, selectedCurrency)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        7d Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-green-500">
                        +{mockTokenData.growth7d}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Community Momentum
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-blue-500">High</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* My Holdings Tab */}
              <TabsContent value="holdings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : 'text-slate-900'}>Your Balance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Available</span>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.userBalance} {mockTokenData.ticker}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Staked</span>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.stakedAmount} {mockTokenData.ticker}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Claimable Rewards</span>
                        <span className="font-bold text-green-500">
                          {mockTokenData.claimableRewards} {mockTokenData.ticker}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : 'text-slate-900'}>Governance Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Votes Participated</span>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.votesParticipated}
                        </span>
                      </div>
                      <Button className="w-full" variant="outline">
                        Claim Rewards
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Feed Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <Activity className="w-5 h-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { type: 'proposal', title: 'New Community Initiative Proposal', time: '2 hours ago' },
                      { type: 'vote', title: 'Vote completed: Community Event Funding', time: '1 day ago' },
                      { type: 'reward', title: 'Weekly rewards distributed', time: '3 days ago' },
                      { type: 'collab', title: 'Partnership announcement with Local Business', time: '1 week ago' }
                    ].map((activity, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {activity.title}
                          </h4>
                          <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Governance Tab */}
              <TabsContent value="governance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Vote className="w-5 h-5" />
                        <span>Active Proposals</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { title: 'Community Event Budget Allocation', votes: 156, timeLeft: '5 days' },
                        { title: 'New Member Benefits Program', votes: 89, timeLeft: '2 weeks' }
                      ].map((proposal, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                          <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {proposal.title}
                          </h4>
                          <div className="flex justify-between text-sm">
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                              {proposal.votes} votes
                            </span>
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                              {proposal.timeLeft} left
                            </span>
                          </div>
                          <Button className="w-full mt-3" size="sm">Vote Now</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : 'text-slate-900'}>Create Proposal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Submit New Proposal
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Engage Tab */}
              <TabsContent value="engage" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={`text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                        Community Posts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">Join Discussion</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={`text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Target className="w-8 h-8 mx-auto mb-2" />
                        Tasks & Bounties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">View Tasks</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={`text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Award className="w-8 h-8 mx-auto mb-2" />
                        Quests & XP
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">View Quests</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                    <CardHeader>
                      <CardTitle className={`text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Zap className="w-8 h-8 mx-auto mb-2" />
                        Submit Ideas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">Share Ideas</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tokenomics Tab */}
              <TabsContent value="tokenomics" className="space-y-6">
                <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                  <CardHeader>
                    <CardTitle className={isDarkMode ? 'text-white' : 'text-slate-900'}>Tokenomics Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Minting Process</h4>
                        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                          Tokens are minted based on community participation, contributions, and time invested in community activities.
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Backing Assets</h4>
                        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                          Backed by community value, member engagement metrics, and verified contributions.
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Supply Cap</h4>
                        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                          Dynamic supply based on community growth with sustainable inflation model.
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Distribution</h4>
                        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                          Fair distribution through participation rewards, governance incentives, and community milestones.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Smart Contract Tab */}
              <TabsContent value="contract" className="space-y-6">
                <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <Settings className="w-5 h-5" />
                      <span>Smart Contract Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          Contract Address
                        </label>
                        <p className={`font-mono text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          0x1234...5678
                        </p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          Blockchain
                        </label>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Ethereum
                        </p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          Audit Status
                        </label>
                        <Badge variant="default" className="bg-green-500/20 text-green-600 border-green-500/30">
                          Verified
                        </Badge>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          Trust Level
                        </label>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          High
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Explorer
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : dashboardType === 'impact' ? (
            /* IMPACT TOKENS DASHBOARD - FUTURISTIC UI */
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className={`grid w-full grid-cols-9 ${isDarkMode 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200'
              }`}>
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="impact-metrics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Impact</TabsTrigger>
                <TabsTrigger value="token-stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Stats</TabsTrigger>
                <TabsTrigger value="participation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">My Impact</TabsTrigger>
                <TabsTrigger value="live-feed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Live Feed</TabsTrigger>
                <TabsTrigger value="missions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Missions</TabsTrigger>
                <TabsTrigger value="impact-governance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Governance</TabsTrigger>
                <TabsTrigger value="impact-tokenomics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Tokenomics</TabsTrigger>
                <TabsTrigger value="integrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Integrations</TabsTrigger>
              </TabsList>

              {/* Impact Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-emerald-50/80 border-emerald-200'} backdrop-blur-sm`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl relative">
                          {mockImpactData.logo}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <CardTitle className={`text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent`}>
                            {mockImpactData.name} ({mockImpactData.ticker})
                          </CardTitle>
                          <p className={`text-lg ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'} font-medium`}>
                            {mockImpactData.mission}
                          </p>
                          <Badge variant="outline" className="mt-2 border-emerald-500/50 text-emerald-600 bg-emerald-500/10">
                            <Leaf className="w-3 h-3 mr-1" />
                            {mockImpactData.theme}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="default" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
                          {mockImpactData.launchStatus}
                        </Badge>
                        <Badge variant="outline" className="block text-center border-blue-500/50 text-blue-600 bg-blue-500/10">
                          {mockImpactData.sdgTag}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-emerald-50/80 border border-emerald-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Globe className="w-5 h-5 text-emerald-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>Total Impact</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockImpactData.totalImpact}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-cyan-50/80 border border-cyan-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <CheckCircle className="w-5 h-5 text-cyan-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>Verified Actions</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockImpactData.verifiedActions}%
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-blue-50/80 border border-blue-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Shield className="w-5 h-5 text-blue-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Partners</span>
                        </div>
                        <div className="space-y-1">
                          {mockImpactData.partners.map((partner, index) => (
                            <p key={index} className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                              {partner}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Impact Metrics Tab */}
              <TabsContent value="impact-metrics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-green-50/80 border-green-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium flex items-center space-x-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                        <Leaf className="w-4 h-4" />
                        <span>Environmental Impact</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-green-500 mb-2">1,200 kg</p>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>CO₂ Offset This Month</p>
                      <div className="mt-3 h-2 bg-green-500/20 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium flex items-center space-x-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        <Heart className="w-4 h-4" />
                        <span>Community Health</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-blue-500 mb-2">10,000</p>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Hours of Fitness Logged</p>
                      <div className="mt-3 h-2 bg-blue-500/20 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full w-4/5"></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-purple-50/80 border-purple-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium flex items-center space-x-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                        <BookOpen className="w-4 h-4" />
                        <span>Education Impact</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-purple-500 mb-2">500</p>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Learning Hours Completed</p>
                      <div className="mt-3 h-2 bg-purple-500/20 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Token Stats Tab */}
              <TabsContent value="token-stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Current Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {formatPrice(mockImpactData.currentValue, selectedCurrency)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Total Supply
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {mockImpactData.totalSupply.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Circulating Supply
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {mockImpactData.circulatingSupply.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Burn Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-orange-500">2.5%</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* My Participation Tab */}
              <TabsContent value="participation" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-emerald-50/80 border-emerald-200'} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Trophy className="w-5 h-5 text-emerald-500" />
                        <span>Your Impact Profile</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Holdings</span>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockImpactData.userHoldings} {mockImpactData.ticker}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Missions Completed</span>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockImpactData.missionsCompleted}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Impact Score</span>
                        <span className="font-bold text-emerald-500">
                          {mockImpactData.impactScore} XP
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Claimable Rewards</span>
                        <span className="font-bold text-cyan-500">
                          {mockImpactData.claimableRewards} {mockImpactData.ticker}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span>Contribution Timeline</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { action: 'Completed 5km run', tokens: '5 ECO', time: '2 hours ago' },
                          { action: 'Uploaded recycling proof', tokens: '3 ECO', time: '1 day ago' },
                          { action: 'Learned about sustainability', tokens: '2 ECO', time: '3 days ago' }
                        ].map((activity, index) => (
                          <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="flex justify-between items-center">
                              <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {activity.action}
                              </span>
                              <span className="text-sm text-emerald-500 font-medium">
                                +{activity.tokens}
                              </span>
                            </div>
                            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {activity.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Live Impact Feed Tab */}
              <TabsContent value="live-feed" className="space-y-6">
                <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <Activity className="w-5 h-5 text-emerald-500" />
                      <span>Live Impact Feed</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { user: 'Alex', action: 'walked 7km', reward: '7 EcoCoins', icon: Dumbbell, time: 'Just now' },
                      { user: 'Community', action: 'offset 200kg CO₂', reward: '200 EcoCoins', icon: Leaf, time: '5 min ago' },
                      { user: 'Sarah', action: 'completed learning module', reward: '15 EcoCoins', icon: BookOpen, time: '10 min ago' },
                      { user: 'Team Green', action: 'planted 150 trees', reward: '1500 EcoCoins', icon: Globe, time: '30 min ago' }
                    ].map((feed, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50/50'} relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-full"></div>
                        <div className="flex items-center space-x-3">
                          <feed.icon className="w-5 h-5 text-emerald-500" />
                          <div className="flex-1">
                            <p className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              <span className="font-medium text-emerald-500">{feed.user}</span> {feed.action}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm font-medium text-cyan-500">
                                +{feed.reward}
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {feed.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tasks/Missions Tab */}
              <TabsContent value="missions" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: 'Daily Steps Challenge',
                      description: 'Walk 10,000 steps today',
                      reward: '10 ECO',
                      progress: 65,
                      icon: Dumbbell,
                      difficulty: 'Easy',
                      type: 'fitness'
                    },
                    {
                      title: 'Sustainability Quiz',
                      description: 'Complete the climate action quiz',
                      reward: '25 ECO',
                      progress: 0,
                      icon: BookOpen,
                      difficulty: 'Medium',
                      type: 'education'
                    },
                    {
                      title: 'Recycling Upload',
                      description: 'Upload proof of recycling activity',
                      reward: '15 ECO',
                      progress: 100,
                      icon: Camera,
                      difficulty: 'Easy',
                      type: 'environment'
                    }
                  ].map((mission, index) => (
                    <Card key={index} className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-emerald-50/80 border-emerald-200'} backdrop-blur-sm hover:scale-105 transition-transform duration-200`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <mission.icon className="w-5 h-5 text-emerald-500" />
                            <Badge variant="outline" className={`text-xs ${
                              mission.difficulty === 'Easy' ? 'border-green-500/50 text-green-600 bg-green-500/10' :
                              mission.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-600 bg-yellow-500/10' :
                              'border-red-500/50 text-red-600 bg-red-500/10'
                            }`}>
                              {mission.difficulty}
                            </Badge>
                          </div>
                          <Badge variant="default" className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs">
                            +{mission.reward}
                          </Badge>
                        </div>
                        <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mission.title}
                        </CardTitle>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {mission.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>Progress</span>
                            <span className="font-medium">{mission.progress}%</span>
                          </div>
                          <div className="h-2 bg-emerald-500/20 rounded-full">
                            <div 
                              className="h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full transition-all duration-300"
                              style={{ width: `${mission.progress}%` }}
                            ></div>
                          </div>
                          <Button 
                            className={`w-full ${mission.progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600' : ''}`}
                            variant={mission.progress === 100 ? 'default' : 'outline'}
                          >
                            {mission.progress === 100 ? 'Claim Reward' : 'Start Mission'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Impact Governance Tab */}
              <TabsContent value="impact-governance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <Vote className="w-5 h-5 text-emerald-500" />
                        <span>Active Impact Proposals</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { title: 'Fund Solar Panel Installation', votes: 245, timeLeft: '3 days', type: 'environment' },
                        { title: 'Community Fitness Program', votes: 189, timeLeft: '1 week', type: 'health' }
                      ].map((proposal, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50/50'}`}>
                          <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {proposal.title}
                          </h4>
                          <div className="flex justify-between text-sm mb-3">
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                              {proposal.votes} votes
                            </span>
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                              {proposal.timeLeft} left
                            </span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white" size="sm">
                            Vote Now
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Create Impact Proposal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white" variant="default">
                        <FileText className="w-4 h-4 mr-2" />
                        Submit Impact Proposal
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <Leaf className="w-4 h-4 mr-1" />
                          Environment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4 mr-1" />
                          Health
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookOpen className="w-4 h-4 mr-1" />
                          Education
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="w-4 h-4 mr-1" />
                          Community
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Impact Tokenomics Tab */}
              <TabsContent value="impact-tokenomics" className="space-y-6">
                <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm`}>
                  <CardHeader>
                    <CardTitle className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Impact Tokenomics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-emerald-50/80 border border-emerald-200'}`}>
                        <h4 className={`font-medium mb-3 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          <Zap className="w-4 h-4 text-emerald-500" />
                          <span>Minting Rules</span>
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {mockImpactData.mintingRule}
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-orange-900/30 border border-orange-500/30' : 'bg-orange-50/80 border border-orange-200'}`}>
                        <h4 className={`font-medium mb-3 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span>Burn Mechanism</span>
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {mockImpactData.burnTrigger}
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30 border border-blue-500/30' : 'bg-blue-50/80 border border-blue-200'}`}>
                        <h4 className={`font-medium mb-3 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          <span>Conversion Rate</span>
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {mockImpactData.conversionRate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* External Integrations Tab */}
              <TabsContent value="integrations" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Apple Health', type: 'Fitness Tracking', status: 'Connected', icon: Heart },
                    { name: 'Strava', type: 'Activity Tracking', status: 'Connected', icon: Dumbbell },
                    { name: 'Carbon API', type: 'Environmental Data', status: 'Connected', icon: Leaf },
                    { name: 'Learning Platform', type: 'Education Tracking', status: 'Not Connected', icon: BookOpen },
                    { name: 'GPS Verification', type: 'Location Proof', status: 'Connected', icon: MapPin },
                    { name: 'Photo Verification', type: 'Visual Proof', status: 'Connected', icon: Camera }
                  ].map((integration, index) => (
                    <Card key={index} className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} backdrop-blur-sm hover:scale-105 transition-transform duration-200`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <integration.icon className="w-6 h-6 text-emerald-500" />
                          <Badge 
                            variant={integration.status === 'Connected' ? 'default' : 'secondary'}
                            className={integration.status === 'Connected' 
                              ? 'bg-green-500/20 text-green-600 border-green-500/30' 
                              : 'bg-gray-500/20 text-gray-600 border-gray-500/30'
                            }
                          >
                            {integration.status}
                          </Badge>
                        </div>
                        <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {integration.name}
                        </CardTitle>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {integration.type}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className={`w-full ${integration.status === 'Connected' ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600'}`}
                          variant="default"
                        >
                          {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : dashboardType === 'quant' ? (
            /* QUANT STRATEGIES DASHBOARD */
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className={`grid w-full grid-cols-8 ${isDarkMode 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200'
              }`}>
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Performance</TabsTrigger>
                <TabsTrigger value="holdings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">My Investment</TabsTrigger>
                <TabsTrigger value="strategies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Strategies</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Analytics</TabsTrigger>
                <TabsTrigger value="risk" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Risk</TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Settings</TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Reports</TabsTrigger>
              </TabsList>

              {/* Quant Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-purple-50/80 border-purple-200'} backdrop-blur-sm`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl relative">
                          {mockQuantData.logo}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <CardTitle className={`text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent`}>
                            {mockQuantData.name} ({mockQuantData.ticker})
                          </CardTitle>
                          <p className={`text-lg ${isDarkMode ? 'text-purple-300' : 'text-purple-700'} font-medium`}>
                            {mockQuantData.strategy}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
                        {mockQuantData.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-purple-50/80 border border-purple-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-purple-400 to-indigo-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <DollarSign className="w-5 h-5 text-purple-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>AUM</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {formatPrice(mockQuantData.aum, selectedCurrency)}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-indigo-50/80 border border-indigo-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-indigo-400 to-blue-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <TrendingUp className="w-5 h-5 text-indigo-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>30d Performance</span>
                        </div>
                        <p className="text-2xl font-bold text-green-500">+{mockQuantData.performance30d}%</p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-blue-50/80 border border-blue-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Activity className="w-5 h-5 text-blue-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Sharpe Ratio</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockQuantData.sharpeRatio}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-red-50/80 border border-red-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-red-400 to-pink-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>Max Drawdown</span>
                        </div>
                        <p className="text-2xl font-bold text-red-500">{mockQuantData.maxDrawdown}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Investment Holdings Tab */}
              <TabsContent value="holdings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-purple-50/80 border-purple-200'} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                        <Trophy className="w-5 h-5 text-purple-500" />
                        <span>Your Investment</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Total Investment</span>
                        <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                          {formatPrice(mockQuantData.userInvestment, selectedCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Unrealized P&L</span>
                        <span className="font-bold text-green-500">
                          +{formatPrice(mockQuantData.unrealizedPnL, selectedCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Allocated Assets</span>
                        <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                          {mockQuantData.allocatedAssets}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Risk Score</span>
                        <span className="font-bold text-orange-500">
                          {mockQuantData.riskScore}/10
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            /* PORTFOLIO TOKENS DASHBOARD */
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className={`grid w-full grid-cols-8 ${isDarkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200'
              }`}>
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="composition" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Composition</TabsTrigger>
                <TabsTrigger value="holdings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">My Holdings</TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Performance</TabsTrigger>
                <TabsTrigger value="dividends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Dividends</TabsTrigger>
                <TabsTrigger value="rebalancing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Rebalancing</TabsTrigger>
                <TabsTrigger value="fees" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Fees</TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white">Analytics</TabsTrigger>
              </TabsList>

              {/* Portfolio Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-orange-50/80 border-orange-200'} backdrop-blur-sm`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl relative">
                          {mockPortfolioData.logo}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <CardTitle className={`text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent`}>
                            {mockPortfolioData.name} ({mockPortfolioData.ticker})
                          </CardTitle>
                          <p className={`text-lg ${isDarkMode ? 'text-orange-300' : 'text-orange-700'} font-medium`}>
                            {mockPortfolioData.composition}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                        {mockPortfolioData.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-orange-50/80 border border-orange-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-orange-400 to-amber-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <DollarSign className="w-5 h-5 text-orange-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>NAV</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {formatPrice(mockPortfolioData.netAssetValue, selectedCurrency)}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-amber-50/80 border border-amber-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-amber-400 to-yellow-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <TrendingUp className="w-5 h-5 text-amber-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>30d Yield</span>
                        </div>
                        <p className="text-2xl font-bold text-green-500">+{mockPortfolioData.yield30d}%</p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-yellow-50/80 border border-yellow-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Users className="w-5 h-5 text-yellow-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Total Assets</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockPortfolioData.assets}
                        </p>
                      </div>
                      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-red-50/80 border border-red-200'} relative overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 ${isDarkMode ? 'bg-slate-600/50' : 'bg-gradient-to-br from-red-400 to-pink-400 opacity-20'} rounded-bl-full`}></div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Settings className="w-5 h-5 text-red-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>Management Fee</span>
                        </div>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{mockPortfolioData.fee}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Portfolio Holdings Tab */}
              <TabsContent value="holdings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-white/80 to-orange-50/80 border-orange-200'} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                        <Trophy className="w-5 h-5 text-orange-500" />
                        <span>Your Portfolio</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Holdings</span>
                        <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                          {mockPortfolioData.userHoldings} {mockPortfolioData.ticker}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Dividend Earned</span>
                        <span className="font-bold text-green-500">
                          {formatPrice(mockPortfolioData.dividendEarned, selectedCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Total Assets</span>
                        <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                          {mockPortfolioData.assets}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Rebalance Frequency</span>
                        <span className="font-bold text-orange-500">
                          {mockPortfolioData.rebalanceFreq}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
}