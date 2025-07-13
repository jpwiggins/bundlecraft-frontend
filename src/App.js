import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BundleProvider } from './contexts/BundleContext';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BundleProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BundleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
