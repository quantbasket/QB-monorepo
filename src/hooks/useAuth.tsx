// useAuth.tsx
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } = { data: { subscription: null } } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    let redirectToUrl;
    
    // --- UPDATED DEBUGGING LOGS (keep for now) ---
    console.log("Environment Detection Started:");
    console.log("  window.location.hostname:", window.location.hostname);
    console.log("  process.env.VITE_VERCEL_URL (from build config):", process.env.VITE_VERCEL_URL);
    // Add this new log
    console.log("  process.env.VERCEL_ENV (from Vercel build config):", process.env.VERCEL_ENV); 

    // 1. Check if running on localhost (development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      redirectToUrl = 'http://localhost:8080/dashboard'; 
      console.log("  Resolved Environment: Localhost");
    } 
    // 2. Check if it's a PRODUCTION deployment on Vercel
    // VERCEL_ENV will be 'production' for your quantbasket.com deployment
    // We explicitly use the custom domain for production
    else if (process.env.VERCEL_ENV === 'production') {
      redirectToUrl = 'https://quantbasket.com/dashboard'; // Your actual production domain
      console.log("  Resolved Environment: Vercel Production Deployment");
    }
    // 3. Check for Vercel PREVIEW deployments (Vercel's generated URLs)
    // VERCEL_ENV will be 'preview' for these
    else if (process.env.VERCEL_ENV === 'preview' && process.env.VITE_VERCEL_URL) {
      // VITE_VERCEL_URL should contain the full URL like https://website-git-main-quantbaskets.vercel.app
      let baseVercelUrl = process.env.VITE_VERCEL_URL;
      if (baseVercelUrl.endsWith('/')) {
          baseVercelUrl = baseVercelUrl.slice(0, -1);
      }
      redirectToUrl = `${baseVercelUrl}/dashboard`; 
      console.log("  Resolved Environment: Vercel Preview Deployment");
    } 
    // 4. Fallback (should ideally not be hit if VERCEL_ENV is always set by Vercel)
    else {
      // This fallback might be hit if VERCEL_ENV is not set or VITE_VERCEL_URL is missing.
      // For robustness, you could use window.location.origin here if quantbasket.com
      // is guaranteed to be the only other possibility.
      redirectToUrl = 'https://quantbasket.com/dashboard'; 
      console.log("  Resolved Environment: Unknown/Production Fallback");
    }

    console.log("Final redirectToUrl sent to Supabase:", redirectToUrl);
    // --- END DEBUGGING LOGS ---

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectToUrl 
      }
    });
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};