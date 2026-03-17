'use client';
import { useState, useEffect } from 'react';

export default function RefundPage() {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString());
    }, []);
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl">Refund Policy</h1>
          <p className="lead">Last updated: {lastUpdated}</p>
  
          <h2>General Policy</h2>
          <p>
            At Dinner O'Clock, we strive to provide the best quality meals and service. Due to the perishable nature of our products, we do not offer refunds on meals that have been delivered. However, we are committed to customer satisfaction and will address issues on a case-by-case basis.
          </p>
  
          <h2>Damaged or Incorrect Orders</h2>
          <p>
            If you receive a meal that is damaged, incorrect, or not up to our quality standards, please contact our customer support within 24 hours of delivery. We may require a photo of the item in question. Upon verification, we may offer a credit to your account or a replacement meal in your next delivery.
          </p>
  
          <h2>Subscription Cancellations</h2>
          <p>
            You can cancel your subscription at any time through your account dashboard.
          </p>
          <ul>
            <li>For weekly plans, cancellations must be made at least 3 business days before your next scheduled delivery to avoid being charged for that week.</li>
            <li>For monthly plans, cancellations will take effect at the end of the current billing cycle. No partial refunds will be issued for the remainder of the month.</li>
          </ul>
  
          <h2>How to Request a Credit or Report an Issue</h2>
          <p>
            To report an issue with your order, please contact our customer support team with your order number and a detailed description of the problem.
          </p>
          <ul>
            <li>Email: support@dinneroclock.com</li>
            <li>Phone: +1 (234) 567-890</li>
          </ul>
  
          <h2>Changes to This Policy</h2>
          <p>
            We reserve the right to modify this refund policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.
          </p>
        </div>
      </div>
    );
  }
