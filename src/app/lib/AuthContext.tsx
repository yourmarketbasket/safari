"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import authService, { LoginCredentials, VerifyMfaData } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isMfaRequired: boolean;
  login: (loginData: LoginCredentials & { rememberMe?: boolean }) => Promise<void>;
  logout: () => void;
  verifyMfa: (mfaCode: string) => Promise<void>;
  cancelMfa: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const router = useRouter();

  const isMfaRequired = !!mfaToken;

  const redirectUser = (user: User, router: AppRouterInstance) => {
    if (user.role === 'Ordinary') {
      router.push('/pending-approval');
      return;
    }

    switch (user.role) {
      case 'Admin': router.push('/admin'); break;
      case 'Sacco': router.push('/sacco'); break;
      case 'Owner': router.push('/owner'); break;
      case 'Passenger': router.push('/passenger'); break;
      case 'Support_staff': router.push('/support'); break;
      case 'QueueManager': router.push('/queue-manager'); break;
      default: router.push('/login');
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setMfaToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    authService.logout();
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
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
    setLoading(true);
    try {
      const responseData = await authService.login(loginData);
      if (responseData.mfaRequired) {
        setMfaToken(responseData.mfaToken);
      } else {
        setToken(responseData.token);
        setUser(responseData.user);
        if (loginData.rememberMe) {
          localStorage.setItem('authToken', responseData.token);
          localStorage.setItem('user', JSON.stringify(responseData.user));
        } else {
          sessionStorage.setItem('authToken', responseData.token);
          sessionStorage.setItem('user', JSON.stringify(responseData.user));
        }
        redirectUser(responseData.user, router);
      }
    } catch (error) {
      console.error("Failed to login:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const verifyMfa = async (mfaCode: string) => {
    if (!mfaToken) throw new Error("MFA token not available.");
    setLoading(true);
    try {
      const verifyData: VerifyMfaData = { mfaToken, mfaCode };
      const responseData = await authService.verifyMfa(verifyData);
      if (!responseData.mfaRequired) {
        setToken(responseData.token);
        setUser(responseData.user);
        localStorage.setItem('authToken', responseData.token);
        setMfaToken(null);
        redirectUser(responseData.user, router);
      }
    } catch (error) {
      console.error("Failed to verify MFA:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const cancelMfa = () => {
    setMfaToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isMfaRequired,
    login,
    logout,
    verifyMfa,
    cancelMfa,
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
