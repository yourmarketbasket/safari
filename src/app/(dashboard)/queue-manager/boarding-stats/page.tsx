"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const BoardingStatsPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Boarding Stats');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Boarding Stats</h1>
      <p>This is the boarding stats page.</p>
    </div>
  );
};

export default BoardingStatsPage;
