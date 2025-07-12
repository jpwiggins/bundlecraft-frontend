import React from 'react';

function LandingPage({ onSignIn }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 18 }}>Turn Printify Products Into Profitable Bundles</h2>
      <p style={{ fontSize: 20, color: '#64748b', marginBottom: 32 }}>
        Import products, create smart bundles, and generate copy-paste ready Etsy listings with optimized pricing and tags!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
        <button onClick={onSignIn} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 36px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}>Get Started</button>
        <button onClick={onSignIn} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 36px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}>Try Demo</button>
      </div>
    </div>
  );
}

export default LandingPage;
