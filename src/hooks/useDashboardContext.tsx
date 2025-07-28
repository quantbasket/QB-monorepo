import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { DashboardService, UserProfile, UserTokens, PortfolioSummary } from '@/services/dashboardService';
import { toast } from 'sonner';

interface DashboardContextType {
  userProfile: UserProfile | null;
  userTokens: UserTokens | null;
  portfolioSummary: PortfolioSummary | null;
  loading: boolean;
  dataLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  purchaseTokens: (category: string, symbol: string, amount: number) => Promise<boolean>;
  reportImpact: (type: string, description: string) => Promise<boolean>;
  redeemBenefit: (benefitType: string, cost: number, token: string) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userTokens, setUserTokens] = useState<UserTokens | null>(null);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  
  // Load all user data
  const loadUserData = async () => {
    if (!user?.id) {
      setUserProfile(null);
      setUserTokens(null);
      setPortfolioSummary(null);
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);
      
      // Load data in parallel
      const [profile, tokens, summary] = await Promise.all([
        DashboardService.getUserProfile(user.id),
        DashboardService.getUserTokens(user.id),
        DashboardService.getPortfolioSummary(user.id)
      ]);

      setUserProfile(profile);
      setUserTokens(tokens);
      setPortfolioSummary(summary);

    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setDataLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      const success = await DashboardService.updateUserProfile(user.id, updates);
      
      if (success) {
        // Reload profile data after update
        const updatedProfile = await DashboardService.getUserProfile(user.id);
        if (updatedProfile) setUserProfile(updatedProfile);
        toast.success('Profile updated successfully!');
        return true;
      } else {
        toast.error('Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Purchase tokens
  const purchaseTokens = async (category: string, symbol: string, amount: number): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      const success = await DashboardService.purchaseTokens(user.id, category, symbol, amount);
      
      if (success) {
        const updatedTokens = await DashboardService.getUserTokens(user.id);
        if (updatedTokens) setUserTokens(updatedTokens);
        toast.success(`Successfully bought ${amount} ${symbol} tokens!`);
        return true;
      } else {
        toast.error('Purchase failed');
        return false;
      }
    } catch (error) {
      console.error('Error purchasing tokens:', error);
      toast.error('Purchase failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Report impact
  const reportImpact = async (type: string, description: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      const success = await DashboardService.reportImpact(user.id, type, description);
      
      if (success) {
        const [updatedTokens, updatedSummary] = await Promise.all([
          DashboardService.getUserTokens(user.id),
          DashboardService.getPortfolioSummary(user.id)
        ]);
        
        if (updatedTokens) setUserTokens(updatedTokens);
        if (updatedSummary) setPortfolioSummary(updatedSummary);
        
        toast.success(`Impact action recorded! +1 ${type.toUpperCase()} tokens`);
        return true;
      } else {
        toast.error('Impact report failed');
        return false;
      }
    } catch (error) {
      console.error('Error reporting impact:', error);
      toast.error('Impact report failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Redeem benefit
  const redeemBenefit = async (benefitType: string, cost: number, token: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      setLoading(true);
      const success = await DashboardService.redeemBenefit(user.id, benefitType, cost, token);
      
      if (success) {
        const updatedTokens = await DashboardService.getUserTokens(user.id);
        if (updatedTokens) setUserTokens(updatedTokens);
        toast.success(`Successfully redeemed ${benefitType}!`);
        return true;
      } else {
        toast.error('Redemption failed');
        return false;
      }
    } catch (error) {
      console.error('Error redeeming benefit:', error);
      toast.error('Redemption failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Refresh all data
  const refreshData = async () => {
    await loadUserData();
  };

  // Load data when user changes
  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user?.id]);

  const contextValue: DashboardContextType = {
    userProfile,
    userTokens,
    portfolioSummary,
    loading,
    dataLoading,
    updateProfile,
    purchaseTokens,
    reportImpact,
    redeemBenefit,
    refreshData
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}