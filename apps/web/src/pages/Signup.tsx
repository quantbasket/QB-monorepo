import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Users, TrendingUp, Coins, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (error) {
      toast({
        title: "Signup Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Welcome to QuantBasket! Redirecting to your dashboard...",
      });
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Google Signup Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-qb-soft-gray to-white">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Platform benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-qb-navy mb-4">
                Join the Future of Finance
              </h1>
              <p className="text-xl text-qb-dark-gray">
                Discover what you can achieve on our revolutionary platform
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-qb-green/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-qb-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qb-navy">Buy & Sell Tokenized Portfolios</h3>
                  <p className="text-qb-dark-gray">Access professionally managed portfolios backed by quantitative strategies</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-qb-blue/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-qb-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qb-navy">Community Tokens</h3>
                  <p className="text-qb-dark-gray">Participate in community-driven tokenization projects and governance</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-qb-green/20 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-qb-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qb-navy">Impact Coins</h3>
                  <p className="text-qb-dark-gray">Invest in sustainable and socially responsible tokenized assets</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-qb-blue/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-qb-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-qb-navy">Advanced Quant Strategies</h3>
                  <p className="text-qb-dark-gray">Leverage cutting-edge algorithmic strategies designed by financial engineers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup form */}
          <div className="max-w-md mx-auto w-full">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-qb-navy">Create Your Account</CardTitle>
                <CardDescription className="text-qb-dark-gray">
                  Join thousands of users revolutionizing finance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-qb-navy">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="border-qb-dark-gray/30 focus:border-qb-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-qb-navy">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-qb-dark-gray/30 focus:border-qb-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-qb-navy">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="border-qb-dark-gray/30 focus:border-qb-green"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="qbPrimary" 
                    className="w-full" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Sign Up for Free"}
                  </Button>
                </form>

                <div className="relative">
                  <Separator className="my-4" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-2 text-sm text-qb-dark-gray">or</span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleSignup}
                  variant="qbOutline"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {loading ? "Signing up..." : "Continue with Google"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-qb-dark-gray">
                    Already have an account?{" "}
                    <Link to="/login" className="text-qb-green hover:text-qb-green/80 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>

                <p className="text-xs text-center text-qb-dark-gray">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;