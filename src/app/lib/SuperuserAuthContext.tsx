"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import superuserService, { LoginCredentials } from '../services/superuser.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';
import * as jose from 'jose';

interface SuperuserAuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (loginData: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const SuperuserAuthContext = createContext<SuperuserAuthContextType | undefined>(undefined);

export const SuperuserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('superuserAuthToken');
    localStorage.removeItem('superuser');
    router.push('/superuser/login');
  }, [router]);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('superuserAuthToken');
      if (storedToken) {
        try {
          const decodedToken = jose.decodeJwt(storedToken) as { id: string };
          if (decodedToken && decodedToken.id) {
            const userData = await superuserService.getUserById(decodedToken.id);
            setUser(userData);
            setToken(storedToken);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Failed to initialize auth:", error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [logout]);

  const login = async (loginData: LoginCredentials) => {
    setLoading(true);
    try {
      const responseData = await superuserService.login(loginData);
      if (!responseData.mfaRequired) {
        setToken(responseData.token);
        setUser(responseData.user);
        localStorage.setItem('superuserAuthToken', responseData.token);
        localStorage.setItem('superuser', JSON.stringify(responseData.user));
        router.push('/superuser/dashboard');
      }
    } catch (error) {
      console.error("Failed to login:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <SuperuserAuthContext.Provider value={value}>
      {children}
    </SuperuserAuthContext.Provider>
  );
};

export const useSuperuserAuth = () => {
  const context = useContext(SuperuserAuthContext);
  if (context === undefined) {
    throw new Error('useSuperuserAuth must be used within a SuperuserAuthProvider');
  }
  return context;
};
