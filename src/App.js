import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import './App.css';

function MainApp() {
  const { user, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="app-container">
      <Navbar onSignIn={() => setShowSignIn(true)} />
      <div className="card">
        {!user ? (
          showSignIn ? (
            <AuthPage />
          ) : (
            <LandingPage onSignIn={() => setShowSignIn(true)} />
          )
        ) : (
          <>
            <div className="user-header">
              <p>Hello, {user.username}! You are logged in.</p>
              <button onClick={logout} className="logout-btn">Logout</button>
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
