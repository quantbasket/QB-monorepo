import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Award, BarChart3, Gift } from 'lucide-react';
import { PortfolioSummary } from '@/services/dashboardService';

interface DashboardOverviewProps {
  portfolioSummary: PortfolioSummary | null;
  isDarkMode: boolean;
  selectedCurrency: string;
  formatPrice: (price: number, currency: string) => string;
  onTabChange: (tab: string) => void;
}

export default function DashboardOverview({ 
  portfolioSummary, 
  isDarkMode, 
  selectedCurrency, 
  formatPrice, 
  onTabChange 
}: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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
        
        <Card className={`${isDarkMode 
          ? 'bg-slate-800/70 border-slate-700/50' 
          : 'bg-slate-100/80 border-slate-300/50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Community Tokens</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {portfolioSummary?.totalCommunityTokens || 0}
                </p>
              </div>
              <Users className={`w-8 h-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${isDarkMode 
          ? 'bg-slate-800/70 border-slate-700/50' 
          : 'bg-slate-100/80 border-slate-300/50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Impact Score</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {portfolioSummary?.impactScore || 0}
                </p>
              </div>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${isDarkMode 
          ? 'bg-slate-800/70 border-slate-700/50' 
          : 'bg-slate-100/80 border-slate-300/50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Active Strategies</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {portfolioSummary?.activeStrategies || 0}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className={`${isDarkMode 
        ? 'bg-slate-800/70 border-slate-700/50 shadow-lg' 
        : 'bg-slate-100/80 border-slate-300/50'
      }`}>
        <CardContent className="p-6">
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className={`h-20 flex-col ${
                isDarkMode 
                  ? 'border-slate-600 bg-slate-700/70 text-slate-100 hover:bg-slate-600/70' 
                  : 'border-slate-400 bg-slate-200/60 text-slate-800 hover:bg-slate-300/60'
              }`}
              onClick={() => onTabChange('trading')}
            >
              <TrendingUp className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              Buy Tokens
            </Button>
            <Button 
              variant="outline" 
              className={`h-20 flex-col ${
                isDarkMode 
                  ? 'border-slate-600 bg-slate-700/70 text-slate-100 hover:bg-slate-600/70' 
                  : 'border-slate-400 bg-slate-200/60 text-slate-800 hover:bg-slate-300/60'
              }`}
              onClick={() => onTabChange('trading')}
            >
              <TrendingDown className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              Sell Tokens
            </Button>
            <Button 
              variant="outline" 
              className={`h-20 flex-col ${
                isDarkMode 
                  ? 'border-slate-600 bg-slate-700/70 text-slate-100 hover:bg-slate-600/70' 
                  : 'border-slate-400 bg-slate-200/60 text-slate-800 hover:bg-slate-300/60'
              }`}
              onClick={() => onTabChange('community')}
            >
              <Gift className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              Claim Rewards
            </Button>
            <Button 
              variant="outline" 
              className={`h-20 flex-col ${
                isDarkMode 
                  ? 'border-slate-600 bg-slate-700/70 text-slate-100 hover:bg-slate-600/70' 
                  : 'border-slate-400 bg-slate-200/60 text-slate-800 hover:bg-slate-300/60'
              }`}
              onClick={() => onTabChange('impact')}
            >
              <Award className={`w-6 h-6 mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              Report Impact
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}