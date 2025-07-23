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
              Founded in 2024, Quant Basket emerged from a vision to democratize access to sophisticated 
              financial strategies that were previously exclusive to institutional investors. Our team of 
              financial engineers, blockchain experts, and quantitative researchers came together to create 
              a platform that combines the power of traditional quantitative finance with the innovation 
              of decentralized technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray">
                  We believe in the power of community-driven finance, where every participant 
                  has a voice in shaping the future of their investments.
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
                  Our commitment to excellence drives us to deliver institutional-grade 
                  strategies with transparency and accessibility.
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
                  We continuously push the boundaries of what's possible in quantitative 
                  finance and blockchain technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-gradient py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Leadership Team</h2>
            <p className="text-lg text-qb-dark-gray">
              Meet the financial engineers and blockchain experts driving innovation at Quant Basket
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-qb-green to-qb-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-qb-navy text-center">{member.name}</CardTitle>
                  <p className="text-qb-green font-semibold text-center">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-qb-dark-gray text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy & Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">Our Legacy & Mission</h2>
            <p className="text-lg text-qb-dark-gray leading-relaxed mb-8">
              At Quant Basket, we're building a legacy of financial innovation that bridges traditional 
              quantitative finance with the transformative power of blockchain technology. Our mission 
              is to create a more inclusive financial ecosystem where sophisticated investment strategies 
              are accessible to everyone, not just institutional investors.
            </p>
            <p className="text-lg text-qb-dark-gray leading-relaxed">
              We envision a future where community governance, transparent algorithms, and sustainable 
              impact investing create lasting value for all stakeholders. Every token, every strategy, 
              and every innovation we develop is designed to contribute to this larger vision of 
              democratized finance.
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
              dedicated to creating innovative solutions across various industries. HoneyJa's 
              commitment to excellence and innovation provides the foundation for our cutting-edge 
              financial technologies.
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