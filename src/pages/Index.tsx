import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Coins, BarChart3, Shield, ArrowRight } from "lucide-react";
import communityTokenizationImg from "@/assets/community-tokenization.jpg";
import quantStrategiesImg from "@/assets/quant-strategies.jpg";
import impactMarketplaceImg from "@/assets/impact-marketplace.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Revolutionary
                <span className="text-qb-green block">Quantitative Finance</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Democratizing advanced financial strategies through community-based tokenization, 
                algorithmic trading, and impact investing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="qbPrimary" size="lg" className="text-lg px-8">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="qbGlass" size="lg" className="text-lg px-8 text-white border-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Prominent Basket Logo Display */}
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card p-8 max-w-sm">
                <img 
                  src="/lovable-uploads/932d8446-fd9e-4617-b567-895fc116a224.png" 
                  alt="Quant Basket Platform" 
                  className="w-full h-auto"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-qb-navy font-semibold text-lg">Quant Basket Platform</h3>
                  <p className="text-qb-dark-gray text-sm">Your gateway to tokenized finance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community-Based Tokenization Section */}
      <section className="section-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-qb-navy mb-6">
                Community-Based Tokenization
              </h2>
              <p className="text-lg text-qb-dark-gray mb-6">
                Experience the power of decentralized finance through our innovative community tokenization platform. 
                Connect with like-minded investors, participate in governance, and build wealth together.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <Users className="w-8 h-8 text-qb-green mb-2" />
                    <h3 className="font-semibold text-qb-navy">Community Governance</h3>
                    <p className="text-sm text-qb-dark-gray">Democratic decision-making for all token holders</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <Shield className="w-8 h-8 text-qb-blue mb-2" />
                    <h3 className="font-semibold text-qb-navy">Secure & Transparent</h3>
                    <p className="text-sm text-qb-dark-gray">Blockchain-powered security and full transparency</p>
                  </CardContent>
                </Card>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={quantStrategiesImg} 
                alt="Quantitative Strategies" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-qb-navy mb-6">
                Portfolios Built on Quantitative Strategies
              </h2>
              <p className="text-lg text-qb-dark-gray mb-6">
                Our financial engineers design sophisticated algorithmic strategies that outperform traditional 
                investment approaches. Access institutional-grade quantitative models previously available only to large funds.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-6 h-6 text-qb-green mt-1" />
                  <div>
                    <h3 className="font-semibold text-qb-navy">Advanced Analytics</h3>
                    <p className="text-qb-dark-gray">Real-time risk assessment and portfolio optimization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-qb-blue mt-1" />
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

      {/* Impact Coins Marketplace Section */}
      <section className="section-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-qb-navy mb-6">
                Impact Coins Marketplace
              </h2>
              <p className="text-lg text-qb-dark-gray mb-6">
                Invest in a sustainable future through our curated marketplace of impact coins. 
                Each token represents real-world projects driving positive environmental and social change.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <Coins className="w-8 h-8 text-qb-green mb-2" />
                    <h3 className="font-semibold text-qb-navy">ESG Compliance</h3>
                    <p className="text-sm text-qb-dark-gray">All projects meet strict environmental and social criteria</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <TrendingUp className="w-8 h-8 text-qb-blue mb-2" />
                    <h3 className="font-semibold text-qb-navy">Measurable Impact</h3>
                    <p className="text-sm text-qb-dark-gray">Track real-world outcomes and financial returns</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img 
                src={impactMarketplaceImg} 
                alt="Impact Coins Marketplace" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-qb-navy mb-12">
            Everything You Need for Modern Finance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass-card hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Community Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Participate in decentralized communities and governance</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Coins className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Impact Coins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Invest in sustainable and socially responsible projects</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Quant Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Access advanced algorithmic trading strategies</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Tokenized Portfolios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">Diversified portfolios powered by financial engineering</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Portfolio?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of forward-thinking investors who are already building wealth through our platform.
          </p>
          <Link to="/signup">
            <Button variant="qbPrimary" size="lg" className="text-lg px-12">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;