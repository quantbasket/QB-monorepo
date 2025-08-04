import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Coins, BarChart3, Shield, ArrowRight, Download, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import communityTokenizationImg from "@/assets/community-tokenization.jpg";
import quantStrategiesImg from "@/assets/quant-strategies.jpg";
import impactMarketplaceImg from "@/assets/impact-marketplace.jpg";

const Index = () => {
  const isMobile = useIsMobile();

  const handleDownloadApp = () => {
    // Link to coming soon page instead of app stores
    window.location.href = '/coming-soon';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
                Engineered Portfolios.
                <span className="text-qb-green block">Decentralized Access.</span>
              </h1>
              <p className="text-lg sm:text-xl mb-6 lg:mb-8 text-gray-200 px-2 sm:px-0">
                Launch your community token today! Create community-driven tokens that reward impactful actions.
                <span className="block text-base sm:text-lg text-qb-green mt-2">Additional features like ETFs and quant strategies coming soon.</span>
              </p>
              
              {/* Mobile App Download Buttons */}
              {isMobile ? (
                <div className="flex flex-col space-y-3 px-4">
                  <Button 
                    variant="qbSecondary" 
                    size="lg" 
                    className="text-lg px-8 w-full justify-center"
                    onClick={handleDownloadApp}
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download for iOS
                  </Button>
                  <Button 
                    variant="qbGlass" 
                    size="lg" 
                    className="text-lg px-8 w-full justify-center text-white border-white hover:!bg-white/60 hover:!text-qb-navy hover:!border-white"
                    onClick={handleDownloadApp}
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download for Android
                  </Button>
                  <div className="flex items-center justify-center mt-4 text-white/80">
                    <Smartphone className="w-4 h-4 mr-2" />
                    <span className="text-sm">Get the full experience on mobile</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button variant="qbSecondary" size="lg" className="text-lg px-8">
                      Start Your Journey
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="qbGlass" size="lg" className="text-lg px-8 text-white border-white hover:!bg-white/60 hover:!text-qb-navy hover:!border-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Prominent Basket Logo Display */}
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card p-6 sm:p-8 lg:p-12 max-w-sm lg:max-w-md">
                <img 
                  src="/qb_sticker.webp" 
                  alt="Quant Basket Platform" 
                  className="w-full h-auto transform scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community-Based Tokenization Section */}
      <section className="section-gradient py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-qb-navy mb-4 lg:mb-6">
                Community Coins & Tokenization
              </h2>
              <p className="text-base sm:text-lg text-qb-dark-gray mb-6 px-2 sm:px-0">
                Create and participate in community currencies that reward impactful actions. Earn tokens for contributing 
                to community goals, participate in governance, and build wealth through collective success.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:mb-8">
                <Card className="glass-card">
                  <CardContent className={`p-4 ${isMobile ? 'flex items-center space-x-3' : ''}`}>
                    <Users className={`w-8 h-8 text-qb-green mb-2 ${isMobile ? 'mb-0 flex-shrink-0' : 'mx-auto sm:mx-0'}`} />
                    <div className={isMobile ? 'flex-1' : ''}>
                      <h3 className={`font-semibold text-qb-navy ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>Community Governance</h3>
                      <p className={`text-sm text-qb-dark-gray ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>Democratic decision-making for all token holders</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className={`p-4 ${isMobile ? 'flex items-center space-x-3' : ''}`}>
                    <Shield className={`w-8 h-8 text-qb-blue mb-2 ${isMobile ? 'mb-0 flex-shrink-0' : 'mx-auto sm:mx-0'}`} />
                    <div className={isMobile ? 'flex-1' : ''}>
                      <h3 className={`font-semibold text-qb-navy ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>Secure & Transparent</h3>
                      <p className={`text-sm text-qb-dark-gray ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>Blockchain-powered security and full transparency</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center lg:text-left">
                <Link to="/community-tokens">
                  <Button variant="qbPrimary" className="text-lg px-8 w-full sm:w-auto">
                    {isMobile ? "Get Started" : "Get Started with Community Tokens"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img 
                src={communityTokenizationImg} 
                alt="Community Tokenization" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Strategies Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`${isMobile ? 'order-first' : 'order-last lg:order-first'}`}>
              <img 
                src={quantStrategiesImg} 
                alt="Quantitative Strategies" 
                className="w-full h-auto rounded-xl shadow-lg opacity-60"
              />
            </div>
            <div className={`text-center lg:text-left ${isMobile ? 'order-last' : ''}`}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-qb-navy text-center lg:text-left">
                  Tokenized ETFs & Quant Strategies
                </h2>
                <span className="bg-qb-blue/20 text-qb-blue px-3 py-1 rounded-full text-sm font-medium">Planned</span>
              </div>
              <p className="text-base sm:text-lg text-qb-dark-gray mb-6 px-2 sm:px-0">
                Future feature: Invest in tokenized ETFs backed by real shares and commodities. Our financial engineers will create 
                sophisticated mathematical models and algorithmic strategies for optimal returns.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-center sm:text-left">
                  <BarChart3 className="w-6 h-6 text-qb-green mt-1 mx-auto sm:mx-0 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-qb-navy">Advanced Analytics</h3>
                    <p className="text-qb-dark-gray">Real-time risk assessment and portfolio optimization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-center sm:text-left">
                  <TrendingUp className="w-6 h-6 text-qb-blue mt-1 mx-auto sm:mx-0 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-qb-navy">Algorithmic Trading</h3>
                    <p className="text-qb-dark-gray">Automated execution of complex trading strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Marketplace Section */}
      <section className="section-gradient py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-qb-navy">Impact Marketplace</h2>
                <span className="bg-qb-green/20 text-qb-green px-3 py-1 rounded-full text-sm font-medium">Coming Soon</span>
              </div>
              <p className="text-base sm:text-lg text-qb-dark-gray mb-6 px-2 sm:px-0">
                Future expansion: A marketplace for impact-driven projects and ESG-compliant investments. Start with community tokens now and access the broader ecosystem as we expand.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardContent className={`p-4 ${isMobile ? 'flex items-center space-x-3' : ''}`}>
                    <Coins className={`w-8 h-8 text-qb-green mb-2 ${isMobile ? 'mb-0 flex-shrink-0' : 'mx-auto sm:mx-0'}`} />
                    <div className={isMobile ? 'flex-1' : ''}>
                      <h3 className={`font-semibold text-qb-navy ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>ESG Compliance</h3>
                      <p className={`text-sm text-qb-dark-gray ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>All projects meet strict environmental and social criteria</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className={`p-4 ${isMobile ? 'flex items-center space-x-3' : ''}`}>
                    <TrendingUp className={`w-8 h-8 text-qb-blue mb-2 ${isMobile ? 'mb-0 flex-shrink-0' : 'mx-auto sm:mx-0'}`} />
                    <div className={isMobile ? 'flex-1' : ''}>
                      <h3 className={`font-semibold text-qb-navy ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>Measurable Impact</h3>
                      <p className={`text-sm text-qb-dark-gray ${isMobile ? 'text-left' : 'text-center sm:text-left'}`}>Track real-world outcomes and financial returns</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img 
                src={impactMarketplaceImg} 
                alt="Impact Marketplace" 
                className="w-full h-auto rounded-xl shadow-lg opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview - Hidden on Mobile */}
      {!isMobile && (
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-qb-navy mb-8 lg:mb-12">
              Everything You Need for Modern Finance
            </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="glass-card hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Community Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">Participate in decentralized communities and governance</p>
                {isMobile ? (
                  <Button 
                    variant="qbOutline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleDownloadApp}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Get App
                  </Button>
                ) : (
                  <Link to="/community-tokens">
                    <Button variant="qbOutline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-xl transition-all duration-300 opacity-60">
              <CardHeader>
                <Coins className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <div className="text-center">
                  <CardTitle className="text-qb-navy mb-2">Impact Coins</CardTitle>
                  <span className="bg-qb-green/20 text-qb-green px-2 py-1 rounded text-xs">Coming Soon</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Invest in sustainable and socially responsible projects</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-xl transition-all duration-300 opacity-60">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <div className="text-center">
                  <CardTitle className="text-qb-navy mb-2">Quant Strategies</CardTitle>
                  <span className="bg-qb-blue/20 text-qb-blue px-2 py-1 rounded text-xs">Planned</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Access advanced algorithmic trading strategies</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-xl transition-all duration-300 opacity-60">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <div className="text-center">
                  <CardTitle className="text-qb-navy mb-2">Tokenized Portfolios</CardTitle>
                  <span className="bg-qb-blue/20 text-qb-blue px-2 py-1 rounded text-xs">Planned</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Diversified portfolios powered by financial engineering</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="hero-gradient py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
            Ready to Revolutionize Your Portfolio?
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-6 lg:mb-8 px-2 sm:px-0">
            {isMobile 
              ? "Download our mobile app and access all features on the go."
              : "Start with Community Tokens today and be part of our growing ecosystem as we launch new features."
            }
          </p>
          
          {isMobile ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                variant="qbPrimary" 
                size="lg" 
                className="text-lg px-8 w-full sm:w-auto"
                onClick={handleDownloadApp}
              >
                <Download className="mr-2 w-5 h-5" />
                iOS App
              </Button>
              <Button 
                variant="qbSecondary" 
                size="lg" 
                className="text-lg px-8 w-full sm:w-auto"
                onClick={handleDownloadApp}
              >
                <Download className="mr-2 w-5 h-5" />
                Android App
              </Button>
            </div>
          ) : (
            <Link to="/signup">
              <Button variant="qbPrimary" size="lg" className="text-lg px-12">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;