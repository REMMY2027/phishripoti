import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('it_token') || null);
  const [manager, setManager] = useState(
    JSON.parse(localStorage.getItem('it_manager') || 'null')
  );

  const login = (newToken, managerData) => {
    setToken(newToken);
    setManager(managerData);
    localStorage.setItem('it_token', newToken);
    localStorage.setItem('it_manager', JSON.stringify(managerData));
  };

  const logout = () => {
    setToken(null);
    setManager(null);
    localStorage.removeItem('it_token');
    localStorage.removeItem('it_manager');
  };

  return (
    <AuthContext.Provider value={{ token, manager, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
