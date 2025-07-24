import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-qb-navy shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/977e6583-c44a-4ad1-9a2c-b7784357eafc.png" 
                alt="QB Logo" 
                className="w-10 h-10"
              />
              <span className="text-white font-bold text-xl">Quant Basket</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/")
                    ? "text-qb-green bg-qb-navy/50"
                    : "text-white hover:text-qb-green"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/about")
                    ? "text-qb-green bg-qb-navy/50"
                    : "text-white hover:text-qb-green"
                }`}
              >
                About
              </Link>
              <Link
                to="/products"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/products")
                    ? "text-qb-green bg-qb-navy/50"
                    : "text-white hover:text-qb-green"
                }`}
              >
                Products
              </Link>
              <Link
                to="/pricing"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/pricing")
                    ? "text-qb-green bg-qb-navy/50"
                    : "text-white hover:text-qb-green"
                }`}
              >
                Pricing
              </Link>
              <Link
                to="/support"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/support")
                    ? "text-qb-green bg-qb-navy/50"
                    : "text-white hover:text-qb-green"
                }`}
              >
                Support
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;