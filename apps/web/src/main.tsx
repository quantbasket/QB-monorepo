// src/main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as Sentry from '@sentry/react';

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // This sets the sample rate for session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Set the environment based on Vite's mode
  environment: import.meta.env.DEV ? 'development' : 'production',
  // As requested, this option sends default PII data like IP addresses.
  sendDefaultPii: true, //
});

const container = document.getElementById('root');
const root = createRoot(container!); // Use non-null assertion
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);