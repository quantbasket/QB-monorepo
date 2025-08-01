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
  Zap
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

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTab, setSelectedTab] = useState('overview');

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

  if (authLoading || dataLoading) {
    return (
      <LoadingScreen 
        message="Loading your community tokens dashboard..."
        subMessage="Please wait while we prepare your community experience"
        size="md"
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className={`fixed inset-0 ${isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`} />
      
      <div className={`relative z-10 min-h-screen ${isDarkMode 
        ? 'bg-slate-900/95' 
        : 'bg-white/95'
      }`}>
        <DashboardNavigation 
          userProfile={userProfile} 
          onSignOut={handleSignOut}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
        
        <header className={`border-b ${isDarkMode 
          ? 'border-slate-700/50 bg-slate-800/50' 
          : 'border-slate-200/50 bg-white/50'
        } backdrop-blur-sm`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Community Tokens Dashboard
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
            <TabsList className={`grid w-full grid-cols-8 ${isDarkMode 
              ? 'bg-slate-800/50' 
              : 'bg-white/50'
            }`}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="holdings">My Holdings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="engage">Engage</TabsTrigger>
              <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
              <TabsTrigger value="contract">Contract</TabsTrigger>
            </TabsList>

            {/* Token Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{mockTokenData.logo}</div>
                      <div>
                        <CardTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {mockTokenData.name} ({mockTokenData.ticker})
                        </CardTitle>
                        <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {mockTokenData.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-500/20 text-green-600 border-green-500/30">
                      {mockTokenData.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Launch Date</span>
                      </div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {mockTokenData.launchDate}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Community Size</span>
                      </div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {mockTokenData.communitySize.toLocaleString()} holders
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Vote className="w-4 h-4 text-purple-500" />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Governance Power</span>
                      </div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {mockTokenData.governancePower}%
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Current Price</span>
                      </div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
              <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                    <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? 'border-slate-700 bg-slate-700/30' : 'border-slate-200 bg-slate-50'}`}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
                
                <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
              <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
              <Card className={isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'}>
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
        </main>
      </div>
    </div>
  );
}