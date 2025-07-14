import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState('');

  const login = (username, email) => {
    setUser({ username, email });
    // For demo purposes, we'll set a placeholder API key
    // In a real app, this would come from your backend after authentication
    setApiKey('your-printify-api-key-here');
  };

  const logout = () => {
    setUser(null);
    setApiKey('');
  };

  return (
    <AuthContext.Provider value={{ user, apiKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
