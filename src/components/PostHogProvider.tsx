// src/components/PostHogProvider.tsx
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
import { ReactNode } from 'react';

// Initialize PostHog
if (typeof window !== 'undefined') {
  const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      // Disables PostHog tracking in development
      loaded: (posthog) => {
        if (import.meta.env.DEV) posthog.opt_out_capturing();
      },
    });
  }
}

// Create a provider component
export function PostHogProvider({ children }: { children: ReactNode }) {
  return <Provider client={posthog}>{children}</Provider>;
}