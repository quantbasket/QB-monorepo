import { useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { DashboardService, UserProfile, UserTokens, PortfolioSummary } from '@/services/dashboardService';
import { toast } from 'sonner';

export const useDashboard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userTokens, setUserTokens] = useState<UserTokens | null>(null);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  
  const initializedRef = useRef(false);

  // Load all user data - no useCallback to avoid dependency issues
  const loadUserData = async () => {
    if (!user) {
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
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return false;

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
  const purchaseTokens = async (category: string, symbol: string, amount: number) => {
    if (!user) return false;

    try {
      setLoading(true);
      const success = await DashboardService.purchaseTokens(user.id, category, symbol, amount);
      
      if (success) {
        // Reload token data
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
  const reportImpact = async (type: string, description: string) => {
    if (!user) return false;

    try {
      setLoading(true);
      const success = await DashboardService.reportImpact(user.id, type, description);
      
      if (success) {
        // Reload data
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
  const redeemBenefit = async (benefitType: string, cost: number, token: string) => {
    if (!user) return false;

    try {
      setLoading(true);
      const success = await DashboardService.redeemBenefit(user.id, benefitType, cost, token);
      
      if (success) {
        // Reload token data
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

  // Simple useEffect that only runs once when user changes
  useEffect(() => {
    if (user && !initializedRef.current) {
      initializedRef.current = true;
      loadUserData();
    } else if (!user) {
      initializedRef.current = false;
      setUserProfile(null);
      setUserTokens(null);
      setPortfolioSummary(null);
      setDataLoading(false);
    }
  }, [user?.id]);

  return {
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
};