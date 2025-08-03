import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, Coins, Trophy, Gift, Calendar, Zap, CheckCircle, ArrowRight, Star, Shield,
  Settings, BarChart3, Lock, Smartphone, Globe, Code2, Layers, TrendingUp, Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const CommunityTokens = () => {
  const isMobile = useIsMobile();
  
  const handleDownloadApp = () => {
    window.location.href = '/coming-soon';
  };
  const features = [
    {
      icon: Settings,
      title: "Custom Token Creation",
      description: "Design tokens tailored to your community's unique needs and values",
      details: ["Custom token symbols", "Configurable reward mechanics", "Community branding", "Smart contract deployment"]
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Monitor token distribution, member engagement, and community growth",
      details: ["Real-time metrics", "Member participation tracking", "Token circulation data", "Engagement analytics"]
    },
    {
      icon: Lock,
      title: "Secure Governance",
      description: "Blockchain-powered voting and decision-making for community proposals",
      details: ["Transparent voting", "Proposal management", "Member authentication", "Result verification"]
    },
    {
      icon: Smartphone,
      title: "Mobile Integration",
      description: "Seamless token management across all devices and platforms",
      details: ["Mobile wallet support", "QR code transactions", "Push notifications", "Offline capability"]
    }
  ];

  const useCases = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Token-gated events and automated registration systems",
      benefits: ["Automated ticketing", "Member-only events", "Early bird rewards", "Attendance tracking"]
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Reward community contributions and milestone completions",
      benefits: ["Volunteer recognition", "Skill development", "Leadership rewards", "Progress tracking"]
    },
    {
      icon: Gift,
      title: "Rewards Marketplace",
      description: "Redeem tokens for merchandise, services, and exclusive benefits",
      benefits: ["Digital marketplace", "Partner discounts", "Exclusive content", "Member perks"]
    },
    {
      icon: Users,
      title: "Governance Tools",
      description: "Democratic decision-making and community management",
      benefits: ["Voting mechanisms", "Proposal systems", "Role management", "Consensus building"]
    }
  ];

  const specifications = [
    { label: "Blockchain", value: "Ethereum Compatible" },
    { label: "Token Standard", value: "ERC-20 / ERC-721" },
    { label: "Smart Contracts", value: "Audited & Verified" },
    { label: "Deployment Time", value: "< 24 hours" },
    { label: "Transaction Fees", value: "Gas Optimized" },
    { label: "Scalability", value: "Layer 2 Ready" }
  ];

  const implementationSteps = [
    {
      phase: "Planning",
      duration: "1-2 weeks",
      tasks: ["Define token economics", "Community goal mapping", "Reward structure design", "Integration planning"]
    },
    {
      phase: "Development",
      duration: "2-3 weeks",
      tasks: ["Smart contract deployment", "Dashboard setup", "Mobile app integration", "Security testing"]
    },
    {
      phase: "Launch",
      duration: "1 week",
      tasks: ["Community onboarding", "Initial distribution", "Training sessions", "Go-live support"]
    },
    {
      phase: "Growth",
      duration: "Ongoing",
      tasks: ["Analytics monitoring", "Feature enhancement", "Community expansion", "Continuous optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />

      {/* Product Header */}
      <section className="bg-qb-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-qb-green/20 rounded-xl flex items-center justify-center">
                  <Coins className="w-8 h-8 text-qb-green" />
                </div>
                <div>
                  <Badge className="bg-qb-green/20 text-qb-green mb-2">Available Now</Badge>
                  <h1 className="text-4xl font-bold text-white">Community Tokens</h1>
                </div>
              </div>
              <p className="text-xl text-gray-300 mb-6">
                Professional-grade tokenization platform designed for community organizations to create,
                manage, and scale their internal value exchange systems.
              </p>
              {isMobile ? (
                <div className="flex flex-col space-y-3">
                  <Button 
                    variant="qbPrimary" 
                    size="lg" 
                    className="w-full"
                    onClick={handleDownloadApp}
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download App
                  </Button>
                  <a
                    href="https://calendly.com/quantbasket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="qbGlass" size="lg" className="text-white border-white hover:bg-white/20 w-full">
                      Schedule Demo
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link to="/signup">
                    <Button variant="qbPrimary" size="lg">
                      Start Implementation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <a
                    href="https://calendly.com/quantbasket"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="qbGlass" size="lg" className="text-white border-white hover:bg-white/20">
                      Schedule Demo
                    </Button>
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="glass-card p-6 border-qb-green/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-qb-green mb-2">85%</div>
                  <div className="text-sm text-qb-navy font-medium mb-4">Average Engagement Increase</div>
                  <div className="space-y-2 text-sm text-qb-dark-gray">
                    <div className="flex justify-between">
                      <span>Implementation Time:</span>
                      <span className="font-medium">2-4 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Setup Cost:</span>
                      <span className="font-medium">From $50/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI Timeline:</span>
                      <span className="font-medium">3-6 months</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product Navigation Tabs */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-2 h-auto p-2' : 'grid-cols-4'} max-w-2xl mx-auto`}>
              <TabsTrigger value="features" className={isMobile ? 'text-xs py-2' : ''}>Features</TabsTrigger>
              <TabsTrigger value="use-cases" className={isMobile ? 'text-xs py-2' : ''}>Use Cases</TabsTrigger>
              <TabsTrigger value="specifications" className={isMobile ? 'text-xs py-2' : ''}>Specifications</TabsTrigger>
              <TabsTrigger value="implementation" className={isMobile ? 'text-xs py-2' : ''}>Implementation</TabsTrigger>
            </TabsList>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-qb-green">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-qb-green/20 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-qb-green" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-qb-navy">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-qb-dark-gray mb-4">{feature.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-qb-green flex-shrink-0" />
                            <span className="text-sm text-qb-dark-gray">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Use Cases Tab */}
            <TabsContent value="use-cases" className="mt-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-qb-blue/20 rounded-lg flex items-center justify-center">
                          <useCase.icon className="w-6 h-6 text-qb-blue" />
                        </div>
                        <CardTitle className="text-xl text-qb-navy">{useCase.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-qb-dark-gray mb-4">{useCase.description}</p>
                      <div className="space-y-2">
                        {useCase.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-qb-blue flex-shrink-0" />
                            <span className="text-sm text-qb-dark-gray">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specifications" className="mt-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card className="p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-qb-navy flex items-center gap-3">
                      <Code2 className="w-6 h-6 text-qb-green" />
                      Technical Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-qb-navy">{spec.label}</span>
                        <span className="text-qb-dark-gray">{spec.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-qb-navy flex items-center gap-3">
                      <Layers className="w-6 h-6 text-qb-blue" />
                      Integration Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-qb-navy mb-3">Platform Integrations</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <Globe className="w-6 h-6 text-qb-green mx-auto mb-1" />
                          <span className="text-sm font-medium">Web Portal</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <Smartphone className="w-6 h-6 text-qb-blue mx-auto mb-1" />
                          <span className="text-sm font-medium">Mobile App</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-qb-navy mb-3">API Access</h4>
                      <ul className="space-y-2 text-sm text-qb-dark-gray">
                        <li>• RESTful API endpoints</li>
                        <li>• Webhook notifications</li>
                        <li>• Real-time data streaming</li>
                        <li>• Custom integrations</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Implementation Tab */}
            <TabsContent value="implementation" className="mt-12">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-qb-navy mb-4">Implementation Roadmap</h3>
                  <p className="text-lg text-qb-dark-gray">Professional deployment process with dedicated support</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {implementationSteps.map((step, index) => (
                    <Card key={index} className="relative">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-qb-green rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                          {index + 1}
                        </div>
                        <CardTitle className="text-lg text-qb-navy">{step.phase}</CardTitle>
                        <Badge variant="secondary" className="bg-qb-blue/20 text-qb-blue">
                          {step.duration}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-qb-green flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-qb-dark-gray">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gradient-to-r from-qb-navy to-qb-blue">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Proven Results</h2>
            <p className="text-xl text-gray-200">Measurable impact across diverse community organizations</p>
          </div>

          <div className={`grid gap-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-4'}`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-qb-green mb-2">85%</div>
              <div className="text-white font-medium mb-1">Engagement Increase</div>
              <div className="text-sm text-gray-300">Average member participation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-qb-green mb-2">3x</div>
              <div className="text-white font-medium mb-1">Event Attendance</div>
              <div className="text-sm text-gray-300">Token-gated events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-qb-green mb-2">95%</div>
              <div className="text-white font-medium mb-1">Member Satisfaction</div>
              <div className="text-sm text-gray-300">User feedback scores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-qb-green mb-2">60%</div>
              <div className="text-white font-medium mb-1">Volunteer Growth</div>
              <div className="text-sm text-gray-300">Community contributions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-qb-navy mb-6">
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg text-qb-dark-gray mb-8">
            Join organizations worldwide using Community Tokens to drive engagement and create value.
          </p>
          {isMobile ? (
            <div className="flex flex-col gap-4">
              <Button 
                variant="qbPrimary" 
                size="lg" 
                className="px-8 w-full"
                onClick={handleDownloadApp}
              >
                <Download className="mr-2 w-5 h-5" />
                Download App
              </Button>
              <Link to="/pricing">
                <Button variant="qbOutline" size="lg" className="px-8 w-full">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="qbPrimary" size="lg" className="px-8">
                  Start Your Implementation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="qbOutline" size="lg" className="px-8">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityTokens;