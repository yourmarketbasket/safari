"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import superuserService, { LoginCredentials } from '../services/superuser.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';

interface SuperuserAuthContextType {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  login: (loginData: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const SuperuserAuthContext = createContext<SuperuserAuthContextType | undefined>(undefined);

export const SuperuserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('superuserAuthToken');
    const storedUser = localStorage.getItem('superuser');
    if (storedToken && storedUser && storedUser !== 'undefined') {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);


  const handleLogin = async (loginData: LoginCredentials) => {
    const responseData = await superuserService.login(loginData);
    if (responseData.mfaRequired) {
        // Superusers might not have MFA, so this needs to be handled
    } else {
        // Clear normal user data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        setToken(responseData.token);
        setUser(responseData.user);
        localStorage.setItem('superuserAuthToken', responseData.token);
        localStorage.setItem('superuser', JSON.stringify(responseData.user));
        router.push('/superuser/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsInitialized(false); // Reset initialization state
    localStorage.removeItem('superuserAuthToken');
    localStorage.removeItem('superuser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/superuser/login');
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'superuserAuthToken' && event.newValue === null) {
        setUser(null);
        setToken(null);
        setIsInitialized(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = {
    user,
    token,
    isInitialized,
    login: handleLogin,
    logout: handleLogout,
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
