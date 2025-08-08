"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const QueueManagementPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Queue Management');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Queue Management</h1>
      <p>This is the queue management page.</p>
    </div>
  );
};

export default QueueManagementPage;
