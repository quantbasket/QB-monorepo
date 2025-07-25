import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import { AuthProvider, useAuth } from "@/hooks/useAuth"; // Import useAuth
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect } from "react"; // Import useEffect

const queryClient = new QueryClient();

// A wrapper component for routes that require authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only act once authentication state is determined
    if (!loading) {
      if (!user) {
        // If not authenticated, redirect to login page
        // Use `replace: true` to prevent going back to the protected route via browser back button
        navigate('/login', { state: { from: location.pathname }, replace: true });
      }
    }
  }, [user, loading, navigate, location.pathname]);

  // While loading, you might want to show a spinner or a blank screen
  if (loading) {
    return <div>Loading authentication...</div>; // Replace with a proper loading spinner if you have one
  }

  // Render children only if user is authenticated
  return user ? <>{children}</> : null;
};


const AppContent = () => { // Renamed App to AppContent to wrap it in AuthProvider correctly
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) { // Ensure authentication state is determined
      const currentPath = location.pathname;

      // Scenario 1: User is authenticated
      if (user) {
        // If an authenticated user lands on the root, login, or signup page,
        // redirect them to the dashboard.
        if (currentPath === '/' || currentPath === '/login' || currentPath === '/signup') {
          navigate('/dashboard', { replace: true });
        }
        // If they landed directly on /dashboard, /about, etc., they will stay there.
        // The ProtectedRoute handles staying on /dashboard if authenticated.
      } 
      // Scenario 2: User is NOT authenticated
      else {
        // If a non-authenticated user tries to access the dashboard,
        // redirect them to the login page. Add other protected routes here if applicable.
        if (currentPath === '/dashboard') { // Add other protected paths if they should redirect to login
          navigate('/login', { replace: true });
        }
        // Otherwise, they are allowed to be on /, /login, /signup, /about, products, pricing, support, etc.
      }
    }
  }, [user, loading, navigate, location.pathname]);


  return (
    <> {/* Fragment to hold the content */}
      <Toaster />
      <Sonner />
      {/* BrowserRouter is already in main.tsx or will wrap this, so remove it from here if nested */}
      {/* If this AppContent is directly rendered inside BrowserRouter in main.tsx, then Routes are here */}
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

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};


// The main App component structure
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