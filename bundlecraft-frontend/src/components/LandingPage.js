import React from 'react';

function Navbar({ onSignIn }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <span style={{ fontWeight: 700, fontSize: 22, color: '#3b82f6' }}>🎯 BundleCraft</span>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <a href="#features" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500, marginRight: 16 }}>Features</a>
        <a href="#how-it-works" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500, marginRight: 16 }}>How It Works</a>
        <a href="#pricing" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500, marginRight: 16 }}>Pricing</a>
        <a href="#demo" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500, marginRight: 16 }}>Demo</a>
        <button onClick={onSignIn} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;
