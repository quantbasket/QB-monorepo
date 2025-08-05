// vite.config.prod.ts - High Performance Production Configuration
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }: { mode: string }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  // Environment variables
  const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  const VERCEL_ENV = process.env.VERCEL_ENV || mode;

  return {
    // Server configuration for development
    server: {
      host: "0.0.0.0",
      port: 8080,
      strictPort: false,
      hmr: {
        overlay: true,
        port: 24678,
      },
      fs: {
        allow: ["../.."],
      },
    },

    // High-performance plugins
    plugins: [
      react({
        fastRefresh: isDev,
      }),
    ],

    // Path resolution
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@quantbasket/ui": path.resolve(__dirname, "../../packages/ui/src"),
        "@quantbasket/supabase-client": path.resolve(__dirname, "../../packages/supabase-client/src"),
      },
    },

    // Dependency optimization
    optimizeDeps: {
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
      ],
      exclude: isDev ? [
        '@sentry/react',
        'posthog-js',
        '@vercel/speed-insights'
      ] : [],
    },

    // ESBuild configuration
    esbuild: {
      target: 'es2020',
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      drop: isProd ? ['console', 'debugger'] : [],
      minify: isProd,
      keepNames: isDev,
    },

    // Build configuration
    build: {
      target: 'es2020',
      sourcemap: isProd,
      minify: isProd ? 'terser' : false,
      
      rollupOptions: {
        output: {
          // Advanced chunk splitting for optimal caching
          manualChunks: {
            'react-core': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'state-management': ['@tanstack/react-query'],
            'ui-framework': ['lucide-react'],
            'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
            'date-utils': ['date-fns', 'react-day-picker'],
            'charts': ['recharts'],
            'ui-components': ['cmdk', 'sonner', 'vaul', 'embla-carousel-react'],
            'analytics': ['@sentry/react', 'posthog-js', '@vercel/speed-insights'],
            'icons': ['react-icons'],
          },
          
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
    },

    // Environment variables
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_VERCEL_URL': JSON.stringify(VERCEL_URL),
      'process.env.VERCEL_ENV': JSON.stringify(VERCEL_ENV),
      'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_APP_SUPABASE_URL),
      'process.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_APP_SUPABASE_ANON_KEY),
    },

    worker: {
      format: 'es',
    },

    preview: {
      port: 8080,
      host: "0.0.0.0",
    },
  };
});
