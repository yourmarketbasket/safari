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
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!token || !user) {
      router.push('/login');
      return;
    }

    if (user.role === 'ordinary') {
      router.push('/pending-approval');
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.push('/dashboard');
    }
  }, [user, token, loading, router, allowedRoles]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!token || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
