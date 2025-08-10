"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import superuserService, { LoginCredentials } from '../services/superuser.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';
import InactiveTab from '../components/InactiveTab';

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
  const [isTabActive, setIsTabActive] = useState(false);
  const [tabId, setTabId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = sessionStorage.getItem('tabId') || `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem('tabId', id);
    setTabId(id);
  }, []);

  const handleTakeOver = useCallback(() => {
    if (tabId) {
      localStorage.setItem('activeTabId', tabId);
      setIsTabActive(true);
    }
  }, [tabId]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsInitialized(false);
    const activeTabId = localStorage.getItem('activeTabId');
    if (tabId && activeTabId === tabId) {
      localStorage.removeItem('activeTabId');
    }
    localStorage.removeItem('superuserAuthToken');
    localStorage.removeItem('superuser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/superuser/login');
  }, [router, tabId]);

  useEffect(() => {
    if (!tabId) return;

    const checkActiveTab = () => {
      const activeTabId = localStorage.getItem('activeTabId');
      if (!activeTabId) {
        localStorage.setItem('activeTabId', tabId);
        setIsTabActive(true);
      } else {
        setIsTabActive(activeTabId === tabId);
      }
    };

    checkActiveTab();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'activeTabId') {
        setIsTabActive(event.newValue === tabId);
      }
      if (event.key === 'logout-event' || (event.key === 'superuserAuthToken' && event.newValue === null)) {
        handleLogout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tabId, handleLogout]);

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
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        setToken(responseData.token);
        setUser(responseData.user);
        localStorage.setItem('superuserAuthToken', responseData.token);
        localStorage.setItem('superuser', JSON.stringify(responseData.user));
        if (tabId) {
          localStorage.setItem('activeTabId', tabId);
        }
        localStorage.setItem('logout-event', Date.now().toString());
        setIsTabActive(true);
        window.location.href = '/superuser/dashboard';
    }
  };

  useEffect(() => {
    if (!tabId) return;
      const releaseTab = () => {
          const activeTabId = localStorage.getItem('activeTabId');
          if (activeTabId === tabId) {
              localStorage.removeItem('activeTabId');
          }
      };
      window.addEventListener('beforeunload', releaseTab);
      return () => {
          window.removeEventListener('beforeunload', releaseTab);
      };
  }, [tabId]);

  const value = {
    user,
    token,
    isInitialized,
    login: handleLogin,
    logout: handleLogout,
  };

  if (!isTabActive && token) {
    return <InactiveTab onTakeOver={handleTakeOver} />;
  }

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
