"use client";

import { useAuth } from '../lib/AuthContext';
import MfaDialog from './MfaDialog';
import LoadingOverlay from './LoadingOverlay';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useSocketStore from '../store/socket.store';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isMfaRequired, verifyMfa, cancelMfa, isInitialized } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 500); // Adjust timeout as needed
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleMfaSubmit = async (mfaCode: string) => {
    setLoading(true);
    setError(null);
    try {
      await verifyMfa(mfaCode);
      // On success, the context will handle redirect
    } catch (err) {
      setError('Invalid MFA code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {(!isInitialized || isNavigating) && <LoadingOverlay />}
      {children}
      <MfaDialog
        isOpen={isMfaRequired}
        onClose={cancelMfa}
        onSubmit={handleMfaSubmit}
        isLoading={loading}
        error={error}
      />
    </>
  );
}
