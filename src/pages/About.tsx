import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, TrendingUp, ExternalLink } from "lucide-react";

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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Our Story</h2>
            <p className="text-lg text-qb-dark-gray leading-relaxed">
              Founded in 2024, Quant Basket emerged from a vision to build the world's largest crypto community 
              driven by financial engineering. We create community coins that reward meaningful actions, tokenized 
              ETFs backed by real assets, and mathematical trading strategies. Our platform empowers communities 
              to create their own currencies while accessing institutional-grade quantitative finance tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Community Currency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  We empower communities to create their own currencies, rewarding members for 
                  actions aligned with community goals and fostering collective growth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  We deliver mathematical precision in all our strategies, from Black-Scholes 
                  models to algorithmic trading, ensuring rigorous financial engineering.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  We pioneer tokenized ETFs backed by real assets and create innovative 
                  crypto solutions that bridge traditional finance with DeFi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Legacy & Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Our Legacy & Mission</h2>
            <p className="text-lg text-qb-dark-gray leading-relaxed mb-8">
              At Quant Basket, we're building the largest crypto community powered by financial engineering. 
              Our mission is to enable communities worldwide to create their own currencies, access tokenized 
              traditional assets, and benefit from mathematically-backed trading strategies. We believe in 
              rewarding meaningful community participation and democratizing sophisticated financial tools.
            </p>
            <p className="text-lg text-qb-dark-gray leading-relaxed">
              We envision a future where every community can create its own economy through tokenization, where 
              traditional assets are accessible via blockchain, and where advanced quantitative strategies 
              empower individual investors to achieve institutional-level returns.
            </p>
          </div>
        </div>
      </section>

      {/* Parent Company */}
      <section className="section-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Card className="glass-card p-8">
            <h2 className="text-3xl font-bold text-qb-navy mb-6">A HoneyJa Company</h2>
            <p className="text-lg text-qb-dark-gray mb-6">
              Quant Basket is proudly part of the HoneyJa ecosystem, a technology conglomerate 
              specializing in financial engineering and innovative blockchain solutions. HoneyJa's 
              expertise in quantitative finance and commitment to community-driven innovation 
              provides the foundation for our revolutionary crypto platform.
            </p>
            <a 
              href="https://www.honeyja.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="qbOutline" className="inline-flex items-center">
                Learn More About HoneyJa
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;