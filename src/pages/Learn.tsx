import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  PlayCircle, 
  BookOpen, 
  Users, 
  Target, 
  TrendingUp, 
  Shield,
  ExternalLink,
  Clock,
  Star
} from 'lucide-react';

const Learn = () => {
  const courses = [
    {
      id: 1,
      title: "What is Tokenization? Explained in Simple Terms",
      description: "A comprehensive introduction to tokenization and how it's transforming traditional finance",
      duration: "3 mins",
      level: "Beginner",
      videoUrl: "https://www.youtube.com/embed/aLh8jlYYvZA",
      topics: ["Tokenization Basics", "Real World Assets", "Blockchain Technology"]
    },
    {
      id: 2,
      title: "What is tokenization in banking?",
      description: "Understanding how tokenization is revolutionizing banking and financial services",
      duration: "8 mins",
      level: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/Aqi4qxmFVJU",
      topics: ["Banking Technology", "Financial Innovation", "Digital Transformation"]
    },
    {
      id: 3,
      title: "Quantitative Trading Strategies",
      description: "Learn algorithmic trading, quantitative analysis, and systematic investment approaches",
      duration: "63 mins",
      level: "Advanced",
      videoUrl: "https://www.youtube.com/embed/hPbay_ejH0s",
      topics: ["Algorithmic Trading", "Risk Management", "Portfolio Optimization"]
    },
    {
      id: 4,
      title: "Introduction to Quantitative Finance",
      description: "Mathematical models and statistical methods used in modern quantitative finance",
      duration: "3 mins",
      level: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/lG_OBZocF3E",
      topics: ["Financial Models", "Statistical Analysis", "Quantitative Methods"]
    }
  ];

  const resources = [
    {
      title: "Tokenization Whitepaper",
      description: "Comprehensive guide to the future of tokenized assets",
      type: "PDF",
      downloadUrl: "#"
    },
    {
      title: "API Documentation",
      description: "Complete technical documentation for developers",
      type: "Docs",
      downloadUrl: "#"
    },
    {
      title: "Case Studies",
      description: "Real-world examples of successful token implementations",
      type: "Report",
      downloadUrl: "#"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-600 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-qb-navy via-qb-blue to-qb-green opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-qb-navy mb-6">
              Learn Token
              <span className="bg-gradient-to-r from-qb-blue to-qb-green bg-clip-text text-transparent">
                ization
              </span>
            </h1>
            <p className="text-xl text-qb-dark-gray mb-8 leading-relaxed">
              Master the fundamentals of tokenization and quantitative finance with our expert-led video courses. 
              Learn from industry professionals about asset tokenization, algorithmic trading, and modern financial modeling.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://www.youtube.com/@quantbasket" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-qb-navy hover:bg-qb-navy/90">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </a>
              <Link to="/resources">
                <Button variant="outline" size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-qb-navy mb-4">
              Learning Paths
            </h2>
            <p className="text-lg text-qb-dark-gray max-w-2xl mx-auto">
              Structured learning paths designed to take you from beginner to expert in tokenization and quantitative finance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-qb-blue/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-qb-navy">Tokenization Expert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">
                  Master the fundamentals of tokenization and understand how real-world assets can be digitized.
                </p>
                <ul className="text-sm text-qb-dark-gray space-y-2">
                  <li>• Asset Tokenization</li>
                  <li>• Blockchain Technology</li>
                  <li>• Smart Contracts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-qb-navy">Quantitative Analyst</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">
                  Develop advanced quantitative strategies and learn mathematical models for modern finance.
                </p>
                <ul className="text-sm text-qb-dark-gray space-y-2">
                  <li>• Algorithmic Trading</li>
                  <li>• Financial Modeling</li>
                  <li>• Risk Analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-qb-green/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-qb-navy">Digital Finance Pioneer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-qb-dark-gray mb-4">
                  Combine tokenization with quantitative methods to create innovative financial solutions.
                </p>
                <ul className="text-sm text-qb-dark-gray space-y-2">
                  <li>• DeFi Integration</li>
                  <li>• Portfolio Optimization</li>
                  <li>• Advanced Analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Courses */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-qb-navy mb-4">
              Video Courses
            </h2>
            <p className="text-lg text-qb-dark-gray max-w-2xl mx-auto">
              Learn from industry experts with our curated video courses covering tokenization and quantitative finance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-qb-navy mb-2">{course.title}</CardTitle>
                      <p className="text-qb-dark-gray">{course.description}</p>
                    </div>
                    <Badge variant="outline" className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-qb-dark-gray">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      4.8
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="aspect-video bg-slate-200 rounded-lg mb-4 flex items-center justify-center group-hover:bg-slate-300 transition-colors">
                    <iframe 
                      src={course.videoUrl}
                      title={course.title}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-qb-navy mb-2">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <a 
                    href={course.videoUrl.replace('/embed/', '/watch?v=')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full" variant="outline">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Course
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-qb-navy mb-4">
              Resources & Documentation
            </h2>
            <p className="text-lg text-qb-dark-gray max-w-2xl mx-auto">
              Download comprehensive guides, whitepapers, and technical documentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-qb-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-qb-navy">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-qb-dark-gray mb-4">{resource.description}</p>
                  <Badge variant="outline" className="mb-4">
                    {resource.type}
                  </Badge>
                  <Link to="/resources">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </Link>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are mastering the future of finance through tokenization
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-qb-navy bg-transparent">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learn;