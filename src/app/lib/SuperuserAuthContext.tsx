"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import superuserService, { LoginCredentials } from '../services/superuser.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';
import InactiveTab from '../components/InactiveTab';
import LoadingOverlay from '../components/LoadingOverlay';

type TabStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE';

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
  const [tabStatus, setTabStatus] = useState<TabStatus>('PENDING');
  const tabId = useRef<string | null>(null);
  const router = useRouter();

  const handleTakeOver = useCallback(() => {
    if (tabId.current) {
      localStorage.setItem('activeTabId', tabId.current);
      setTabStatus('ACTIVE');
    }
  }, []);

  const handleLogout = useCallback(() => {
    if (tabId.current) {
        const activeTabId = localStorage.getItem('activeTabId');
        if (activeTabId === tabId.current) {
            localStorage.removeItem('activeTabId');
        }
    }
    setUser(null);
    setToken(null);
    setIsInitialized(false);
    localStorage.removeItem('superuserAuthToken');
    localStorage.removeItem('superuser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/superuser/login');
  }, [router]);

  useEffect(() => {
    tabId.current = sessionStorage.getItem('tabId') || `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem('tabId', tabId.current);

    const checkActiveTab = () => {
      const activeTabId = localStorage.getItem('activeTabId');
      if (!activeTabId) {
        localStorage.setItem('activeTabId', tabId.current!);
        setTabStatus('ACTIVE');
      } else {
        setTabStatus(activeTabId === tabId.current ? 'ACTIVE' : 'INACTIVE');
      }
    };

    checkActiveTab();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'activeTabId') {
        setTabStatus(event.newValue === tabId.current ? 'ACTIVE' : 'INACTIVE');
      }
       if (event.key === 'superuserAuthToken' && event.newValue === null) {
          handleLogout();
      }
    };

    const releaseTab = () => {
        const activeTabId = localStorage.getItem('activeTabId');
        if (activeTabId === tabId.current) {
            localStorage.removeItem('activeTabId');
        }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('beforeunload', releaseTab);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', releaseTab);
    };
  }, [handleLogout]);

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
        // Superusers might not have MFA
    } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        if (tabId.current) {
          localStorage.setItem('activeTabId', tabId.current);
        }
        setTabStatus('ACTIVE');
        setToken(responseData.token);
        setUser(responseData.user);
        localStorage.setItem('superuserAuthToken', responseData.token);
        localStorage.setItem('superuser', JSON.stringify(responseData.user));
        window.location.href = '/superuser/dashboard';
    }
  };

  const value = {
    user,
    token,
    isInitialized,
    login: handleLogin,
    logout: handleLogout,
  };

  if (!isInitialized || (tabStatus === 'PENDING' && token)) {
    return <LoadingOverlay />;
  }

  if (tabStatus === 'INACTIVE' && token) {
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
