import React from 'react';

function Navbar({ onSignIn }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <span style={{ fontWeight: 700, fontSize: 22, color: '#3b82f6' }}>BundleCraft</span>
      <button onClick={onSignIn} style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Sign In</button>
    </nav>
  );
}

export default Navbar;
