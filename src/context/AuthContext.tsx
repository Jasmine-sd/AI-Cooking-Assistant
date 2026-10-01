import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserPreferences } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, passwordPlain: string) => Promise<void>;
  loginDemo: () => Promise<void>;
  register: (name: string, email: string, passwordPlain: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  updatePantry: (pantry: string[]) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSession = async () => {
    const token = localStorage.getItem('cook_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await api.getMe();
      setUser(res.user);
    } catch (e) {
      console.warn('Session check:', e);
      localStorage.removeItem('cook_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = async (email: string, passwordPlain: string) => {
    const res = await api.login(email, passwordPlain);
    localStorage.setItem('cook_token', res.token);
    setUser(res.user);
  };

  const loginDemo = async () => {
    try {
      const res = await api.loginDemo();
      localStorage.setItem('cook_token', res.token);
      setUser(res.user);
    } catch (e) {
      console.warn('loginDemo error, falling back:', e);
      const res = await api.login('demo@culinarycompanion.com', 'Demo123!');
      localStorage.setItem('cook_token', res.token);
      setUser(res.user);
    }
  };

  const register = async (name: string, email: string, passwordPlain: string) => {
    const res = await api.register(name, email, passwordPlain);
    localStorage.setItem('cook_token', res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('cook_token');
    setUser(null);
  };

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    if (!user) return;
    const res = await api.updateProfile(user.id, { preferences: prefs });
    setUser(res.user);
  };

  const updatePantry = async (pantry: string[]) => {
    if (!user) return;
    const res = await api.updateProfile(user.id, { pantry });
    setUser(res.user);
  };

  const toggleFavorite = async (recipeId: string) => {
    if (!user) return;
    const updatedFavorites = await api.toggleFavorite(user.id, recipeId);
    setUser({ ...user, favorites: updatedFavorites });
  };

  const isFavorite = (recipeId: string): boolean => {
    return !!user?.favorites?.includes(recipeId);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    loginDemo,
    register,
    logout,
    updatePreferences,
    updatePantry,
    toggleFavorite,
    isFavorite
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
