"use client";

import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!token) {
      router.push('/login');
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect to a default page or an unauthorized page
      router.push('/dashboard'); // Or a new '/unauthorized' page
    }
  }, [user, token, isLoading, router, allowedRoles]);

  if (isLoading || !token || (user && !allowedRoles.includes(user.role))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
