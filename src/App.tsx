import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { DashboardProvider } from "@/hooks/useDashboardContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import CommunityTokens from "./pages/CommunityTokens";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/app/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ComingSoon from "./pages/ComingSoon";
import { useEffect } from "react";

const queryClient = new QueryClient();

// A wrapper component for routes that require authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only act once authentication state is determined and if user is not present
    if (!loading && !user) {
      // If not authenticated, redirect to login page
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [user, loading, navigate, location.pathname]);

  // While loading, show a placeholder. This prevents rendering protected content before auth check.
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // Render children only if user is authenticated.
  // If `user` is null after loading, `null` is returned, letting the useEffect redirect.
  return user ? <>{children}</> : null;
};


const AppContent = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ensure authentication state is determined and stable
    if (!loading) {
      const currentPath = location.pathname;

      // Scenario 2: User is NOT authenticated
      if (!user) {
        // If an unauthenticated user tries to access the dashboard (or other protected route),
        // redirect them to the login page.
        if (currentPath === '/dashboard') {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);


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
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Updated Routes for Coming Soon pages with new subtitles */}
        <Route
          path="/impact-coins"
          element={
            <ComingSoon
              title="Impact Coins: Coming Soon!"
              subtitle="Impact isn’t just a word. It’s a token. Launching soon." // Updated subtitle
            />
          }
        />
        <Route
          path="/quant-strategies"
          element={
            <ComingSoon
              title="Quant Strategies: Coming Soon!"
              subtitle="Code. Data. Alpha. Quant tokens drop soon." // Updated subtitle
            />
          }
        />
        <Route
          path="/tokenized-portfolios"
          element={
            <ComingSoon
              title="Tokenized Portfolios: Coming Soon!"
              subtitle="Coming soon: Diversified alpha, tokenized and tradable." // Updated subtitle
            />
          }
        />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          </ProtectedRoute>
        } />

        {/* This catch-all route should ideally be the very last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};


// The main App component structure, wrapping everything with necessary providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;