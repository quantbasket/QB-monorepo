// vite.config.ts - High Performance Production Configuration
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
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
        // Use SWC for faster builds
        plugins: [
          ["@swc/plugin-styled-components", {
            displayName: isDev,
            ssr: false,
          }],
        ],
      }),
      
      // Sentry plugin for production error tracking (only in production)
      ...(isProd && process.env.SENTRY_AUTH_TOKEN ? [
        sentryVitePlugin({
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
          sourcemaps: {
            assets: './dist/**',
            ignore: ['node_modules'],
          },
          telemetry: false,
        })
      ] : []),
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

    // CSS optimization
    css: {
      devSourcemap: isDev,
      postcss: {
        plugins: [],
      },
    },

    // Build configuration
    build: {
      target: 'es2020',
      sourcemap: isProd,
      minify: isProd ? 'terser' : false,
      
      // Terser options for aggressive minification in production
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      } : undefined,

      rollupOptions: {
        output: {
          // Advanced chunk splitting for optimal caching
          manualChunks: {
            // Core React dependencies
            'react-core': ['react', 'react-dom'],
            
            // Routing
            'router': ['react-router-dom'],
            
            // State management and data fetching
            'state-management': ['@tanstack/react-query'],
            
            // UI Framework and icons
            'ui-framework': [
              'lucide-react',
              '@radix-ui/react-slot',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-label',
              '@radix-ui/react-popover',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-tooltip',
            ],
            
            // Forms and validation
            'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
            
            // Utilities
            'utils': [
              'clsx',
              'tailwind-merge',
              'class-variance-authority',
              'tailwindcss-animate'
            ],
            
            // Date handling
            'date-utils': ['date-fns', 'react-day-picker'],
            
            // Charts and data visualization
            'charts': ['recharts'],
            
            // UI Components
            'ui-components': [
              'cmdk',
              'sonner',
              'vaul',
              'embla-carousel-react',
              'input-otp',
              'react-resizable-panels',
              'next-themes'
            ],
            
            // Analytics (lazy loaded)
            'analytics': ['@sentry/react', 'posthog-js', '@vercel/speed-insights'],
            
            // Icons
            'icons': ['react-icons'],
          },
          
          // Optimize chunk file names
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') 
              : 'chunk';
            return `assets/js/[name]-[hash].js`;
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.');
            const ext = info?.[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name ?? '')) {
              return 'assets/css/[name]-[hash].[ext]';
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name ?? '')) {
              return 'assets/images/[name]-[hash].[ext]';
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name ?? '')) {
              return 'assets/fonts/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
        },
        
        // External dependencies (if any should be external)
        external: [],
      },
      
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
      
      // Optimize for modern browsers
      cssCodeSplit: true,
      
      // Enable asset inlining for small assets
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

    // Worker configuration
    worker: {
      format: 'es',
    },

    // Preview server configuration
    preview: {
      port: 8080,
      host: "0.0.0.0",
    },
  };
});