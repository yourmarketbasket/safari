"use client";

import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, token, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

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
  }, [user, token, isInitialized, router]);

    if (token) {
    return null;
  }


  return <>{children}</>;
}
