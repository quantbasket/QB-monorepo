// src/pages/ComingSoon.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Hourglass } from "lucide-react"; // Changed icon to Hourglass for "coming soon" feel

interface ComingSoonProps {
  title: string;
  subtitle: string; // For the funny subtle statement
}

const ComingSoon = ({ title, subtitle }: ComingSoonProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            {/* Changed icon to Hourglass */}
            <Hourglass className="w-24 h-24 text-qb-green mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold text-qb-navy mb-4">{title}</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Changed "Return to Homepage" to "Other Products" and linked to /products */}
            <Link to="/products">
              <Button variant="qbSecondary" size="lg" className="text-lg px-8">
                Other Products
              </Button>
            </Link>
            {/* Removed the Contact Support Button */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;