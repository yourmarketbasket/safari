"use client";

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import authService, { LoginCredentials, SignupData, VerifyMfaData } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';
import InactiveTab from '../components/InactiveTab';
import LoadingOverlay from '../components/LoadingOverlay';

type TabStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isMfaRequired: boolean;
  login: (loginData: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (signupData: SignupData) => Promise<void>;
  verifyMfa: (mfaCode: string) => Promise<void>;
  cancelMfa: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const [tabStatus, setTabStatus] = useState<TabStatus>('PENDING');
  const tabId = useRef<string | null>(null);

  const isMfaRequired = !!mfaToken;
  const router = useRouter();

  const handleTakeOver = useCallback(() => {
    if (tabId.current) {
      localStorage.setItem('activeTabId', tabId.current);
      setTabStatus('ACTIVE');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    setMfaToken(null);
    setIsLoading(true);
    if (tabId.current) {
      const activeTabId = localStorage.getItem('activeTabId');
      if (activeTabId === tabId.current) {
        localStorage.removeItem('activeTabId');
      }
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('superuserAuthToken');
    localStorage.removeItem('superuser');
    authService.logout();
    router.push('/login');
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
      if (event.key === 'logout-event') {
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
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser && storedUser !== 'undefined') {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const redirectUser = (user: User) => {
    if (user.role === 'ordinary' && user.rank === 'Ordinary' && user.approvedStatus === 'pending') {
      router.push('/pending-approval');
      return;
    }

    switch (user.role) {
      case 'admin': router.push('/admin'); break;
      case 'sacco': router.push('/sacco'); break;
      case 'owner': router.push('/owner'); break;
      case 'passenger': router.push('/passenger'); break;
      case 'support_staff': router.push('/support'); break;
      case 'queue_manager': router.push('/queue-manager'); break;
      default: router.push('/login');
    }
  };

  const handleLogin = async (loginData: LoginCredentials) => {
    const responseData = await authService.login(loginData);

    if (responseData.mfaRequired) {
      setMfaToken(responseData.mfaToken);
    } else {
      localStorage.removeItem('superuserAuthToken');
      localStorage.removeItem('superuser');

      setToken(responseData.token);
      setUser(responseData.user);
      localStorage.setItem('authToken', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      if (tabId.current) {
        localStorage.setItem('activeTabId', tabId.current);
      }
      localStorage.setItem('logout-event', Date.now().toString());
      setTabStatus('ACTIVE');
      redirectUser(responseData.user);
    }
  };

  const handleVerifyMfa = async (mfaCode: string) => {
    if (!mfaToken) throw new Error("MFA token not available.");

    const verifyData: VerifyMfaData = { mfaToken, mfaCode };
    const responseData = await authService.verifyMfa(verifyData);

    if (responseData.mfaRequired) {
      throw new Error("MFA verification failed.");
    }

    setToken(responseData.token);
    setUser(responseData.user);
    localStorage.setItem('authToken', responseData.token);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    setMfaToken(null);
    redirectUser(responseData.user);
  };

  const handleCancelMfa = () => {
    setMfaToken(null);
  };

  const handleSignup = async (signupData: SignupData) => {
    await authService.signup(signupData);
    router.push('/login');
  };

  const value = {
    user,
    token,
    isLoading,
    isMfaRequired,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
    verifyMfa: handleVerifyMfa,
    cancelMfa: handleCancelMfa,
  };

  if (tabStatus === 'PENDING') {
    return <LoadingOverlay />;
  }

  if (tabStatus === 'INACTIVE' && token) {
    return <InactiveTab onTakeOver={handleTakeOver} />;
  }

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
