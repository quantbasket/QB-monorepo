// src/pages/PrivacyPolicy.tsx (or Privacy.tsx)

import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Privacy Policy for Quant Basket</h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        This Privacy Policy describes how Quant Basket ("we," "us," or "our") collects, uses, and discloses your personal information when you use our website and services related to tokenized portfolios, community coins, and impact coins (collectively, the "Service").
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
      <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">1.1 Personal Information You Provide:</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We collect personal information that you voluntarily provide to us when you register for the Service, use our features, or contact us. This may include:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>**Account Information:** Your name, email address, password (encrypted), and any other information you provide during registration.</li>
        <li>**Financial Information (if applicable):** Details related to your tokenized portfolio, crypto wallet addresses, transaction history, and investment preferences. (Be very specific about what is collected and why).</li>
        <li>**Communication Information:** Any information you provide when you contact our support team.</li>
        <li>**Google OAuth Data:** When you sign in with Google, we collect your email address and basic profile information (like your name) as provided by Google, in accordance with Google's policies and the scopes you authorize.</li>
        {/* Add more types of data collected */}
      </ul>

      <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">1.2 Automatically Collected Information:</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        When you access or use our Service, we may automatically collect certain information about your device and usage, including:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>IP address, browser type, operating system.</li>
        <li>Pages you view, features you use, and time spent on the Service.</li>
        <li>Referral URLs.</li>
        {/* Add more types of automatically collected data (e.g., cookies, analytics) */}
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. How We Use Your Information</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>To provide, maintain, and improve our Service.</li>
        <li>To process transactions and manage your tokenized portfolio.</li>
        <li>To communicate with you about your account or the Service.</li>
        <li>To personalize your experience.</li>
        <li>For security purposes, to detect and prevent fraud.</li>
        {/* Add more uses */}
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. How We Share Your Information</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may share your personal information in the following circumstances:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>**With Service Providers:** We may share information with third-party vendors, consultants, and other service providers who perform services on our behalf (e.g., hosting, analytics, payment processing).</li>
        <li>**For Legal Reasons:** If required by law, subpoena, or other legal process.</li>
        <li>**With Your Consent:** We may share your information with your consent or at your direction.</li>
        {/* Add more sharing scenarios */}
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Your Rights and Choices</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You may have certain rights regarding your personal information, including:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Accessing and updating your account information.</li>
        <li>Opting out of marketing communications.</li>
        <li>Requesting deletion of your data (subject to legal obligations).</li>
        {/* Add more rights as per relevant regulations like GDPR/CCPA */}
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Data Security</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is entirely secure.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Contact Us</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
