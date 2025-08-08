"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripMonitoringPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Trip Monitoring');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trip Monitoring</h1>
      <p>This is the trip monitoring page.</p>
    </div>
  );
};

export default TripMonitoringPage;
