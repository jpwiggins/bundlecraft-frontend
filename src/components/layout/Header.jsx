import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">🎯 BundleCraft</Link>
          
          <div className="nav-links">
            <Link to="/#features" className={location.pathname === '/' ? 'active' : ''}>Features</Link>
            <Link to="/#how-it-works" className={location.pathname === '/' ? 'active' : ''}>How It Works</Link>
            <Link to="/#pricing" className={location.pathname === '/' ? 'active' : ''}>Pricing</Link>
            <Link to="/#demo" className={location.pathname === '/' ? 'active' : ''}>Demo</Link>
          </div>
          
          <div>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
            ) : (
              <Link to="/login" className="btn btn-primary">Get Started</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
