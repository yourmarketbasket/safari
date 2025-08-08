"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripCompletionPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Trip Completion');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Completion</h1>
      <p>This is the trip completion page.</p>
    </div>
  );
};

export default TripCompletionPage;
