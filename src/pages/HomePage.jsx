import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Welcome to BundleCraft</h1>
      <p>Create profitable product bundles for your Etsy store</p>
      <div style={{ marginTop: 20 }}>
        <Link to="/login" style={{
          background: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: 6,
          textDecoration: 'none'
        }}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
