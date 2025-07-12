import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

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
  return (
    <div style={appStyles}>
      <div style={cardStyles}>
        <h1 style={{ color: '#3b82f6', marginBottom: 24 }}>BundleCraft</h1>
        {!user ? (
          <AuthPage />
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
