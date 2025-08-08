"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const RouteManagementPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Route Management');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Route Management</h1>
      <p>This is the route management page.</p>
    </div>
  );
};

export default RouteManagementPage;
