import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { apiClient } from '../api/client';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const access = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');
      const savedUser = localStorage.getItem('user');

      if (access && refresh && savedUser) {
        try {
          setState((prev) => ({
            ...prev,
            access,
            refresh,
            user: JSON.parse(savedUser),
            isAuthenticated: true,
            loading: false,
          }));

          // Optionally verify/refresh profile on app load
          const response = await apiClient.get('/auth/me/');
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user));
          setState((prev) => ({ ...prev, user }));
        } catch (error) {
          // Token is likely invalid or server is down
          console.error("Auth hydration failed:", error);
          // If 401 interceptor didn't handle it, we'll keep the offline state
          // or clean up if it was a definitive 401
          if (axiosIsUnauthorized(error)) {
            clearAuthStorage();
          } else {
            setState((prev) => ({ ...prev, loading: false }));
          }
        }
      } else {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  const axiosIsUnauthorized = (error: any) => {
    return error.response?.status === 401;
  };

  const clearAuthStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setState({
      user: null,
      access: null,
      refresh: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const login = async (username: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await apiClient.post('/auth/login/', { username, password });
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      setState({
        user,
        access,
        refresh,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = () => {
    clearAuthStorage();
  };

  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setState((prev) => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
