import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, Trophy, Gift, Calendar, Zap, CheckCircle, ArrowRight, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityTokens = () => {
  const useCases = [
    {
      icon: Calendar,
      title: "Event Access",
      description: "Use tokens to register for conferences, workshops, and exclusive member events",
      examples: ["Conference tickets", "Workshop seats", "VIP event access", "Networking sessions"]
    },
    {
      icon: Gift,
      title: "Rewards & Benefits",
      description: "Redeem tokens for merchandise, discounts, and special member privileges",
      examples: ["Member merchandise", "Service discounts", "Premium content access", "Special recognition"]
    },
    {
      icon: Trophy,
      title: "Achievement Recognition",
      description: "Earn tokens for community contributions, volunteer work, and milestone achievements",
      examples: ["Volunteer hours", "Project completion", "Mentorship activities", "Leadership roles"]
    },
    {
      icon: Users,
      title: "Governance Participation",
      description: "Use tokens to vote on community decisions and shape organizational direction",
      examples: ["Policy voting", "Budget allocation", "Project selection", "Leadership elections"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Blockchain-based tokens ensure complete transparency and security for all transactions"
    },
    {
      icon: Zap,
      title: "Easy to Implement",
      description: "Simple setup process with customizable reward mechanisms tailored to your community"
    },
    {
      icon: CheckCircle,
      title: "Automated Distribution",
      description: "Smart contracts automatically distribute tokens based on predefined community activities"
    },
    {
      icon: Star,
      title: "Member Engagement",
      description: "Gamify community participation and increase member engagement through token rewards"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Define Your Community Goals",
      description: "Identify what activities and behaviors you want to reward within your community"
    },
    {
      step: "2",
      title: "Design Token Economics",
      description: "Set up earning mechanisms, reward structures, and redemption options that align with your values"
    },
    {
      step: "3",
      title: "Launch Your Token",
      description: "Deploy your community token with our simple tools and start distributing to members"
    },
    {
      step: "4",
      title: "Engage & Grow",
      description: "Monitor engagement, adjust rewards, and watch your community thrive with token-driven participation"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-qb-green/20 text-qb-green mb-4">
                Available Now
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Community Tokens
                <span className="text-qb-green block">Reward What Matters</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Transform your community with custom tokens that reward meaningful participation, 
                drive engagement, and create a thriving internal economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="qbSecondary" size="lg" className="text-lg px-8">
                    Start Your Community Token
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="qbGlass" size="lg" className="text-lg px-8 text-white border-white hover:!bg-white/20">
                  See Demo
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card p-8">
                <div className="text-center">
                  <Coins className="w-24 h-24 text-qb-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-qb-navy mb-2">Your Community Token</h3>
                  <p className="text-qb-dark-gray">Custom designed for your organization's unique needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">How Community Tokens Work</h2>
            <p className="text-lg text-qb-dark-gray max-w-3xl mx-auto">
              Create a digital currency that represents value within your community. Members earn tokens 
              through contributions and redeem them for benefits, creating a self-sustaining ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="glass-card text-center relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-qb-green rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl text-qb-navy">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-qb-dark-gray">{step.description}</p>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-qb-green" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Transform Your Community</h2>
            <p className="text-lg text-qb-dark-gray max-w-3xl mx-auto">
              From professional associations to service clubs, community tokens create new opportunities 
              for engagement and value exchange.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-qb-green/20 rounded-lg flex items-center justify-center">
                      <useCase.icon className="w-6 h-6 text-qb-green" />
                    </div>
                    <CardTitle className="text-2xl text-qb-navy">{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-qb-dark-gray">{useCase.description}</p>
                  <div>
                    <h4 className="font-semibold text-qb-navy mb-2">Examples:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {useCase.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-qb-green flex-shrink-0" />
                          <span className="text-sm text-qb-dark-gray">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Why Choose Community Tokens?</h2>
            <p className="text-lg text-qb-dark-gray max-w-3xl mx-auto">
              Built on blockchain technology with user-friendly tools designed specifically for community organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card text-center hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-qb-green mx-auto mb-4" />
                  <CardTitle className="text-qb-navy">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-qb-dark-gray text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Impact */}
      <section className="section-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Real Community Impact</h2>
            <p className="text-lg text-qb-dark-gray">
              See how community tokens drive engagement and create value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-qb-green mb-2">85%</div>
                <div className="text-lg font-semibold text-qb-navy mb-2">Increased Participation</div>
                <p className="text-sm text-qb-dark-gray">
                  Communities report higher member engagement after implementing token rewards
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-qb-blue mb-2">3x</div>
                <div className="text-lg font-semibold text-qb-navy mb-2">Event Attendance</div>
                <p className="text-sm text-qb-dark-gray">
                  Token-gated events see significantly higher attendance and engagement rates
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-qb-green mb-2">60%</div>
                <div className="text-lg font-semibold text-qb-navy mb-2">Volunteer Growth</div>
                <p className="text-sm text-qb-dark-gray">
                  Token rewards motivate more members to participate in volunteer activities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Launch Your Community Token?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join communities worldwide that are transforming member engagement through token rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="qbPrimary" size="lg" className="text-lg px-12">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="qbGlass" size="lg" className="text-lg px-8 text-white border-white hover:!bg-white/20">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityTokens;