import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, BarChart3, TrendingUp, Shield, Zap, Globe, ArrowRight, Download, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = () => {
  const isMobile = useIsMobile();

  const handleDownloadApp = () => {
    // Link to coming soon page instead of app stores
    window.location.href = '/coming-soon';
  };
  const products = [
    {
      title: "Community Tokens",
      icon: Users,
      description: "Create and trade community currencies that reward meaningful actions aligned with community goals and values.",
      features: [
        "Reward-based token distribution",
        "Community goal alignment",
        "Democratic governance voting",
        "Impact-driven economics",
        "Collective wealth building"
      ],
      badge: "Available Now",
      color: "qb-green",
      available: true
    },
    {
      title: "Impact Coins",
      icon: Globe,
      description: "Future feature: Sustainable investment tokens backed by ESG-compliant projects and impact metrics.",
      features: [
        "ESG compliance tracking",
        "Impact measurement",
        "Sustainable returns",
        "Social responsibility",
        "Environmental benefits"
      ],
      badge: "Coming Soon",
      color: "qb-blue",
      available: false
    },
    {
      title: "Quant Strategies",
      icon: BarChart3,
      description: "Planned feature: Mathematical trading strategies with advanced model implementations and algorithmic systems.",
      features: [
        "Mathematically backed models",
        "Algorithmic execution",
        "Risk optimization",
        "Quantitative analysis",
        "Professional strategies"
      ],
      badge: "Planned",
      color: "qb-green",
      available: false
    },
    {
      title: "Tokenized Portfolios",
      icon: TrendingUp,
      description: "Future expansion: Community-created portfolios combining multiple assets and strategies into tradeable token baskets.",
      features: [
        "Multi-asset baskets",
        "Strategy combination",
        "Transparent composition",
        "Community management",
        "Diversified exposure"
      ],
      badge: "Planned",
      color: "qb-blue",
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
            {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`font-bold text-gray-900 mb-6 ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              Revolutionary Trading Solutions
            </h1>
            <p className={`text-gray-600 mb-8 leading-relaxed ${isMobile ? 'text-lg px-2' : 'text-xl'}`}>
              Experience the future of algorithmic trading with our cutting-edge products designed for traders of all levels
            </p>
            {isMobile ? (
              <div className="flex justify-center">
                <Button 
                  onClick={handleDownloadApp}
                  size="lg" 
                  className="w-full max-w-xs bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download App
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleDownloadApp}
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download for iOS
                </Button>
                <Button 
                  onClick={handleDownloadApp}
                  size="lg" 
                  variant="outline"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download for Android
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {products.map((product, index) => (
              <Card key={index} className={`glass-card hover:shadow-xl transition-all duration-300 ${!product.available ? 'opacity-70' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${product.color}/20 rounded-lg flex items-center justify-center`}>
                      <product.icon className={`w-6 h-6 text-${product.color}`} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        product.available ? "bg-qb-green/20 text-qb-green" : 
                        product.badge === "Coming Soon" ? "bg-qb-green/20 text-qb-green" :
                        "bg-qb-blue/20 text-qb-blue"
                      }
                    >
                      {product.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-qb-navy">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-qb-dark-gray">{product.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-qb-navy mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-qb-green" />
                          <span className="text-sm text-qb-dark-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    {isMobile ? (
                      product.available ? (
                        <Link to="/community-tokens" className="w-full">
                          <Button variant="qbPrimary" className="w-full">
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          variant="qbSecondary" 
                          className="w-full"
                          disabled={true}
                        >
                          Coming Soon
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )
                    ) : (
                      product.available && product.title === "Community Tokens" ? (
                        <Link to="/community-tokens" className="w-full">
                          <Button variant="qbPrimary" className="w-full">
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          variant={product.available ? "qbPrimary" : "qbSecondary"} 
                          className="w-full"
                          disabled={!product.available}
                        >
                          {product.available ? "Get Started" : "Coming Soon"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`font-bold text-qb-navy mb-6 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Platform Features</h2>
            <p className={`text-qb-dark-gray ${isMobile ? 'text-base px-2' : 'text-lg'}`}>
              Advanced capabilities that power all our products
            </p>
          </div>
          
          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <Card className="glass-card text-center">
              <CardHeader>
                <Zap className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Monitor performance, risk metrics, and market data in real-time 
                  with our advanced analytics dashboard.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Bank-grade Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Multi-layered security protocols including smart contract audits, 
                  cold storage, and institutional-grade encryption.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Participate in governance decisions and shape the future 
                  of the platform through democratic voting mechanisms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack - Hidden on Mobile */}
      {!isMobile && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-qb-navy mb-6">Built on Cutting-Edge Technology</h2>
              <p className="text-lg text-qb-dark-gray">
                Our platform leverages the latest advances in blockchain, AI, and quantitative finance
              </p>
            </div>
            
            <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-qb-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-qb-green">ETH</span>
                </div>
                <h3 className="font-semibold text-qb-navy">Ethereum</h3>
                <p className="text-sm text-qb-dark-gray">Smart contracts</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-qb-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-qb-blue">AI</span>
                </div>
                <h3 className="font-semibold text-qb-navy">Machine Learning</h3>
                <p className="text-sm text-qb-dark-gray">Predictive models</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-qb-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-qb-green">Q</span>
                </div>
                <h3 className="font-semibold text-qb-navy">Quantitative</h3>
                <p className="text-sm text-qb-dark-gray">Financial models</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-qb-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-qb-blue">API</span>
                </div>
                <h3 className="font-semibold text-qb-navy">Integration</h3>
                <p className="text-sm text-qb-dark-gray">Third-party tools</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className={`font-bold text-white mb-6 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
            Ready to Explore Our Products?
          </h2>
          <p className={`text-gray-200 mb-8 ${isMobile ? 'text-lg px-2' : 'text-xl'}`}>
            Start with Community Tokens and be part of our ecosystem as we expand with new features.
          </p>
          {isMobile ? (
            <div className="space-y-3">
              <Link to="/community-tokens" className="block">
                <Button variant="qbPrimary" size="lg" className="text-lg px-12 w-full">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/learn" className="block">
                <Button variant="outline" size="lg" className="text-lg px-12 w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent transition-all duration-200">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/community-tokens">
              <Button variant="qbPrimary" size="lg" className="text-lg px-12">
                Get Started Now
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

export default Products;