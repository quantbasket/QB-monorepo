import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, Book, MessageCircle, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const isMobile = useIsMobile();
  
  const navigate = useNavigate();

const handleResourcesClick = () => {
  navigate('/resources');
};

  const handleEmailSupport = () => {
    window.location.href = 'mailto:support@quantbasket.com';
  };
  const categories = [
    {
      title: "Quantitative Financial Engineering",
      description: "Understanding the mathematical models behind our strategies",
      icon: HelpCircle,
      color: "qb-green",
      faqs: [
        {
          question: "What is quantitative financial engineering?",
          answer: "Quantitative financial engineering applies mathematical models to create crypto tokens and trading strategies. Our engineers build mathematically backed coins, algorithmic trading systems, and tokenized ETFs backed by real assets, bringing institutional-grade mathematics to community-driven crypto platforms."
        },
        {
          question: "How do community coins reward meaningful actions?",
          answer: "Community coins are distributed when members complete actions that align with community goals. Whether it's environmental initiatives, educational contributions, or community building, our smart contracts automatically reward participants with tokens that have real economic value within the community ecosystem."
        },
        {
          question: "How are tokenized ETFs backed by real assets?",
          answer: "Our tokenized ETFs represent fractional ownership of real shares, commodities, and bonds held in secure custody. Each token is backed 1:1 by actual assets, verified through regular audits and blockchain transparency, enabling global access to traditional markets through crypto wallets."
        }
      ]
    },
    {
      title: "Cryptocurrency & DeFi",
      description: "Everything about digital assets and decentralized finance",
      icon: Book,
      color: "qb-blue",
      faqs: [
        {
          question: "How does DeFi integration work on your platform?",
          answer: "Our platform integrates with various DeFi protocols to provide liquidity, yield farming opportunities, and automated market making. We use smart contracts to ensure transparent and secure interactions with decentralized protocols while maintaining the sophisticated risk management of traditional finance."
        },
        {
          question: "What cryptocurrencies can I use on the platform?",
          answer: "We support major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), and various stablecoins (USDC, USDT, DAI). Our platform also supports DeFi tokens and governance tokens from major protocols. All crypto transactions are secured through multi-signature wallets and smart contract audits."
        },
        {
          question: "How do you ensure security in crypto transactions?",
          answer: "We implement multiple layers of security including cold storage for majority of funds, multi-signature wallets, smart contract audits by leading security firms, and real-time monitoring systems. Our platform follows industry best practices and maintains insurance coverage for digital assets."
        }
      ]
    },
    {
      title: "Blockchain & Tokenomics",
      description: "Understanding blockchain technology and token economics",
      icon: MessageCircle,
      color: "qb-green",
      faqs: [
        {
          question: "How does tokenization work on your platform?",
          answer: "Tokenization on our platform involves converting traditional financial assets or strategies into digital tokens on the blockchain. Each token represents fractional ownership and comes with programmable features like automatic dividend distribution, governance rights, and liquidity options."
        },
        {
          question: "What blockchain networks do you support?",
          answer: "We primarily operate on Ethereum for maximum compatibility with DeFi protocols, but also support Polygon for lower transaction costs and faster settlements. We're continuously evaluating other Layer 1 and Layer 2 solutions to provide the best user experience."
        },
        {
          question: "How are governance tokens distributed and used?",
          answer: "Governance tokens are distributed to platform users based on their participation, investment amounts, and community contributions. These tokens allow holders to vote on platform upgrades, new product launches, fee structures, and strategic decisions through our decentralized governance system."
        }
      ]
    },
    {
      title: "Impact & Community Coins",
      description: "Sustainable investing and community-driven tokenization",
      icon: Mail,
      color: "qb-blue",
      faqs: [
        {
          question: "How do you measure the impact of Impact Coins?",
          answer: "We use standardized ESG metrics and work with third-party auditors to verify impact claims. Each Impact Coin project includes measurable outcomes such as carbon reduction, social benefit metrics, and sustainable development goal (SDG) alignment. Regular impact reports are published and blockchain-verified."
        },
        {
          question: "What makes Community Coins different from regular tokens?",
          answer: "Community Coins are designed with democratic governance at their core. Unlike traditional tokens, they include mechanisms for community proposal submission, transparent voting, revenue sharing among holders, and collaborative decision-making on project direction and resource allocation."
        },
        {
          question: "How can I participate in community governance?",
          answer: "Token holders can participate by submitting proposals through our governance portal, voting on active proposals, delegating voting power to trusted community members, and participating in community discussions. The weight of your vote corresponds to your token holdings and community participation history."
        }
      ]
    }
  ];

  const additionalFaqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment varies by product. For Community Tokens, the minimum is $10. Impact Coins start at $25, Quant Strategies require $100 minimum, and Tokenized Portfolios start at $500. Free plan users have lower limits as specified in our pricing section."
    },
    {
      question: "How are fees structured on the platform?",
      answer: "We use a transparent fee structure: 0.5% management fee for tokenized portfolios, 0.25% transaction fee for token trades, and performance fees ranging from 10-20% depending on the strategy's complexity and performance. Detailed fee breakdowns are provided before any investment."
    },
    {
      question: "What regulatory compliance measures do you follow?",
      answer: "We comply with relevant financial regulations including KYC/AML requirements, securities laws where applicable, and maintain appropriate licenses. Our legal team continuously monitors regulatory developments in both traditional finance and cryptocurrency sectors to ensure ongoing compliance."
    },
    {
      question: "How can I withdraw my investments?",
      answer: "Most investments can be withdrawn with standard settlement periods: 1-3 days for liquid tokens, 5-7 days for quant strategies, and up to 30 days for some impact investments. Withdrawal methods include bank transfer, cryptocurrency transfer, or reinvestment into other platform products."
    },
    {
      question: "Do you provide tax reporting assistance?",
      answer: "Yes, we provide comprehensive tax reporting including transaction histories, gain/loss calculations, and forms compatible with major tax software. For Pro plan users, we offer consultation with tax professionals familiar with cryptocurrency and complex financial instruments."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Support Center
          </h1>
          <p className="text-xl text-gray-200">
            Find answers to your questions about quantitative finance, crypto, and our platform
          </p>
        </div>
      </section>

      {/* Category-based FAQ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-${category.color}/20 rounded-lg flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 text-${category.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-qb-navy">{category.title}</CardTitle>
                      <p className="text-sm text-qb-dark-gray">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left text-qb-navy hover:text-qb-green">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-qb-dark-gray">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* General FAQ */}
      <section className="section-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-qb-navy mb-6">General Questions</h2>
            <p className="text-lg text-qb-dark-gray">
              Common questions about using our platform
            </p>
          </div>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {additionalFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`general-${index}`}>
                    <AccordionTrigger className="text-left text-qb-navy hover:text-qb-green">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-qb-dark-gray">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-qb-navy mb-6">Still Need Help?</h2>
          <p className="text-lg text-qb-dark-gray mb-8">
            Our support team is here to assist you with any questions not covered in our FAQ
          </p>
          
          <div className={`gap-6 ${isMobile ? 'grid grid-cols-2' : 'grid grid-cols-1 md:grid-cols-3'}`}>
            <Card className="glass-card text-center">
              <CardHeader>
                <Mail className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">
                  Get detailed help via email support
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleEmailSupport}
                  className="bg-qb-green/20 text-qb-green border-qb-green hover:bg-qb-green hover:text-white w-32 h-8" // Add custom width and height
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send mail
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-qb-blue mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">
                  Instant help during business hours
                </p>
                <Badge variant="secondary" className="bg-qb-blue/20 text-qb-blue">
                  Available 9AM-6PM IST
                </Badge>
              </CardContent>
            </Card>
            
            <Card className={`glass-card text-center ${isMobile ? 'col-span-2' : ''}`}>
              <CardHeader>
                <Book className="w-12 h-12 text-qb-green mx-auto mb-4" />
                <CardTitle className="text-qb-navy">Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">
                  Comprehensive guides and tutorials
                </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResourcesClick}
                className="bg-qb-green/20 text-qb-blue border-qb-blue hover:bg-qb-blue hover:text-white w-32 h-8"
              >
                <Book className="w-4 h-4 mr-2" />
                Resources
              </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;