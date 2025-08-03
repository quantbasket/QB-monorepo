import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, TrendingUp, ExternalLink, Eye, Lightbulb, Heart } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      description: "Former Goldman Sachs quantitative researcher with 15+ years in algorithmic trading",
    },
    {
      name: "Prof. Michael Rodriguez",
      role: "Chief Technology Officer",
      description: "MIT PhD in Financial Engineering, pioneer in blockchain-based trading systems",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Head of Quantitative Research",
      description: "Former Jane Street quantitative analyst, expert in high-frequency trading strategies",
    },
    {
      name: "James Thompson",
      role: "Head of Tokenization",
      description: "Blockchain architect with deep expertise in DeFi protocols and tokenomics",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            About Quant Basket
          </h1>
          <p className="text-xl text-gray-200">
            Pioneering the future of decentralized finance through quantitative innovation
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-br from-qb-soft-gray to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Our Story</h2>
            <p className="text-lg text-qb-dark-gray leading-relaxed">
              Founded in 2025, Quant Basket emerged from a vision to democratize quantitative finance through 
              community-driven tokenization. We enable communities to create their own currencies backed by 
              advanced mathematical models, while providing access to tokenized ETFs representing 
              real commodities and shares. Our platform bridges traditional finance with blockchain innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center border-l-4 border-l-qb-green">
              <CardHeader>
                <Users className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Community Currencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Communities create their own tokens with reward mechanisms for meaningful actions, 
                  fostering engagement and collective growth through quantitative tokenomics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center border-l-4 border-l-qb-blue">
              <CardHeader>
                <Award className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Mathematical Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Every strategy is backed by proven mathematical models including Black-Scholes, 
                  Monte Carlo simulations, and advanced quantitative frameworks designed by financial engineers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center border-l-4 border-l-qb-green">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Tokenized Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  Access tokenized ETFs backed by real commodities and shares, bringing traditional 
                  asset exposure to the blockchain with full transparency and mathematical backing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-qb-dark-gray/20 to-transparent"></div>


      {/* Legacy & Mission */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Our Mission & Vision</h2>
            <div className="space-y-6">
              <Card className="glass-card p-8 border-l-4 border-l-qb-green">
                <h3 className="text-2xl font-semibold text-qb-navy mb-4">Our Mission</h3>
                <p className="text-lg text-qb-dark-gray leading-relaxed">
                  To democratize quantitative finance by empowering communities to create their own currencies 
                  and access tokenized traditional assets. We bridge the gap between sophisticated financial 
                  engineering and community-driven blockchain innovation, making institutional-grade strategies 
                  accessible to everyone.
                </p>
              </Card>
              
              <Card className="glass-card p-8 border-l-4 border-l-qb-blue">
                <h3 className="text-2xl font-semibold text-qb-navy mb-4">Our Vision</h3>
                <p className="text-lg text-qb-dark-gray leading-relaxed">
                  A world where every community can create its own mathematically-backed economy, where 
                  traditional assets are seamlessly accessible through blockchain technology, and where 
                  advanced quantitative strategies enable individuals to achieve institutional-level financial returns.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-qb-dark-gray/20 to-transparent"></div>

      {/* Values Section */}
      <section className="section-gradient py-8">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Card className="glass-card p-8">
            <h2 className="text-3xl font-bold text-qb-navy mb-6">Our Values</h2>
            <p className="text-lg text-qb-dark-gray mb-6">
              We believe in democratizing access to sophisticated financial tools through blockchain innovation. 
              Our commitment to transparency, mathematical rigor, and community empowerment drives everything we do.
              We're building the future of decentralized finance, one community token at a time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Eye className="w-8 h-8 text-qb-blue mx-auto mb-3" />
                <h3 className="font-semibold text-qb-navy mb-2">Transparency</h3>
                <p className="text-sm text-qb-dark-gray">Open-source principles and blockchain transparency</p>
              </div>
              <div className="text-center">
                <Lightbulb className="w-8 h-8 text-qb-green mx-auto mb-3" />
                <h3 className="font-semibold text-qb-navy mb-2">Innovation</h3>
                <p className="text-sm text-qb-dark-gray">Cutting-edge quantitative finance meets DeFi</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 text-qb-blue mx-auto mb-3" />
                <h3 className="font-semibold text-qb-navy mb-2">Community</h3>
                <p className="text-sm text-qb-dark-gray">Empowering communities through tokenization</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;