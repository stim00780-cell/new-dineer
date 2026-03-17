'use client';
import { useState, useEffect } from 'react';

export default function PrivacyPage() {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString());
    }, []);

    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="lead">Last updated: {lastUpdated}</p>
  
          <h2>Introduction</h2>
          <p>
            Welcome to Dinner O'Clock. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
  
          <h2>Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, postal address, phone number, and payment information when you register, place an order, or subscribe to our newsletter. We also collect non-personal information, such as browser type, operating system, and website usage data.
          </p>
  
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process your transactions and manage your orders.</li>
            <li>Provide, operate, and maintain our website.</li>
            <li>Improve, personalize, and expand our website.</li>
            <li>Understand and analyze how you use our website.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
            <li>Send you emails.</li>
            <li>Find and prevent fraud.</li>
          </ul>
  
          <h2>Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </p>
  
          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
  
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. You can do this by logging into your account or by contacting us directly.
          </p>
  
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@dinneroclock.com.
          </p>
        </div>
      </div>
    );
  }
