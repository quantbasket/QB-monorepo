import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for getting started with quantitative finance",
      icon: Star,
      popular: false,
      features: [
        "Access to basic community tokens",
        "Limited quant strategies (3 strategies)",
        "Basic portfolio analytics",
        "Community forum access",
        "Educational resources",
        "Mobile app access",
        "Email support"
      ],
      limitations: [
        "Maximum investment: $1,000",
        "Basic risk metrics only",
        "No premium strategies"
      ]
    },
    {
      name: "Standard",
      price: "100",
      period: "per month",
      description: "Advanced tools for serious investors",
      icon: Zap,
      popular: true,
      features: [
        "All Free plan features",
        "Advanced quant strategies (20+ strategies)",
        "Real-time portfolio optimization",
        "Impact coins marketplace access",
        "Advanced analytics dashboard",
        "API access",
        "Priority email support",
        "Webinar access",
        "Custom portfolio creation",
        "Risk management tools"
      ],
      limitations: [
        "Maximum investment: $50,000",
        "Standard execution speed"
      ]
    },
    {
      name: "Pro",
      price: "250",
      period: "per month",
      description: "Institutional-grade tools and features",
      icon: Crown,
      popular: false,
      features: [
        "All Standard plan features",
        "Unlimited investment capacity",
        "Premium algorithmic strategies",
        "White-label solutions",
        "Dedicated account manager",
        "Custom strategy development",
        "Advanced backtesting tools",
        "Institutional reporting",
        "24/7 phone support",
        "Early access to new features",
        "Direct access to research team",
        "Custom integrations"
      ],
      limitations: []
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-200">
            Flexible pricing options designed to grow with your investment journey
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass-card relative ${
                  plan.popular ? 'ring-2 ring-qb-green shadow-2xl scale-105' : ''
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-qb-green text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    plan.name === 'Free' ? 'bg-qb-blue/20' :
                    plan.name === 'Standard' ? 'bg-qb-green/20' :
                    'bg-qb-navy/20'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${
                      plan.name === 'Free' ? 'text-qb-blue' :
                      plan.name === 'Standard' ? 'text-qb-green' :
                      'text-qb-navy'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl text-qb-navy">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-qb-navy">
                    ${plan.price}
                    <span className="text-lg font-normal text-qb-dark-gray">/{plan.period}</span>
                  </div>
                  <p className="text-qb-dark-gray">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-qb-navy mb-4">Features included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-qb-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-qb-dark-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-qb-dark-gray mb-2 text-sm">Limitations:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-xs text-qb-dark-gray/70">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    variant={plan.popular ? "qbPrimary" : "qbOutline"} 
                    className="w-full"
                    size="lg"
                  >
                    {plan.name === 'Free' ? 'Get Started Free' : 'Start Trial'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="section-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">All Plans Include</h2>
            <p className="text-lg text-qb-dark-gray">
              Core features available across all subscription tiers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-qb-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-qb-green" />
              </div>
              <h3 className="font-semibold text-qb-navy mb-2">Secure Platform</h3>
              <p className="text-sm text-qb-dark-gray">Bank-grade security for all transactions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-qb-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-qb-blue" />
              </div>
              <h3 className="font-semibold text-qb-navy mb-2">Mobile Access</h3>
              <p className="text-sm text-qb-dark-gray">Trade and monitor on the go</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-qb-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-qb-green" />
              </div>
              <h3 className="font-semibold text-qb-navy mb-2">Community Forum</h3>
              <p className="text-sm text-qb-dark-gray">Connect with other investors</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-qb-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-qb-blue" />
              </div>
              <h3 className="font-semibold text-qb-navy mb-2">Educational Resources</h3>
              <p className="text-sm text-qb-dark-gray">Learn about quantitative finance</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-qb-navy">Can I upgrade or downgrade my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, 
                  while downgrades take effect at the end of your current billing cycle.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-qb-navy">Is there a free trial for paid plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Yes, both Standard and Pro plans come with a 14-day free trial. 
                  No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-qb-navy">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  We accept all major credit cards, bank transfers, and select cryptocurrencies. 
                  All payments are processed securely with enterprise-grade encryption.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;