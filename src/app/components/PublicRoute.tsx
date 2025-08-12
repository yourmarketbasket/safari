"use client";

import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (token && user) {
      // Redirect to a default page or an unauthorized page
      switch (user.role) {
        case 'Admin':
          router.push('/admin');
          break;
        case 'Sacco':
          router.push('/sacco');
          break;
        case 'Owner':
          router.push('/owner');
          break;
        case 'Passenger':
          router.push('/passenger');
          break;
        case 'Support_staff':
          router.push('/support');
          break;
        default:
          router.push('/dashboard');
      }
    }
  }, [user, token, loading, router]);

  if (loading || token) {
    return null;
  }


  return <>{children}</>;
}
