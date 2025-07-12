import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

const appStyles = {
  fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
  background: '#f8fafc',
  minHeight: '100vh',
  margin: 0,
};

const cardStyles = {
  maxWidth: 600,
  margin: '40px auto',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: 32,
};

const userHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
};

const logoutButtonStyles = {
  background: '#ef4444',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 20px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  transition: 'background 0.2s',
};

const logoutButtonHoverStyles = {
  ...logoutButtonStyles,
  background: '#dc2626',
};

function MainApp() {
  const { user, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setIsLoading(true);
    setError('');
    try {
      await logout();
    } catch (err) {
      setError('Failed to log out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={appStyles}>
      <Navbar onSignIn={() => setShowSignIn(true)} />
      <div style={cardStyles}>
        {!user ? (
          showSignIn ? (
            <AuthPage />
          ) : (
            <LandingPage onSignIn={() => setShowSignIn(true)} />
          )
        ) : (
          <>
            <div style={userHeaderStyles}>
              <p style={{ fontWeight: 500, margin: 0 }}>Hello, {user.username}! You are logged in.</p>
              <button
                onClick={handleLogout}
                style={isLoading ? { ...logoutButtonStyles, opacity: 0.7, cursor: 'not-allowed' } : logoutButtonStyles}
                onMouseOver={(e) => (e.currentTarget.style.background = logoutButtonHoverStyles.background)}
                onMouseOut={(e) => (e.currentTarget.style.background = logoutButtonStyles.background)}
                disabled={isLoading}
              >
                {isLoading ? 'Logging Out...' : 'Logout'}
              </button>
            </div>
            {error && <p style={{ color: '#ef4444', margin: '10px 0' }}>{error}</p>}
            <Dashboard />
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
