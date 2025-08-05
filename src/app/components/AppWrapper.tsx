"use client";

import { useAuth } from '../lib/AuthContext';
import MfaDialog from './MfaDialog';
import { useState } from 'react';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isMfaRequired, verifyMfa, cancelMfa } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
