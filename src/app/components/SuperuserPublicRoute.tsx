"use client";

import { useSuperuserAuth } from '../lib/SuperuserAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuperuserPublicRoute({ children }: { children: React.ReactNode }) {
  const { user, token, isLoading } = useSuperuserAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (token && user) {
      router.push('/superuser/dashboard');
    }
  }, [user, token, isLoading, router]);

    if (token) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return <>{children}</>;
}
