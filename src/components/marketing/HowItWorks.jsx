import React from 'react';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: 'Sign Up & Subscribe', description: 'Create account and choose your plan. Secure Stripe payment processing with monthly or yearly billing options.' },
    { number: 2, title: 'Import Products', description: 'Connect your Printify account using your API key. All products imported instantly to your dashboard.' },
    { number: 3, title: 'Create Bundles', description: 'Select 2-8 products to bundle. Smart pricing and automatic SKU generation for optimal profitability.' },
    { number: 4, title: 'Generate Listings', description: 'Get copy-paste ready Etsy listings with SEO-optimized content. Ready to post and start selling!' }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How BundleCraft Works</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
