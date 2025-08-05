"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import authService, { LoginCredentials, SignupData, VerifyMfaData } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import { User } from '../models/User.model';

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

  const isMfaRequired = !!mfaToken;
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // In a real app, you would also fetch user data here.
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (loginData: LoginCredentials) => {
    const response = await authService.login(loginData);
    if (response.mfaRequired) {
      setMfaToken(response.mfaToken);
    } else {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
      router.push('/dashboard');
    }
  };

  const handleVerifyMfa = async (mfaCode: string) => {
    if (!mfaToken) throw new Error("MFA token not available.");

    const verifyData: VerifyMfaData = { mfaToken, mfaCode };
    const response = await authService.verifyMfa(verifyData);

    if (response.mfaRequired) {
        // This would be an error case, e.g., invalid code
        throw new Error("MFA verification failed.");
    }

    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('authToken', response.token);
    setMfaToken(null); // Clear MFA token
    router.push('/dashboard');
  };

  const handleCancelMfa = () => {
    setMfaToken(null);
  }

  const handleSignup = async (signupData: SignupData) => {
    const response = await authService.signup(signupData);
    if (response.mfaRequired) {
        setMfaToken(response.mfaToken);
    } else {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('authToken', response.token);
        router.push('/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setMfaToken(null);
    localStorage.removeItem('authToken');
    authService.logout();
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
