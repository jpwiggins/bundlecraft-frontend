import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
};
const labelStyles = {
  fontWeight: 500,
  marginBottom: 6,
};
const inputStyles = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  fontSize: 16,
};
const buttonStyles = {
  background: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 0',
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: 10,
};

function AuthPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, apiKey);
  };

  return (
    <div>
      <h2 style={{ color: '#2563eb', marginBottom: 18 }}>Sign Up / Log In</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div>
          <label style={labelStyles}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={inputStyles}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label style={labelStyles}>Printify API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            required
            style={inputStyles}
            placeholder="Paste your Printify API key"
          />
        </div>
        <button type="submit" style={buttonStyles}>Sign Up / Log In</button>
      </form>
    </div>
  );
}

export default AuthPage;
