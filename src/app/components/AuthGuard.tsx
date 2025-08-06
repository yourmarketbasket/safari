"use client";

import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingOverlay from './LoadingOverlay';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      if (window.location.pathname.startsWith('/homekeeping/general/superuser')) {
        router.push('/homekeeping/general/auth/login');
      } else {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
};

export default AuthGuard;
