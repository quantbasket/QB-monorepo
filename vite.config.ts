// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  // Read Vercel's internal ENV vars during build
  const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const VERCEL_ENV = process.env.VERCEL_ENV || mode; // Fallback to Vite's mode if VERCEL_ENV isn't set

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(), // Preserved your existing plugin

      // Add the Sentry plugin only for production builds
      process.env.NODE_ENV === 'production' && sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "quantbasket",
        project: "javascript-react",
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Sentry requires sourcemaps to be enabled for processing errors
    build: {
      sourcemap: true,
    },
    define: {
      // This block is preserved from your original config
      'process.env.VITE_VERCEL_URL': JSON.stringify(VERCEL_URL),
      'process.env.VERCEL_ENV': JSON.stringify(VERCEL_ENV),
      'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_APP_SUPABASE_URL),
      'process.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_APP_SUPABASE_ANON_KEY),
    },
  };
});