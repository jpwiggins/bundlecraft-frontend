import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ErrorBoundary from './components/ErrorBoundary';
import performanceMonitor from './utils/performance';

function MainApp() {
  const { user, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    performanceMonitor.mark('app-start');
    const timer = setTimeout(() => {
      performanceMonitor.reportMetrics();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, Arial, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar onSignIn={() => setShowSignIn(true)} />
      
      <main style={{ padding: '40px 5%', maxWidth: 1200, margin: '0 auto' }}>
        {!user ? (
          showSignIn ? (
            <AuthPage />
          ) : (
            <LandingPage onSignIn={() => setShowSignIn(true)} />
          )
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <p style={{ fontSize: 18, fontWeight: 500 }}>👋 Hello, {user.username}!</p>
              <button
                onClick={logout}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 20px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
            <Dashboard />
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
