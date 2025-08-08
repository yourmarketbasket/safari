"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripsPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Trips');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trips</h1>
      <p>This is the trips page.</p>
    </div>
  );
};

export default TripsPage;
