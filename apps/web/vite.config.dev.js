// vite.config.dev.js - High Performance Development Configuration
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // High-performance dev server configuration
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    open: false,
    hmr: {
      overlay: true,
      port: 24678, // Custom HMR port to avoid conflicts
    },
    // Enable CORS for cross-origin requests
    cors: true,
    // Optimize dev server performance
    fs: {
      // Allow serving files from monorepo root
      allow: ["../.."],
    },
  },

  // High-performance plugins
  plugins: [
    react({
      // Enable Fast Refresh for development
      fastRefresh: true,
    }),
  ],

  // Path resolution for monorepo
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@quantbasket/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@quantbasket/supabase-client": path.resolve(__dirname, "../../packages/supabase-client/src"),
    },
  },

  // Aggressive dependency optimization for faster dev startup
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev startup
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'date-fns',
      'zod',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'cmdk',
      'sonner',
      'vaul',
      'embla-carousel-react',
      'react-day-picker',
      'input-otp',
      'react-resizable-panels',
      'react-icons',
      'recharts',
      'next-themes',
      'class-variance-authority',
      'tailwindcss-animate'
    ],
    // Exclude heavy analytics libraries for faster dev startup
    exclude: [
      '@sentry/react',
      'posthog-js',
      '@vercel/speed-insights'
    ],
    // Force re-optimization on dependency changes
    force: false,
  },

  // Fast ESBuild configuration for development
  esbuild: {
    target: 'esnext',
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Faster builds in development
    minify: false,
    keepNames: true,
  },

  // CSS optimization
  css: {
    devSourcemap: true,
    // PostCSS configuration for Tailwind
    postcss: {
      plugins: [],
    },
  },

  // Build configuration (when running build with this config)
  build: {
    target: 'esnext',
    sourcemap: 'inline',
    // Faster builds for development
    minify: false,
    rollupOptions: {
      output: {
        // Chunk splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot'],
          'query': ['@tanstack/react-query'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          'date': ['date-fns', 'react-day-picker'],
          'charts': ['recharts'],
          'ui-components': ['cmdk', 'sonner', 'vaul', 'embla-carousel-react'],
        },
      },
    },
    // Don't warn about large chunks in development
    chunkSizeWarningLimit: 2000,
  },

  // Environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_APP_SUPABASE_URL),
    'process.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_APP_SUPABASE_ANON_KEY),
  },

  // Worker configuration for better performance
  worker: {
    format: 'es',
  },
});