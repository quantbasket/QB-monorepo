import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDownloadApp = () => {
    window.location.href = '/coming-soon';
  };

  const handleNavClick = () => {
    // Scroll to top when navigation link is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/pricing", label: "Pricing" },
    { path: "/learn", label: "Learn" },
    { path: "/support", label: "Support" }
  ];

  return (
    <nav className="bg-qb-navy shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size="lg" linkTo="/" className="text-white" isAuthenticated={!!user} />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-qb-green bg-qb-navy/50"
                      : "text-white hover:text-qb-green"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/85 hover:text-qb-navy">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="qbPrimary" size="sm">
                Sign Up Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button and Download App */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="qbPrimary" 
              size="sm" 
              className="text-sm px-3 py-2"
              onClick={handleDownloadApp}
            >
              <Download className="w-4 h-4 mr-1" />
              Download App
            </Button>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-qb-green focus:outline-none focus:text-qb-green transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-qb-navy/95 backdrop-blur-md border-t border-qb-green/20">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-qb-green bg-qb-navy/50"
                      : "text-white hover:text-qb-green hover:bg-qb-navy/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Download Section */}
              <div className="pt-4 border-t border-qb-green/20 mt-4">
                <div className="px-3 py-2">
                  <p className="text-qb-green text-sm font-medium mb-2">Get the Mobile App</p>
                  <p className="text-white/80 text-xs mb-3">
                    Access all features on your mobile device
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="qbPrimary" 
                      size="sm" 
                      className="w-full justify-center"
                      onClick={handleDownloadApp}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download for iOS
                    </Button>
                    <Button 
                      variant="qbSecondary" 
                      size="sm" 
                      className="w-full justify-center"
                      onClick={handleDownloadApp}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download for Android
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;