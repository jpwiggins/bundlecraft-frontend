import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  background: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0'
};

const AuthPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, email);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '24px' }}>
        Sign Up / Log In
      </h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
            placeholder="Enter your email address"
          />
        </div>
        <button
          type="submit"
          style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 0',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Sign Up / Log In
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
