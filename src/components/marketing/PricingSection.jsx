import React from 'react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section className="pricing">
      <h2 className="section-title">Simple Pricing</h2>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Monthly Plan</h3>
          <div className="pricing-price">$29<span>/month</span></div>
          <ul className="pricing-features">
            <li>Import unlimited Printify products</li>
            <li>Create unlimited bundles</li>
            <li>Generate optimized Etsy listings</li>
            <li>Smart pricing & tagging</li>
            <li>Copy/paste ready descriptions</li>
          </ul>
          <Link to="/signup?plan=monthly" className="btn btn-primary">Start Monthly</Link>
        </div>
        
        <div className="pricing-card featured">
          <div className="pricing-badge">Save 20%</div>
          <h3>Yearly Plan</h3>
          <div className="pricing-price">$279<span>/year</span></div>
          <ul className="pricing-features">
            <li>Everything in Monthly plan</li>
            <li>Save $69 per year</li>
            <li>Priority support</li>
            <li>Advanced analytics</li>
            <li>Early access to new features</li>
          </ul>
          <Link to="/signup?plan=yearly" className="btn btn-primary">Start Yearly</Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
