"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const VehicleDetailsPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Vehicle Details');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Details</h1>
      <p>This is the vehicle details page.</p>
    </div>
  );
};

export default VehicleDetailsPage;
