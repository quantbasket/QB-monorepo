import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Smartphone, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const AppComingSoon = () => {
  const isMobile = useIsMobile();

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
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className={`font-bold text-gray-900 mb-6 ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              Mobile App Coming Soon!
            </h1>
            
            <p className={`text-gray-600 mb-8 leading-relaxed ${isMobile ? 'text-lg px-2' : 'text-xl'}`}>
              Our application is currently available through Desktop or PC. We're working hard to bring you an amazing mobile experience very soon!
            </p>

            <div className="flex items-center justify-center space-x-6 mb-12">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">Desktop Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 font-medium">Mobile Coming Soon</span>
              </div>
            </div>

            <div className="text-center mb-12">
              <p className="text-gray-600 mb-6">
                While we work on the mobile app, you can access the full platform on your desktop or laptop computer.
              </p>
              
              {/* No clickable desktop link - just information */}
              <div className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 rounded-lg">
                <Monitor className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Use Desktop Version</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              What to Expect in Our Mobile App
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building a comprehensive mobile experience with all the features you love from our desktop platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Optimized Mobile Interface
                </h3>
                <p className="text-gray-600 text-sm">
                  Optimized mobile interface designed specifically for touch interactions and smaller screens
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Full Feature Set
                </h3>
                <p className="text-gray-600 text-sm">
                  Access all platform features including trading, analytics, and portfolio management on the go
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Real-time Updates
                </h3>
                <p className="text-gray-600 text-sm">
                  Stay connected with push notifications and real-time market data wherever you are
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Need Help or Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions about our platform or upcoming mobile app.
          </p>
          
          <Link to="/support">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleEmailSupport}>
              Contact Support
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppComingSoon;
