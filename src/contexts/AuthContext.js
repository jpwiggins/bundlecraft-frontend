import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState('');

  const login = (username, apiKeyInput) => {
    setUser({ username });
    setApiKey(apiKeyInput);
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
