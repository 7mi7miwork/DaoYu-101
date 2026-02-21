import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedAuth = localStorage.getItem('dao-yu-auth');
        if (storedAuth) {
          const parsedUser = JSON.parse(storedAuth);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        localStorage.removeItem('dao-yu-auth');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('dao-yu-auth', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dao-yu-auth');
  };

  const register = (userData) => {
    // Mock registration - same as login for now
    login(userData);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
