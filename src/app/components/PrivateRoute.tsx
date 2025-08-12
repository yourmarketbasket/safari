"use client";

import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingOverlay from './LoadingOverlay';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, token, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!token) {
      router.push('/login');
      return;
    }

    if (user) {
      if (user.role === 'ordinary') {
        router.push('/pending-approval');
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        router.push('/dashboard');
      }
    }
  }, [user, token, isInitialized, router, allowedRoles]);

  if (!isInitialized || !token || (user && !allowedRoles.includes(user.role))) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
}
