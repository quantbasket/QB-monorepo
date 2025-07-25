import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
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

      // Scenario 1: User IS authenticated
      if (user) {
        // If an authenticated user lands on public auth pages (root, login, signup),
        // redirect them directly to the dashboard.
        if (currentPath === '/' || currentPath === '/login' || currentPath === '/signup') {
          navigate('/dashboard', { replace: true });
        }
        // IMPORTANT: If currentPath is already /dashboard (from OAuth redirect),
        // this 'if' condition (currentPath === '/' || ...) will be false,
        // so no further redirection will occur. The user will stay on /dashboard.
      } 
      // Scenario 2: User is NOT authenticated
      else {
        // If an unauthenticated user tries to access the dashboard (or other protected route),
        // redirect them to the login page.
        // This acts as a fallback if ProtectedRoute didn't catch it for some reason,
        // or if a direct URL was typed for a protected route not wrapped by ProtectedRoute.
        if (currentPath === '/dashboard') { // Add other top-level protected paths here if they are not Wrapped by ProtectedRoute
          navigate('/login', { replace: true });
        }
        // For public pages like /, /login, /signup, /about, products, pricing, support,
        // and other unlisted paths, an unauthenticated user will remain on that page.
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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
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