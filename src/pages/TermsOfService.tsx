// src/pages/TermsOfService.tsx (or Terms.tsx)

import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Terms of Service for Quant Basket</h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to Quant Basket! These Terms of Service ("Terms") govern your use of the Quant Basket website and services related to tokenized portfolios, community coins, and impact coins (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        By creating an account or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms, including our Privacy Policy. If you do not agree, do not use the Service.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Eligibility</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You must be at least [Specify Age, e.g., 18] years old to use the Service. By using the Service, you represent and warrant that you meet this age requirement.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. Your Account</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>You agree to provide accurate and complete information when creating your account.</li>
        <li>You must notify us immediately of any unauthorized use of your account.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Use of the Service</h2>
      <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">4.1 Permitted Use:</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You may use the Service only for lawful purposes and in accordance with these Terms.
      </p>
      <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">4.2 Prohibited Conduct:</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You agree not to engage in any prohibited activities, including:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Illegal activities, fraud, or money laundering.</li>
        <li>Attempting to interfere with the Service's operation.</li>
        <li>Using the Service for any unauthorized commercial purpose.</li>
        {/* Add more prohibited actions */}
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Disclaimers and Limitation of Liability</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The Service is provided "as is" without warranties of any kind. We do not provide financial, legal, or investment advice. You acknowledge that investing in tokenized assets and cryptocurrencies involves significant risks.
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        In no event shall Quant Basket be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
      </p>
      {/* This section is very important - needs careful legal drafting */}

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Intellectual Property</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        All intellectual property rights in the Service are owned by Quant Basket or its licensors.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Termination</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may terminate or suspend your access to the Service at our sole discretion, without prior notice or liability.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Governing Law</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., the State of Delaware, USA], without regard to its conflict of law principles.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">9. Changes to These Terms</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">10. Contact Us</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        If you have any questions about these Terms, please contact us at:
      </p>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        **Email:** [your support email here, e.g., support@quantbasket.com]
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last updated: July 25, 2025
      </p>
    </div>
  );
};

export default TermsOfService;
