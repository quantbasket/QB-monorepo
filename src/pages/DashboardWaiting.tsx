import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail, TrendingUp, Bot, PieChart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DashboardWaiting = () => {
  const { user } = useAuth();
  
  // Extract user data from Supabase user object
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || 'user@example.com';

  const handleEmailSupport = () => {
    window.location.href = 'mailto:support@quantbasket.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="font-bold text-gray-900 mb-6 text-3xl md:text-5xl">
              Welcome, {userName}! You're All Set.
            </h1>
            
            <p className="text-gray-600 mb-10 leading-relaxed text-lg md:text-xl px-2">
              Thank you for signing up for QuantBasket. Your account has been successfully created. We're putting the final touches on your dashboard and will notify you as soon as it's ready.
            </p>

            <div className="text-center mb-12">
              <p className="text-gray-600 mb-4">
                A confirmation email will be sent to:
              </p>
              
              <div className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 rounded-lg">
                <Mail className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-900 mb-4 text-2xl md:text-3xl">
              What's Coming to Your Dashboard
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building a powerful platform to help you with your investment strategies. Here's a sneak peek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Advanced Trading Analytics
                </h3>
                <p className="text-gray-600 text-sm">
                  Dive deep into market data with our powerful charting and analysis tools.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Automated Strategy Builder
                </h3>
                <p className="text-gray-600 text-sm">
                  Create, backtest, and deploy your own automated trading strategies with ease.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Portfolio Tracking
                </h3>
                <p className="text-gray-600 text-sm">
                  Get a comprehensive, real-time overview of all your assets and performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-gray-900 mb-4 text-2xl md:text-3xl">
            Need Help or Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions about the platform or your new account.
          </p>
          
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleEmailSupport}>
            Contact Support
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DashboardWaiting;
