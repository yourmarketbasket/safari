"use client";

import { useSuperuserAuth } from '../lib/SuperuserAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingOverlay from './LoadingOverlay';

interface SuperuserPrivateRouteProps {
  children: React.ReactNode;
}

export default function SuperuserPrivateRoute({ children }: SuperuserPrivateRouteProps) {
  const { user, token, loading } = useSuperuserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!token || !user || user.role !== 'superuser')) {
      router.push('/superuser/login');
    }
  }, [user, token, loading, router]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!token || !user || user.role !== 'superuser') {
    return null;
  }

  return <>{children}</>;
}
