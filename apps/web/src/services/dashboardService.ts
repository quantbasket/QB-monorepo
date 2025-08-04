import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

// Types for our dashboard data
export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  username: string | null;
  phone_number: string | null;
  location: string | null;
  country: string | null;
  avatar_url: string | null;
  wallet_connected: boolean | null;
  wallet_address: string | null;
  kyc_status: string | null;
  impact_score: number | null;
  referral_code: string | null;
  last_profile_update: string | null;
  created_at: string;
  updated_at: string;
  kycStatus?: 'pending' | 'verified' | 'rejected';
  referralCode?: string;
  impactScore?: number;
  walletConnected?: boolean;
  walletAddress?: string;
}

export interface UserTokens {
  community: { [key: string]: number };
  portfolio: { [key: string]: number };
  impact: { [key: string]: number };
  quant: { [key: string]: number };
}

export interface PortfolioSummary {
  totalPortfolioValue: number;
  totalCommunityTokens: number;
  totalImpactTokens: number;
  impactScore: number;
  activeStrategies: number;
}

export interface TokenDefinition {
  symbol: string;
  name: string;
  price: number;
  icon: any;
}

// Dashboard Service Class
export class DashboardService {
  // Get user profile
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // Map database fields to interface
      const profile: UserProfile = {
        ...data,
        kycStatus: (data.kyc_status as 'pending' | 'verified' | 'rejected') || 'pending',
        referralCode: data.referral_code || `QB-REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        impactScore: data.impact_score || 0,
        walletConnected: data.wallet_connected || false,
        walletAddress: data.wallet_address || undefined
      };

      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.full_name,
          username: updates.username,
          location: updates.location,
          country: updates.country,
          phone_number: updates.phone_number,
          avatar_url: updates.avatar_url,
          wallet_connected: updates.walletConnected,
          wallet_address: updates.walletAddress,
          kyc_status: updates.kycStatus,
          last_profile_update: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  // Get user tokens (mock data for now)
  static async getUserTokens(userId: string): Promise<UserTokens> {
    // In a real implementation, this would fetch from a user_tokens table
    // For now, returning mock data
    return {
      community: { SAE: 1250, ROTO: 890 },
      portfolio: { PORT1: 12.5, PORT2: 8.7, PORT3: 5.2 },
      impact: { ECO: 45.6, VEG: 23.4, MAKE: 18.9 },
      quant: { STRD: 6.7, ARBT: 9.2, GRID: 4.8 }
    };
  }

  // Get available coins from database
  static async getAvailableCoins(): Promise<Tables<'coins'>[]> {
    try {
      const { data, error } = await supabase
        .from('coins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching coins:', error);
      return [];
    }
  }

  // Get user favorites
  static async getUserFavorites(userId: string): Promise<Tables<'user_favorites'>[]> {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          *,
          coins (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      return [];
    }
  }

  // Add coin to favorites
  static async addToFavorites(userId: string, coinId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: userId,
          coin_id: coinId
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  }

  // Remove coin from favorites
  static async removeFromFavorites(userId: string, coinId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('coin_id', coinId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  }

  // Get portfolio summary (mock data for now)
  static async getPortfolioSummary(userId: string): Promise<PortfolioSummary> {
    // In a real implementation, this would calculate from actual token holdings
    return {
      totalPortfolioValue: 24567.89,
      totalCommunityTokens: 2140,
      totalImpactTokens: 87.9,
      impactScore: 87,
      activeStrategies: 3
    };
  }

  // Upload avatar
  static async uploadAvatar(userId: string, file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  }

  // Mock token purchase (in real implementation, this would interact with blockchain)
  static async purchaseTokens(userId: string, category: string, symbol: string, amount: number): Promise<boolean> {
    // This is a mock implementation
    // In reality, this would:
    // 1. Validate user has sufficient funds
    // 2. Execute blockchain transaction
    // 3. Update user token balances
    // 4. Record transaction history
    
    console.log(`Mock purchase: ${amount} ${symbol} tokens for user ${userId}`);
    return true;
  }

  // Mock impact reporting
  static async reportImpact(userId: string, type: string, description: string): Promise<boolean> {
    // This is a mock implementation
    // In reality, this would:
    // 1. Validate the impact action
    // 2. Calculate rewards
    // 3. Update user impact tokens
    // 4. Record impact history
    
    console.log(`Mock impact report: ${type} - ${description} for user ${userId}`);
    return true;
  }

  // Mock benefit redemption
  static async redeemBenefit(userId: string, benefitType: string, cost: number, token: string): Promise<boolean> {
    // This is a mock implementation
    // In reality, this would:
    // 1. Check user has sufficient tokens
    // 2. Deduct tokens
    // 3. Grant benefit
    // 4. Record redemption
    
    console.log(`Mock redemption: ${benefitType} for ${cost} ${token} tokens by user ${userId}`);
    return true;
  }

  // Get user notification settings
  static async getUserNotifications(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      return data || {
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        marketing_notifications: false
      };
    } catch (error) {
      console.error('Error fetching notification settings:', error);
      return {
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        marketing_notifications: false
      };
    }
  }

  // Update user notification settings
  static async updateUserNotifications(userId: string, settings: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_notifications')
        .upsert({
          user_id: userId,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      return false;
    }
  }
} 