import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Define VITE_VERCEL_URL based on the environment
  const VITE_VERCEL_URL = process.env.VERCEL_URL
                          ? `https://${process.env.VERCEL_URL}` // Vercel provides raw domain, prepend https://
                          : (mode === 'development' ? 'http://localhost:8080' : 'https://quantbasket.com'); 
                          // Fallback for local dev or a default production if not on Vercel

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // --- START OF EXACT CHANGE ---
    define: {
      'process.env.VITE_VERCEL_URL': JSON.stringify(VITE_VERCEL_URL),
      // If you have other VITE_APP_... environment variables from Supabase/Vercel
      // that are still undefined in the browser, you might need to add them here too.
      // For example, if VITE_APP_SUPABASE_URL is undefined:
      // 'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_APP_SUPABASE_URL),
      // 'process.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_APP_SUPABASE_ANON_KEY),
    },
    // ---  END OF EXACT CHANGE  ---
  };
});