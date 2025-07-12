import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

const appStyles = {
  fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
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

function MainApp() {
  const { user, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  // Show dashboard if logged in, sign-in if requested, else landing page
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <p style={{ fontWeight: 500 }}>Hello, {user.username}! You are logged in.</p>
              <button onClick={logout} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Logout</button>
            </div>
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
