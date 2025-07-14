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

function AuthPage({ onBack }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, email);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontSize: 16,
            cursor: 'pointer',
            marginRight: 12,
            padding: '4px 8px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          ← Back
        </button>
        <h2 style={{ color: '#2563eb', margin: 0 }}>Sign Up / Log In</h2>
      </div>
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
          <label style={labelStyles}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyles}
            placeholder="Enter your email address"
          />
        </div>
        <button type="submit" style={buttonStyles}>Sign Up / Log In</button>
      </form>
    </div>
  );
}

export default AuthPage;
