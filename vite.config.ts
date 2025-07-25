// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Read Vercel's internal ENV vars during build
  const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const VERCEL_ENV = process.env.VERCEL_ENV || mode; // Fallback to Vite's mode if VERCEL_ENV isn't set (e.g., local non-Vercel build)

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
    define: {
      // Injecting all necessary ENV vars into the client bundle
      'process.env.VITE_VERCEL_URL': JSON.stringify(VERCEL_URL),
      'process.env.VERCEL_ENV': JSON.stringify(VERCEL_ENV), // <--- NEW ADDITION
      'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_APP_SUPABASE_URL),
      'process.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_APP_SUPABASE_ANON_KEY),
    },
  };
});