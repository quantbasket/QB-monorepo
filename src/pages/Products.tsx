import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, BarChart3, TrendingUp, Shield, Zap, Globe, ArrowRight } from "lucide-react";

const Products = () => {
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
      badge: "Popular",
      color: "qb-green"
    },
    {
      title: "Impact Coins",
      icon: Globe,
      description: "Tokenized ETFs backed by real shares and commodities, bringing traditional assets to the blockchain.",
      features: [
        "Real asset backing",
        "Fractional ownership",
        "Blockchain transparency",
        "Lower entry barriers",
        "Global accessibility"
      ],
      badge: "Sustainable",
      color: "qb-blue"
    },
    {
      title: "Quant Strategies",
      icon: BarChart3,
      description: "Mathematical trading strategies with advanced model implementations and algorithmic systems.",
      features: [
        "Mathematically backed tokens",
        "Algorithmic execution",
        "Mathematical precision",
        "Risk-optimized models",
        "Quantitative engineering"
      ],
      badge: "Advanced",
      color: "qb-green"
    },
    {
      title: "Tokenized Portfolios",
      icon: TrendingUp,
      description: "Community-created portfolios combining multiple assets and strategies into tradeable token baskets.",
      features: [
        "Community-designed baskets",
        "Multi-strategy integration",
        "Transparent composition",
        "Tokenized liquidity",
        "Collective intelligence"
      ],
      badge: "Professional",
      color: "qb-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-200">
            Cutting-edge financial products that bridge traditional finance with blockchain innovation
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="glass-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${product.color}/20 rounded-lg flex items-center justify-center`}>
                      <product.icon className={`w-6 h-6 text-${product.color}`} />
                    </div>
                    <Badge variant="secondary" className="bg-qb-green/20 text-qb-green">
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
                  
                  <Button variant="qbPrimary" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
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
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Platform Features</h2>
            <p className="text-lg text-qb-dark-gray">
              Advanced capabilities that power all our products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Built on Cutting-Edge Technology</h2>
            <p className="text-lg text-qb-dark-gray">
              Our platform leverages the latest advances in blockchain, AI, and quantitative finance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Explore Our Products?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join our platform and start building your diversified portfolio today.
          </p>
          <Button variant="qbPrimary" size="lg" className="text-lg px-12">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;