"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import authService, { LoginCredentials, SignupData } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (loginData: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (signupData: SignupData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for a token in local storage on initial load
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // TODO: Add a call to a '/me' or '/verify-token' endpoint
      // to get user data and verify the token is still valid.
      // For now, we'll assume the token is valid if it exists.
      // const userData = await userService.getMe();
      // setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (loginData: LoginCredentials) => {
    try {
      const response = await authService.login(loginData);
      const { token, user } = response;
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      router.push('/dashboard'); // Redirect to a protected dashboard page
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to be caught by the UI component
    }
  };

  const handleSignup = async (signupData: SignupData) => {
     try {
      const response = await authService.signup(signupData);
      const { token, user } = response;
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    authService.logout();
    router.push('/login');
  };

  const value = {
    user,
    token,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
