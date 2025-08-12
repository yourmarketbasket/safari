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
