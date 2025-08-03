import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-200">
            Important terms and conditions for using our platform
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-br from-qb-soft-gray to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-l-qb-blue">
              <h2 className="text-4xl font-bold mb-6 text-qb-navy">Terms of Service for Quant Basket</h2>

              <p className="mb-6 text-qb-dark-gray text-lg">
                Welcome to Quant Basket! These Terms of Service ("Terms") govern your use of the Quant Basket website and services related to tokenized portfolios, community coins, and impact coins (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">1. Acceptance of Terms</h2>
              <p className="mb-6 text-qb-dark-gray">
                By creating an account or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms, including our Privacy Policy. If you do not agree, do not use the Service.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">2. Eligibility</h2>
              <p className="mb-6 text-qb-dark-gray">
                You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you meet this age requirement.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">3. Your Account</h2>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You agree to provide accurate and complete information when creating your account.</li>
                <li>You must notify us immediately of any unauthorized use of your account.</li>
              </ul>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">4. Use of the Service</h2>
              <h3 className="text-2xl font-medium mb-3 text-qb-navy">4.1 Permitted Use:</h3>
              <p className="mb-4 text-qb-dark-gray">
                You may use the Service only for lawful purposes and in accordance with these Terms.
              </p>
              <h3 className="text-2xl font-medium mb-3 text-qb-navy">4.2 Prohibited Conduct:</h3>
              <p className="mb-4 text-qb-dark-gray">
                You agree not to engage in any prohibited activities, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-qb-dark-gray space-y-2">
                <li>Illegal activities, fraud, or money laundering.</li>
                <li>Attempting to interfere with the Service's operation.</li>
                <li>Using the Service for any unauthorized commercial purpose.</li>
              </ul>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">5. Disclaimers and Limitation of Liability</h2>
              <p className="mb-4 text-qb-dark-gray">
                The Service is provided "as is" without warranties of any kind. We do not provide financial, legal, or investment advice. You acknowledge that investing in tokenized assets and cryptocurrencies involves significant risks.
              </p>
              <p className="mb-6 text-qb-dark-gray">
                In no event shall Quant Basket be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">6. Intellectual Property</h2>
              <p className="mb-6 text-qb-dark-gray">
                All intellectual property rights in the Service are owned by Quant Basket or its licensors.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">7. Termination</h2>
              <p className="mb-6 text-qb-dark-gray">
                We may terminate or suspend your access to the Service at our sole discretion, However will provide prior notice through registered email, If you violate these Terms.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">8. Governing Law</h2>
              <p className="mb-6 text-qb-dark-gray">
                These Terms shall be governed by and construed in accordance with the laws of the State of Karnatak, India, without regard to its conflict of law principles.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">9. Changes to These Terms</h2>
              <p className="mb-6 text-qb-dark-gray">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and also by email to signed-up users.
              </p>

              <h2 className="text-3xl font-semibold mb-4 text-qb-navy">10. Contact Us</h2>
              <p className="mb-4 text-qb-dark-gray">
                If you have any questions about these Terms, please contact us at:
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

export default TermsOfService;
