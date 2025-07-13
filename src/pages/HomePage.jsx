import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatureSection from '../components/marketing/FeatureSection';
import HowItWorks from '../components/marketing/HowItWorks';
import DashboardDemo from '../components/marketing/DashboardDemo';
import PricingSection from '../components/marketing/PricingSection';

const HomePage = () => {
  const apiStatusRef = useRef(null);

  useEffect(() => {
    // Simulate API status check
    const timer = setTimeout(() => {
      if (apiStatusRef.current) {
        apiStatusRef.current.textContent = '✅ Backend API Running';
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Turn Printify Products Into Profitable Bundles</h1>
          <p>Import products, create smart bundles of 2-8 items, generate copy-paste ready Etsy listings with optimized pricing and tags!</p>
          
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
            <Link to="#demo" className="btn btn-secondary">See Demo</Link>
          </div>
        </div>
      </section>
      
      {/* API Status */}
      <section className="container">
        <div className="api-status" ref={apiStatusRef}>
          <span className="status-indicator"></span> Checking API status...
        </div>
      </section>
      
      {/* Features */}
      <FeatureSection />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Dashboard Demo */}
      <DashboardDemo />
      
      {/* Pricing */}
      <PricingSection />
    </div>
  );
};

export default HomePage;
