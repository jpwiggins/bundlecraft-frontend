import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 32px',
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const navButtonStyles = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  transition: 'background 0.2s',
};

function Navbar({ onSignIn }) {
  const { user } = useAuth();

  return (
    <nav style={navbarStyles}>
      <h1 style={{ margin: 0, fontSize: 24 }}>MyApp</h1>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => console.log('Home clicked')}
          style={navButtonStyles}
          onMouseOver={(e) => (e.currentTarget.style.background = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#007bff')}
          aria-label="Go to home page"
        >
          Home
        </button>
        {!user && (
          <button
            onClick={onSignIn}
            style={navButtonStyles}
            onMouseOver={(e) => (e.currentTarget.style.background = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#007bff')}
            aria-label="Sign in"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
