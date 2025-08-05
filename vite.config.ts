// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer"; // <-- 1. Import the visualizer
// import { componentTagger } from "lovable-tagger"; // Commented out as not available
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  // Read Vercel's internal ENV vars during build
  const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const VERCEL_ENV = process.env.VERCEL_ENV || mode; // Fallback to Vite's mode if VERCEL_ENV isn't set

  return {
    root: "./apps/web",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      
      // <-- 2. Add the visualizer plugin
      visualizer({
        open: true, // Automatically opens the report in your browser after build
        filename: 'bundle-report.html', // Name of the report file
      }),

      // mode === 'development' &&
      // componentTagger(), // Commented out as not available

      // Add the Sentry plugin only for production builds
      process.env.NODE_ENV === 'production' && sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "quantbasket",
        project: "javascript-react",
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./apps/web/src"),
        "@quantbasket/ui": path.resolve(__dirname, "./packages/ui/src"),
        "@quantbasket/supabase-client": path.resolve(__dirname, "./packages/supabase-client/src"),
      },
    },
    // Sentry requires sourcemaps to be enabled for processing errors
    build: {
      sourcemap: true,
      outDir: "../../dist",
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