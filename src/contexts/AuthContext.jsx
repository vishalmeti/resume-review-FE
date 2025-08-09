import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          // Verify token is still valid
          const response = await api('/auth/profile', {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });
          setUser(response.user);
          setToken(savedToken);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      const { user, token } = response;
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const register = async (username, password, email) => {
    try {
      const response = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email })
      });

      const { user, token } = response;
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    // Clear any cached data
    sessionStorage.clear();
  };

  const updateProfile = async (updates) => {
    try {
      const response = await api('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Update failed' 
      };
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
