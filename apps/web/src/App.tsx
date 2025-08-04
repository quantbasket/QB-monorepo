// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import CommunityTokens from "./pages/CommunityTokens";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Learn from "./pages/Learn";
import Resources from "./pages/Resources";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardWaiting from "./pages/DashboardWaiting";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ComingSoon from "./pages/ComingSoon";
import AppComingSoon from "./pages/AppComingSoon";
import { useEffect } from "react";
// 1. Import BOTH the provider and the new page view tracker
import { PostHogProvider, PostHogPageviewTracker } from "./components/PostHogProvider";

const queryClient = new QueryClient();

// Your ProtectedRoute component remains the same...
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return <div>Loading authentication...</div>;
  }
  return user ? <>{children}</> : null;
};

// Your AppContent component remains the same...
const AppContent = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      const currentPath = location.pathname;
      if (!user) {
        if (currentPath === '/dashboard') {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);

  useEffect(() => {
    const GA_MEASUREMENT_ID = 'G-10RC2R4BER';
    if (import.meta.env.PROD && GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, []);


  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/community-tokens" element={<CommunityTokens />} />
        <Route path="/pricing" element={<Pricing />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/resources" element={<Resources />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/coming-soon" element={<AppComingSoon />} />

        <Route
          path="/impact-coins"
          element={
            <ComingSoon
              title="Impact Coins: Coming Soon!"
              subtitle="Impact isn't just a word. It's a token. Launching soon."
            />
          }
        />
        <Route
          path="/quant-strategies"
          element={
            <ComingSoon
              title="Quant Strategies: Coming Soon!"
              subtitle="Code. Data. Alpha. Quant tokens drop soon."
            />
          }
        />
        <Route
          path="/tokenized-portfolios"
          element={
            <ComingSoon
              title="Tokenized Portfolios: Coming Soon!"
              subtitle="Coming soon: Diversified alpha, tokenized and tradable."
            />
          }
        />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardWaiting />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};


// The main App component structure
const App = () => (
  <PostHogProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            {/* 2. Place the tracker INSIDE the router */}
            <PostHogPageviewTracker />
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </PostHogProvider>
);

export default App;