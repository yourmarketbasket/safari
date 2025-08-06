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
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const redirectUser = (role: string) => {
    switch (role) {
      case 'admin':
        router.push('/admin');
        break;
      case 'sacco':
        router.push('/sacco');
        break;
      case 'owner':
        router.push('/owner');
        break;
      case 'passenger':
        router.push('/passenger');
        break;
      case 'support_staff':
        router.push('/support');
        break;
      case 'headoffice':
        router.push('/head-office');
        break;
      case 'queue_manager':
        router.push('/queue-manager');
        break;
      default:
        router.push('/login');
    }
  };

  const handleLogin = async (loginData: LoginCredentials) => {
    const responseData = await authService.login(loginData);

    if (responseData.mfaRequired) {
      setMfaToken(responseData.mfaToken);
    } else {
      setToken(responseData.token);
      setUser(responseData.user);
      localStorage.setItem('authToken', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      redirectUser(responseData.user.role);
    }
  };

  const handleVerifyMfa = async (mfaCode: string) => {
    if (!mfaToken) throw new Error("MFA token not available.");

    const verifyData: VerifyMfaData = { mfaToken, mfaCode };
    const responseData = await authService.verifyMfa(verifyData);

    if (responseData.mfaRequired) {
        // This would be an error case, e.g., invalid code
        throw new Error("MFA verification failed.");
    }

    setToken(responseData.token);
    setUser(responseData.user);
    localStorage.setItem('authToken', responseData.token);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    setMfaToken(null); // Clear MFA token
    redirectUser(responseData.user.role);
  };

  const handleCancelMfa = () => {
    setMfaToken(null);
  }

  const handleSignup = async (signupData: SignupData) => {
    await authService.signup(signupData);
    router.push('/login');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setMfaToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
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
