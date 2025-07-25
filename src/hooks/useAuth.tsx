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
    // Set up auth state listener FIRST
    const { data: { subscription } = { data: { subscription: null } } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
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
    
    // --- DEBUGGING LOGS (KEEP THESE IN FOR NOW) ---
    console.log("Environment Detection Started:");
    console.log("  window.location.hostname:", window.location.hostname);
    console.log("  process.env.VITE_VERCEL_URL (from build config):", process.env.VITE_VERCEL_URL);

    // 1. Check if running on localhost (development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      redirectToUrl = 'http://localhost:8080/dashboard'; 
      console.log("  Resolved Environment: Localhost");
    } 
    // 2. Check for Vercel deployments (previews or production on Vercel's domain)
    // This variable should be correctly set by Vercel's build process via env var config.
    else if (process.env.VITE_VERCEL_URL) {
      // VITE_VERCEL_URL should already contain "https://domain.vercel.app"
      // Ensure no trailing slash on the base URL if it's accidentally added.
      let baseVercelUrl = process.env.VITE_VERCEL_URL;
      if (baseVercelUrl.endsWith('/')) { // Remove trailing slash if it exists
          baseVercelUrl = baseVercelUrl.slice(0, -1);
      }
      redirectToUrl = `${baseVercelUrl}/dashboard`; 
      console.log("  Resolved Environment: Vercel Preview/Deployment");
    } 
    // 3. Fallback for custom production domain (e.g., if not deployed via Vercel or a very specific edge case)
    else {
      redirectToUrl = 'https://quantbasket.com/dashboard'; 
      console.log("  Resolved Environment: Production Fallback");
    }

    console.log("Final redirectToUrl sent to Supabase:", redirectToUrl);
    // ---  END DEBUGGING LOGS  ---

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