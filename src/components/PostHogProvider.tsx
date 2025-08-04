// src/components/PostHogProvider.tsx
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This logic runs once when the module is first imported.
if (typeof window !== 'undefined') {
  // Using a single PostHog key for all environments.
  const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  // Ensure the key exists before initializing.
  if (posthogKey && host) {
    posthog.init(posthogKey, {
      api_host: host,
    });
  }
}

/**
 * This component handles capturing page_view events when the route changes.
 */
const PostHogPageviewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views when the route changes
    posthog.capture('$pageview');
  }, [location]);

  return null; // This component does not render anything
};


/**
 * This is the main provider component. It provides the PostHog client
 * and includes the page view tracker.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <Provider client={posthog}>
      {children}
      <PostHogPageviewTracker />
    </Provider>
  );
}