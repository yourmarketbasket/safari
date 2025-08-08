"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const RevenuePage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Revenue');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Revenue</h1>
      <p>This is the revenue page.</p>
    </div>
  );
};

export default RevenuePage;
