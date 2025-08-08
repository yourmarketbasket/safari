"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripRegistrationPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Trip Registration');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Registration</h1>
      <p>This is the trip registration page.</p>
    </div>
  );
};

export default TripRegistrationPage;
