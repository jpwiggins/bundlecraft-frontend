import React from 'react';

const FeatureSection = () => {
  const features = [
    { icon: '🔐', title: 'Stripe Authentication', description: 'Complete sign up/sign in flow with Stripe subscription integration. Monthly ($29) and yearly ($279) plans.' },
    { icon: '📱', title: 'Professional UI', description: 'Modern React frontend with Etsy/Printify-style design. Responsive, clean, and user-friendly interface.' },
    { icon: '📦', title: 'Product Import', description: 'Connect Printify account with API key and import all products. Dashboard to manage and view all imported items.' },
    { icon: '🎯', title: 'Smart Bundling', description: 'Create bundles with 2-8 products. AI-powered pricing, auto-generated SKUs, and optimized product combinations.' },
    { icon: '📝', title: 'Etsy Listing Generator', description: 'Copy-paste ready listings with SEO-optimized titles, descriptions, tags, and smart pricing for maximum sales.' },
    { icon: '📊', title: 'Complete Dashboard', description: 'Manage products, create bundles, view analytics, and generate listings all from one powerful dashboard.' }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">✅ All Features Implemented</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
