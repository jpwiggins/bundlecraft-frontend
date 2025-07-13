import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FeatureSection from '../components/marketing/FeatureSection';
import HowItWorks from '../components/marketing/HowItWorks';
import DashboardDemo from '../components/marketing/DashboardDemo';
import StatsGrid from '../components/marketing/StatsGrid';

const HomePage = () => {
  const apiStatusRef = useRef(null);
  
  useEffect(() => {
    // Check API status when component mounts
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/health`);
        if (response.ok) {
          apiStatusRef.current.textContent = '✅ Backend API Running';
        }
      } catch (error) {
        apiStatusRef.current.textContent = '⚠️ API Connection Issue';
        apiStatusRef.current.style.background = '#fef3c7';
        apiStatusRef.current.style.color = '#92400e';
      }
    };
    
    checkApiStatus();
    
    // Analytics
    analytics.trackPageView('Home Page');
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Turn Printify Products Into Profitable Bundles</h1>
          <p>Import products, create smart bundles of 2-8 items, generate copy-paste ready Etsy listings with optimized pricing and tags!</p>
          
          <StatsGrid />
          
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
    </div>
  );
};

export default HomePage;
