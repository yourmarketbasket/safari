"use client";

import { useSuperuserAuth } from '../lib/SuperuserAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface SuperuserPrivateRouteProps {
  children: React.ReactNode;
}

export default function SuperuserPrivateRoute({ children }: SuperuserPrivateRouteProps) {
  const { user, token, isLoading } = useSuperuserAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!token) {
      router.push('/superuser/auth/login');
      return;
    }

    if (user && user.role !== 'superuser') {
      router.push('/superuser/auth/login');
    }
  }, [user, token, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!token || (user && user.role !== 'superuser')) {
    return null;
  }

  return <>{children}</>;
}
