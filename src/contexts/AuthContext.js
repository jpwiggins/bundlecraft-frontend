import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState('');

  const login = (username, email) => {
    setUser({ username, email });
    // In a real app, you would get API key from backend after login
  };

  const logout = () => {
    setUser(null);
    setApiKey('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        apiKey,
        setApiKey,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
