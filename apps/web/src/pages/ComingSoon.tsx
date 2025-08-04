import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ArrowRight, CheckCircle, Zap, Target, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title = "Coming Soon!",
  subtitle = "We're working hard to bring you this exciting new feature. Stay tuned for updates!"
}) => {
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
                <Clock className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className={`font-bold text-gray-900 mb-6 ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              {title}
            </h1>
            
            <p className={`text-gray-600 mb-8 leading-relaxed ${isMobile ? 'text-lg px-2' : 'text-xl'}`}>
              {subtitle}
            </p>

            <div className="flex items-center justify-center space-x-6 mb-12">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">In Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 font-medium">Coming Soon</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/community-tokens">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Target className="mr-2 h-5 w-5" />
                  Explore Community Tokens
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/support">
                <Button variant="outline" size="lg" onClick={handleEmailSupport}>
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              What We're Building
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This feature is being carefully crafted to provide you with the best possible experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Powerful Features
                </h3>
                <p className="text-gray-600 text-sm">
                  Advanced functionality designed to meet your specific needs and requirements
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  User-Friendly Design
                </h3>
                <p className="text-gray-600 text-sm">
                  Intuitive interface that makes complex operations simple and accessible
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Seamless Integration
                </h3>
                <p className="text-gray-600 text-sm">
                  Works perfectly with our existing platform and your current workflow
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`font-bold text-white mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            Stay Updated
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Be the first to know when this feature becomes available. Follow our updates or contact support for more information.
          </p>
          
          <Link to="/support">
            <Button size="lg" variant="secondary" onClick={handleEmailSupport}>
              Contact Support
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComingSoon;
