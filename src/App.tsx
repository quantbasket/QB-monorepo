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
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/app/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
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


const AppContent = () => { // Renamed App to AppContent to wrap it in AuthProvider correctly
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
      // Note: Removed automatic redirect from "/" for authenticated users
      // Let them stay on the homepage if they want to
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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
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
    <AuthProvider> {/* AuthProvider wraps the content that needs auth context */}
      <TooltipProvider>
        <BrowserRouter> {/* BrowserRouter should wrap the routes */}
          <AppContent /> {/* Render the AppContent with all the routes and logic */}
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;