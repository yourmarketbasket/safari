"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const QueueManagerDashboard = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Queue Manager Dashboard');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Queue Manager Dashboard</h1>
      <p>Welcome to the Queue Manager Dashboard.</p>
    </div>
  );
};

export default QueueManagerDashboard;
