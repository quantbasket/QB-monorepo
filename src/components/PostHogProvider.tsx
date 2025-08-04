// src/components/PostHogProvider.tsx
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This initialization logic remains the same
if (typeof window !== 'undefined') {
  const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  if (posthogKey && host) {
    posthog.init(posthogKey, {
      api_host: host,
    });
  }
}

/**
 * This component now stands alone so we can place it inside the Router.
 */
export const PostHogPageviewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    posthog.capture('$pageview');
  }, [location]);

  return null;
};


/**
 * The main provider component no longer includes the page view tracker itself.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  return <Provider client={posthog}>{children}</Provider>;
}