"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import superuserService, { LoginCredentials, AuthResponse, ErrorResponse } from '../services/superuser.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';

interface SuperuserAuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (loginData: LoginCredentials & { rememberMe?: boolean }) => Promise<{ success: false; error?: string; message?: string; } | null>;
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
    sessionStorage.removeItem('superuserAuthToken');
    sessionStorage.removeItem('superuser');
    router.push('/superuser/login');
  }, [router]);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('superuserAuthToken') || sessionStorage.getItem('superuserAuthToken');
      const storedUser = localStorage.getItem('superuser') || sessionStorage.getItem('superuser');
      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [logout]);

  const login = async (loginData: LoginCredentials & { rememberMe?: boolean }) => {
    const response = await superuserService.login(loginData);
    if (response.success) {
      const authData = (response as AuthResponse).data;
      if (!authData.mfaRequired) {
        setToken(authData.token);
        setUser(authData.user);
        if (loginData.rememberMe) {
          localStorage.setItem('superuserAuthToken', authData.token);
          localStorage.setItem('superuser', JSON.stringify(authData.user));
        } else {
          sessionStorage.setItem('superuserAuthToken', authData.token);
          sessionStorage.setItem('superuser', JSON.stringify(authData.user));
        }
        router.push('/superuser/dashboard');
      }
      return null;
    } else {
      return response as ErrorResponse;
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
