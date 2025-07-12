import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const dashboardStyles = {
  textAlign: 'center',
  padding: 20,
};

const buttonStyles = {
  background: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  transition: 'background 0.2s',
  margin: '0 8px',
};

function Dashboard() {
  const { user, apiKey } = useAuth();

  return (
    <div style={dashboardStyles}>
      <h2 style={{ fontSize: 24, margin: '0 0 16px' }}>Dashboard</h2>
      <p style={{ margin: '0 0 20px' }}>Welcome, {user.username}! Your API key: {apiKey.substring(0, 8)}...</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          onClick={() => console.log('View Profile clicked')}
          style={buttonStyles}
          onMouseOver={(e) => (e.currentTarget.style.background = '#218838')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#28a745')}
          aria-label="View profile"
        >
          View Profile
        </button>
        <button
          onClick={() => console.log('Settings clicked')}
          style={buttonStyles}
          onMouseOver={(e) => (e.currentTarget.style.background = '#218838')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#28a745')}
          aria-label="View settings"
        >
          Settings
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
