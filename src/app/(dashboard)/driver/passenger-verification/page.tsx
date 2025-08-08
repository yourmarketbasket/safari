"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const PassengerVerificationPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Passenger Verification');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Passenger Verification</h1>
      <p>This is the passenger verification page.</p>
    </div>
  );
};

export default PassengerVerificationPage;
