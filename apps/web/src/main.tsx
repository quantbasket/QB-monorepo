// src/main.tsx - Performance Optimized Entry Point

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance monitoring and analytics utilities
import { startPerformanceMonitoring } from './utils/performanceMonitor';

// Lazy load analytics to improve initial bundle size
const initializeAnalytics = async () => {
  // Only load Sentry in production
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    const { init, browserTracingIntegration, replayIntegration } = await import('@sentry/react');
    
    init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        browserTracingIntegration(),
        replayIntegration(),
      ],
      tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // Reduce in production
      replaysSessionSampleRate: 0.01, // Very low sample rate for performance
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.DEV ? 'development' : 'production',
      sendDefaultPii: true,
      beforeSend(event) {
        // Filter out development errors
        if (import.meta.env.DEV) {
          return null;
        }
        return event;
      },
    });
  }

  // Initialize PostHog for analytics (lazy loaded)
  if (import.meta.env.VITE_POSTHOG_KEY) {
    const { default: posthog } = await import('posthog-js');
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      // Performance optimizations
      loaded: (posthog) => {
        if (import.meta.env.DEV) posthog.debug();
      },
      capture_pageview: false, // We'll handle this manually for better performance
      disable_session_recording: import.meta.env.DEV, // Disable in development
    });
  }

  // Initialize Vercel Speed Insights (production only)
  if (import.meta.env.PROD) {
    const { inject } = await import('@vercel/speed-insights');
    inject();
  }
};

// Register service worker for caching (production only)
const registerServiceWorker = async () => {
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

// Main application initialization
const initializeApp = async () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container not found');
  }

  const root = createRoot(container);
  
  // Render app immediately for better perceived performance
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Initialize analytics after app renders (non-blocking)
  setTimeout(async () => {
    await Promise.all([
      initializeAnalytics(),
      registerServiceWorker(),
      startPerformanceMonitoring(),
    ]);
  }, 100); // Small delay to ensure initial render completes
};

// Start the application
initializeApp().catch(console.error);