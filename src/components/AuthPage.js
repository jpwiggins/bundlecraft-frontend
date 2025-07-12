import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  maxWidth: 400,
  margin: '0 auto',
};

const formGroupStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const inputStyles = {
  padding: 10,
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: 16,
  fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
};

const buttonStyles = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 500,
  transition: 'background 0.2s, opacity 0.2s',
};

const buttonDisabledStyles = {
  ...buttonStyles,
  opacity: 0.7,
  cursor: 'not-allowed',
};

function AuthPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (!username || !apiKey) {
        throw new Error('Username and API key are required');
      }
      login(username, apiKey);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2 style={{ margin: 0, textAlign: 'center', fontSize: 24 }}>Sign In</h2>
      <div style={formGroupStyles}>
        <label htmlFor="username" style={{ fontWeight: 500 }}>Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyles}
          required
          placeholder="Enter your username"
          aria-label="Username"
        />
      </div>
      <div style={formGroupStyles}>
        <label htmlFor="apiKey" style={{ fontWeight: 500 }}>API Key</label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={inputStyles}
          required
          placeholder="Enter your API key"
          aria-label="API key"
        />
      </div>
      {error && <p style={{ color: '#ef4444', margin: '10px 0', textAlign: 'center' }}>{error}</p>}
      <button
        type="submit"
        style={isLoading ? buttonDisabledStyles : buttonStyles}
        onMouseOver={(e) => !isLoading && (e.currentTarget.style.background = '#0056b3')}
        onMouseOut={(e) => !isLoading && (e.currentTarget.style.background = '#007bff')}
        disabled={isLoading}
        aria-label="Sign in"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}

export default AuthPage;
