"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const VehicleManagementPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Vehicle Management');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
      <p>This is the vehicle management page.</p>
    </div>
  );
};

export default VehicleManagementPage;
