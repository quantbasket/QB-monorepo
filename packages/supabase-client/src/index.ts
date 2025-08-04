import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://kmhzexwkhqfxgicawqle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttaHpleHdraHFmeGdpY2F3cWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNTQ0NDEsImV4cCI6MjA0MzczMDQ0MX0.Y4XeTVo0nLZL6w_X77kEz8aCIz0Mhbz0B6PEEtwJyhs';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export types and utilities
export type { User, Session, AuthError } from '@supabase/supabase-js';

// Auth helper functions
export const auth = {
  signUp: (email: string, password: string) => 
    supabase.auth.signUp({ email, password }),
  
  signIn: (email: string, password: string) => 
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => 
    supabase.auth.signOut(),
  
  getUser: () => 
    supabase.auth.getUser(),
  
  getSession: () => 
    supabase.auth.getSession(),
  
  onAuthStateChange: (callback: (event: string, session: any) => void) =>
    supabase.auth.onAuthStateChange(callback)
};

// Database helper (can be extended)
export const db = supabase;
