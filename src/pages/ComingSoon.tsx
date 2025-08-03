import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Smartphone, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const ComingSoon = () => {
  const isMobile = useIsMobile();

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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/community-tokens">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Monitor className="mr-2 h-5 w-5" />
                  Use Desktop Version
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" size="lg">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              What to Expect in Our Mobile App
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building a powerful mobile experience with all the features you love from our desktop platform
            </p>
          </div>

          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Native Mobile UI</h3>
                <p className="text-gray-600">
                  Optimized mobile interface designed specifically for touch interactions and smaller screens
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Feature Set</h3>
                <p className="text-gray-600">
                  Access all community token features, trading, and portfolio management on the go
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Push Notifications</h3>
                <p className="text-gray-600">
                  Stay updated with real-time alerts for market changes and community activities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Platform Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`font-bold text-white mb-6 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Meanwhile, Explore Our Desktop Platform
          </h2>
          <p className={`text-blue-100 mb-8 max-w-2xl mx-auto ${isMobile ? 'text-base' : 'text-lg'}`}>
            Don't wait! Our full-featured desktop platform is ready to use with all the tokenization and community features you need.
          </p>
          <Link to="/community-tokens">
            <Button variant="secondary" size="lg" className="text-lg px-8">
              Get Started on Desktop
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComingSoon;