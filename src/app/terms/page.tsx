'use client';
import { useState, useEffect } from 'react';

export default function TermsPage() {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString());
    }, []);

    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl">Terms of Service</h1>
          <p className="lead">Last updated: {lastUpdated}</p>
  
          <h2>1. Agreement to Terms</h2>
          <p>
            By using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
  
          <h2>2. Services</h2>
          <p>
            Dinner O'Clock provides a meal delivery service. We reserve the right to modify or discontinue the service at any time without notice.
          </p>
  
          <h2>3. Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
          </p>
  
          <h2>4. Payments and Subscriptions</h2>
          <p>
            We offer both prepaid and postpaid subscription plans. By subscribing to our service, you agree to pay the fees associated with your chosen plan. All payments are processed through a third-party payment processor (e.g., Stripe).
          </p>
  
          <h2>5. User Conduct</h2>
          <p>
            You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the service in any way that could damage the service, the business of Dinner O'Clock, or any user.
          </p>
  
          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Dinner O'Clock, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
  
          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.
          </p>
  
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@dinneroclock.com.
          </p>
        </div>
      </div>
    );
  }
