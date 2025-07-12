import React from 'react';

const landingStyles = {
  textAlign: 'center',
  padding: 20,
};

const buttonStyles = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 500,
  transition: 'background 0.2s',
};

function LandingPage({ onSignIn }) {
  return (
    <div style={landingStyles}>
      <h2 style={{ fontSize: 28, margin: '0 0 16px' }}>Welcome to MyApp</h2>
      <p style={{ margin: '0 0 20px', fontSize: 16 }}>Sign in to access your dashboard.</p>
      <button
        onClick={onSignIn}
        style={buttonStyles}
        onMouseOver={(e) => (e.currentTarget.style.background = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.background = '#007bff')}
        aria-label="Sign in"
      >
        Sign In
      </button>
    </div>
  );
}

export default LandingPage;
