import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Download, 
  ExternalLink, 
  BookOpen, 
  FileText,
  Github,
  Users,
  Target,
  TrendingUp,
  Briefcase
} from 'lucide-react';

const Resources = () => {
  const productResources = [
    {
      category: "Community Tokens",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      resources: [
        {
          title: "Community Token Framework",
          description: "Complete guide to creating and managing community-driven tokens",
          type: "PDF Guide",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Governance Templates",
          description: "Ready-to-use governance structures and voting mechanisms",
          type: "Template Pack",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Community Analytics Dashboard",
          description: "Open-source analytics tools for token communities",
          type: "GitHub Repository",
          downloadUrl: "https://github.com/quantbasket/community-analytics",
          isOpenSource: true
        }
      ]
    },
    {
      category: "Impact Coins",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      resources: [
        {
          title: "ESG Impact Measurement Framework",
          description: "Standardized metrics for measuring environmental and social impact",
          type: "Research Paper",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Impact Verification Protocols",
          description: "Blockchain-based verification systems for impact claims",
          type: "Technical Spec",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Sustainability Token Standards",
          description: "Open standards for tokenizing environmental assets",
          type: "Standard Document",
          downloadUrl: "#",
          isOpenSource: true
        }
      ]
    },
    {
      category: "Quant Strategy Tokens",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
      resources: [
        {
          title: "Algorithmic Trading Models",
          description: "Open-source quantitative trading strategies and backtesting frameworks",
          type: "Code Library",
          downloadUrl: "https://github.com/quantbasket/trading-models",
          isOpenSource: true
        },
        {
          title: "Risk Management Toolkit",
          description: "Comprehensive risk assessment and management tools",
          type: "Software Package",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Portfolio Optimization Engine",
          description: "Advanced portfolio optimization algorithms and implementations",
          type: "API Documentation",
          downloadUrl: "#",
          isOpenSource: true
        }
      ]
    },
    {
      category: "Portfolio Tokens",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      resources: [
        {
          title: "Multi-Asset Portfolio Framework",
          description: "Framework for creating and managing diversified token portfolios",
          type: "Technical Guide",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Rebalancing Algorithms",
          description: "Automated portfolio rebalancing strategies and implementations",
          type: "Algorithm Library",
          downloadUrl: "#",
          isOpenSource: true
        },
        {
          title: "Performance Analytics Suite",
          description: "Comprehensive portfolio performance measurement and reporting tools",
          type: "Analytics Package",
          downloadUrl: "#",
          isOpenSource: true
        }
      ]
    }
  ];

  const generalResources = [
    {
      title: "Tokenization Whitepaper",
      description: "Comprehensive academic research on asset tokenization and its implications",
      type: "Research",
      downloadUrl: "#",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "API Documentation",
      description: "Complete technical documentation for developers and integrators",
      type: "Documentation",
      downloadUrl: "#",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Smart Contract Templates",
      description: "Audited smart contract templates for various tokenization use cases",
      type: "Code",
      downloadUrl: "/Downloads/smart_contract_template.txt",
      icon: <Github className="w-5 h-5" />
    },
    {
      title: "Regulatory Compliance Guide",
      description: "Guidelines for regulatory compliance across different jurisdictions",
      type: "Legal Guide",
      downloadUrl: "#",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-qb-navy via-qb-blue to-qb-green opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-qb-navy mb-6">
              Open Source
              <span className="bg-gradient-to-r from-qb-blue to-qb-green bg-clip-text text-transparent">
                {" "}Resources
              </span>
            </h1>
            <p className="text-xl text-qb-dark-gray mb-8 leading-relaxed">
              Access our comprehensive collection of open-source tools, frameworks, and documentation 
              for building the future of tokenized finance. Everything you need to get started with our four product lines.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-qb-navy hover:bg-qb-navy/90">
                <Download className="w-5 h-5 mr-2" />
                Download All Resources
              </Button>
              <a href="https://github.com/quantbasket/resources" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-qb-navy mb-4">
              Product-Specific Resources
            </h2>
            <p className="text-lg text-qb-dark-gray max-w-2xl mx-auto">
              Comprehensive open-source tools and documentation for each of our four flagship products
            </p>
          </div>

          <div className="space-y-12">
            {productResources.map((product, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center text-white`}>
                    {product.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-qb-navy">{product.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.resources.map((resource, resourceIndex) => (
                    <Card key={resourceIndex} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-qb-blue/30">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg text-qb-navy">{resource.title}</CardTitle>
                          {resource.isOpenSource && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                              Open Source
                            </Badge>
                          )}
                        </div>
                        <p className="text-qb-dark-gray text-sm">{resource.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Access
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Resources */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-qb-navy mb-4">
              General Resources
            </h2>
            <p className="text-lg text-qb-dark-gray max-w-2xl mx-auto">
              Foundation documents and tools that apply across all our tokenization products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalResources.map((resource, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-qb-navy rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {resource.icon}
                  </div>
                  <CardTitle className="text-lg text-qb-navy">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-qb-dark-gray mb-4 text-sm">{resource.description}</p>
                  <Badge variant="outline" className="mb-4 text-xs">
                    {resource.type}
                  </Badge>
                  <Button variant="outline" className="w-full" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-qb-navy to-qb-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contribute to the Future of Finance
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our open-source community and help build the next generation of tokenization tools
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary">
              <Github className="w-5 h-5 mr-2" />
              Fork on GitHub
            </Button>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-qb-navy bg-transparent">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;