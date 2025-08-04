import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-200">
            How we protect and handle your personal information
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-br from-qb-soft-gray to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-l-qb-green">
              <h2 className="text-4xl font-bold mb-6 text-qb-navy">Privacy Policy for Quant Basket</h2>

              <p className="mb-6 text-qb-dark-gray text-lg">
                This Privacy Policy describes how Quant Basket ("we," "us," or "our") collects, uses, and discloses your personal information when you use our website and services related to tokenized portfolios, community coins, and impact coins (collectively, the "Service").
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">1. Information We Collect</h2>
              <h3 className="text-2xl font-medium mb-3 text-qb-navy">1.1 Personal Information You Provide:</h3>
              <p className="mb-4 text-qb-dark-gray">
                We collect personal information that you voluntarily provide to us when you register for the Service, use our features, or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li><strong>Account Information:</strong> Your name, email address, password (encrypted), and any other information you provide during registration.</li>
                <li><strong>Financial Information (if applicable):</strong> Details related to your tokenized portfolio, crypto wallet addresses, transaction history, and investment preferences.</li>
                <li><strong>Communication Information:</strong> Any information you provide when you contact our support team.</li>
                <li><strong>Google OAuth Data:</strong> When you sign in with Google, we collect your email address and basic profile information (like your name) as provided by Google, in accordance with Google's policies and the scopes you authorize.</li>
              </ul>

              <h3 className="text-2xl font-medium mb-3 text-qb-navy">1.2 Automatically Collected Information:</h3>
              <p className="mb-4 text-qb-dark-gray">
                When you access or use our Service, we may automatically collect certain information about your device and usage, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li>IP address, browser type, operating system.</li>
                <li>Pages you view, features you use, and time spent on the Service.</li>
                <li>Referral URLs.</li>
              </ul>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">2. How We Use Your Information</h2>
              <p className="mb-4 text-qb-dark-gray">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li>To provide, maintain, and improve our Service.</li>
                <li>To process transactions and manage your tokenized portfolio.</li>
                <li>To communicate with you about your account or the Service.</li>
                <li>To personalize your experience.</li>
                <li>For security purposes, to detect and prevent fraud.</li>
              </ul>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">3. How We Share Your Information</h2>
              <p className="mb-4 text-qb-dark-gray">
                We may share your personal information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li><strong>With Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who perform services on our behalf (e.g., hosting, analytics, payment processing).</li>
                <li><strong>For Legal Reasons:</strong> If required by law, subpoena, or other legal process.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your consent or at your direction.</li>
              </ul>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">4. Your Rights and Choices</h2>
              <p className="mb-4 text-qb-dark-gray">
                You may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li>Accessing and updating your account information.</li>
                <li>Opting out of marketing communications.</li>
                <li>Requesting deletion of your data (subject to legal obligations).</li>
              </ul>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">5. Data Security</h2>
              <p className="mb-6 text-qb-dark-gray">
                We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is entirely secure.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">6. Changes to This Policy</h2>
              <p className="mb-6 text-qb-dark-gray">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">7. Contact Us</h2>
              <p className="mb-4 text-qb-dark-gray">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-8 text-qb-dark-gray">
                <strong>Email:</strong> support@quantbasket.com
              </p>

              <p className="text-sm text-gray-500">
                Last updated: July 25, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
