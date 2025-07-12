import React from 'react';

function LandingPage({ onSignIn }) {
  return (
    <>
      <style>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }
        .hero h1 {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .hero p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
          font-size: 1.1rem;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        .btn-primary:hover {
          background: #2563eb;
        }
        .btn-secondary {
          background: white;
          color: #3b82f6;
          border: 2px solid #3b82f6;
        }
        .btn-secondary:hover {
          background: #3b82f6;
          color: white;
        }
      `}</style>
      <section className="hero">
        <h1>Turn Printify Products Into Profitable Bundles</h1>
        <p>Import products, create smart bundles of 2-8 items, generate copy-paste ready Etsy listings with optimized pricing and tags!</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onSignIn}>Get Started</button>
          <button className="btn btn-primary" style={{ background: '#10b981' }} onClick={onSignIn}>Try Demo</button>
          <button className="btn btn-secondary" onClick={() => window.scrollTo({top: 1000, behavior: 'smooth'})}>Learn More</button>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
