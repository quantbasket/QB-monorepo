import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Frown } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <Frown className="w-24 h-24 text-qb-green mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold text-qb-navy mb-4">Oops! This page got liquidated</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Error 404, We couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="qbSecondary" size="lg" className="text-lg px-8">
                Return to Homepage
              </Button>
            </Link>
            {/* Contact Support Button - uses mailto link but displays generic text */}
            <a href="mailto:support@quantbasket.com">
              <Button variant="outline" size="lg" className="text-lg px-8 border-qb-blue text-qb-blue hover:bg-qb-blue hover:text-white">
                Contact Support
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;