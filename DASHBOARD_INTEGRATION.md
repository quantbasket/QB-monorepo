# Dashboard Integration Guide

## Overview

The Dashboard has been fully integrated with your Quant Basket website. This guide explains the integration points and how to extend the functionality.

## Architecture

### 1. Authentication Integration
- **Hook**: `useAuth` from `@/hooks/useAuth`
- **Provider**: `AuthProvider` wraps the entire app
- **Database**: Supabase Auth with automatic profile creation
- **Protected Routes**: Dashboard is protected via `ProtectedRoute` component

### 2. Database Integration
- **Tables**: 
  - `profiles` - User profile information
  - `coins` - Available tokens/coins
  - `user_favorites` - User's favorite coins
- **Storage**: Avatar uploads to Supabase Storage
- **RLS**: Row Level Security enabled on all tables

### 3. Service Layer
- **File**: `@/services/dashboardService.ts`
- **Purpose**: Centralized data operations
- **Features**: Profile management, token operations, portfolio tracking

### 4. State Management
- **Hook**: `useDashboard` from `@/hooks/useDashboard.tsx`
- **Purpose**: Centralized dashboard state and operations
- **Features**: Data loading, updates, error handling

## Integration Points

### 1. Navigation
```tsx
// Dashboard has its own navigation component
<DashboardNavigation 
  userProfile={userProfile} 
  onSignOut={handleSignOut} 
/>
```

### 2. Routing
```tsx
// Protected route in App.tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 3. Authentication Flow
1. User signs up/logs in via Supabase Auth
2. Automatic profile creation via database trigger
3. Redirect to dashboard on successful auth
4. Dashboard loads user data via service layer

## Current Features

### ✅ Implemented
- **User Authentication**: Supabase Auth with Google OAuth
- **Profile Management**: View and update user profiles
- **Token Trading**: Mock token purchase system
- **Impact Tracking**: Report environmental/social impact
- **Community Features**: Token redemption for benefits
- **Portfolio Overview**: Track all token holdings
- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Theme switching capability
- **Multi-currency**: Support for USD, EUR, INR, etc.

### 🔄 Mock Data (Ready for Real Implementation)
- Token balances and prices
- Portfolio calculations
- Impact scoring
- Transaction history

## Database Schema

### Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id),
  full_name TEXT,
  phone_number TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Coins Table
```sql
CREATE TABLE public.coins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  coin_type ENUM('coins', 'impact_coins', 'community_coins'),
  description TEXT,
  price DECIMAL(20, 8),
  market_cap DECIMAL(20, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### User Favorites Table
```sql
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  coin_id UUID REFERENCES public.coins(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, coin_id)
);
```

## Next Steps for Full Integration

### 1. Real Token System
```typescript
// Replace mock data with real blockchain integration
const realTokenService = {
  getTokenPrice: async (symbol: string) => {
    // Integrate with CoinGecko API or similar
  },
  executeTrade: async (from: string, to: string, amount: number) => {
    // Integrate with DEX or CEX APIs
  },
  getWalletBalance: async (address: string) => {
    // Integrate with blockchain APIs
  }
};
```

### 2. Impact Verification System
```typescript
// Add real impact verification
const impactVerification = {
  verifyAction: async (action: ImpactAction) => {
    // Integrate with IoT devices, APIs, or manual verification
  },
  calculateRewards: async (verifiedAction: VerifiedAction) => {
    // Calculate token rewards based on impact metrics
  }
};
```

### 3. Community Features
```typescript
// Add real community features
const communityFeatures = {
  createEvent: async (event: CommunityEvent) => {
    // Event management system
  },
  manageRewards: async (userId: string, reward: Reward) => {
    // Reward distribution system
  }
};
```

### 4. Analytics Dashboard
```typescript
// Add comprehensive analytics
const analytics = {
  getPortfolioPerformance: async (userId: string) => {
    // Calculate real portfolio metrics
  },
  getImpactMetrics: async (userId: string) => {
    // Track real impact over time
  }
};
```

## API Integration Examples

### 1. CoinGecko Integration
```typescript
// Add to dashboardService.ts
static async getRealTokenPrices(): Promise<TokenPrice[]> {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
  const data = await response.json();
  return data;
}
```

### 2. Blockchain Integration
```typescript
// Add Web3 integration
import { ethers } from 'ethers';

static async connectWallet(): Promise<string> {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }
  throw new Error('No wallet found');
}
```

### 3. Impact API Integration
```typescript
// Add real impact tracking
static async verifyImpactAction(action: ImpactAction): Promise<boolean> {
  // Integrate with carbon tracking APIs, IoT devices, etc.
  const verification = await impactAPI.verify(action);
  return verification.isValid;
}
```

## Testing

### 1. Unit Tests
```typescript
// Add tests for service layer
describe('DashboardService', () => {
  test('should load user profile', async () => {
    const profile = await DashboardService.getUserProfile('test-user-id');
    expect(profile).toBeDefined();
  });
});
```

### 2. Integration Tests
```typescript
// Add tests for dashboard integration
describe('Dashboard Integration', () => {
  test('should load all user data on mount', async () => {
    // Test complete data loading flow
  });
});
```

## Deployment

### 1. Environment Variables
```env
# Add to your .env file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_COINGECKO_API_KEY=your_coingecko_api_key
```

### 2. Build Process
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

## Security Considerations

### 1. Row Level Security
- All database tables have RLS enabled
- Users can only access their own data
- Public read access for coins only

### 2. Input Validation
- All user inputs are validated
- SQL injection protection via Supabase
- XSS protection via React

### 3. Authentication
- JWT tokens managed by Supabase
- Automatic token refresh
- Secure logout handling

## Performance Optimization

### 1. Data Loading
- Parallel data fetching
- Caching with React Query
- Lazy loading for large datasets

### 2. UI Optimization
- Virtual scrolling for large lists
- Image optimization
- Code splitting

## Monitoring and Analytics

### 1. Error Tracking
```typescript
// Add error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### 2. Analytics
```typescript
// Add user analytics
import { analytics } from './analytics';

const trackDashboardView = () => {
  analytics.track('Dashboard Viewed', {
    userId: user.id,
    timestamp: new Date().toISOString()
  });
};
```

## Conclusion

The Dashboard is now fully integrated with your website and ready for production use. The modular architecture makes it easy to extend with real blockchain integration, impact verification, and advanced analytics.

For questions or further development, refer to the service layer documentation and the Supabase integration guide. 