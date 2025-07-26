import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation"; // Assuming Navigation is used throughout
import Footer from "@/components/Footer"; // Assuming Footer is used throughout
import { Frown } from "lucide-react"; // A relevant icon for "not found"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <Frown className="w-24 h-24 text-qb-green mx-auto mb-4" />
            <h1 className="text-6xl font-extrabold text-qb-navy mb-4">404</h1>
            <p className="text-2xl text-qb-dark-gray font-semibold mb-4">Oops! Page Not Found</p>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="qbSecondary" size="lg" className="text-lg px-8">
                Return to Homepage
              </Button>
            </Link>
            {/* Optionally, add another button for support or other relevant links */}
            <Link to="/contact"> {/* Assuming a contact page exists */}
              <Button variant="outline" size="lg" className="text-lg px-8 border-qb-blue text-qb-blue hover:bg-qb-blue hover:text-white">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;