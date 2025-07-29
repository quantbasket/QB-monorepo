import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6"; // Import icons

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/quantbasket", icon: <FaInstagram /> },
    { name: "Facebook", href: "https://www.facebook.com/quantbasket", icon: <FaFacebookF /> },
    { name: "X", href: "https://x.com/quantbasket", icon: <FaXTwitter /> },
    { name: "YouTube", href: "https://www.youtube.com/@quantbasket", icon: <FaYoutube /> }, // Adjusted YouTube link for typical channel URL
    { name: "LinkedIn", href: "https://www.linkedin.com/company/quantbasket", icon: <FaLinkedinIn /> },
  ];

  return (
    <footer className="bg-qb-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/qb_logo.webp"
                alt="QB Logo"
                className="w-10 h-10"
              />
              <span className="text-white font-bold text-xl">Quant Basket</span>
            </div>
            <p className="text-gray-300 mb-4">
              Revolutionary platform for community-based tokenization, quantitative strategies,
              and impact investing powered by advanced financial engineering.
            </p>
            {/* Social Media Icons Section */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-qb-green transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400 mt-4">
              <p>© 2024 Quant Basket. All rights reserved.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-qb-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-qb-green transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-qb-green transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-qb-green transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-qb-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-qb-green transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/community-tokens" className="text-gray-300 hover:text-qb-green transition-colors">
                  Community Tokens
                </Link>
              </li>
              {/* Updated links for Coming Soon pages */}
              <li>
                <Link to="/impact-coins" className="text-gray-300 hover:text-qb-green transition-colors">
                  Impact Coins
                </Link>
              </li>
              <li>
                <Link to="/quant-strategies" className="text-gray-300 hover:text-qb-green transition-colors">
                  Quant Strategies
                </Link>
              </li>
              <li>
                <Link to="/tokenized-portfolios" className="text-gray-300 hover:text-qb-green transition-colors">
                  Tokenised Portfolios
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Empowering the future of decentralized finance through quantitative innovation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;