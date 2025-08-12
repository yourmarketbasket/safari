"use client";

import { useSuperuserAuth } from '../lib/SuperuserAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingOverlay from './LoadingOverlay';

interface SuperuserPrivateRouteProps {
  children: React.ReactNode;
}

export default function SuperuserPrivateRoute({ children }: SuperuserPrivateRouteProps) {
  const { user, token, isInitialized } = useSuperuserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!token || (user && user.role !== 'superuser')) {
      router.push('/superuser/login');
    }
  }, [user, token, isInitialized, router]);

  if (!isInitialized || !token) {
    return <LoadingOverlay />;
  }

  if (user && user.role !== 'superuser') {
    return null;
  }

  return <>{children}</>;
}
