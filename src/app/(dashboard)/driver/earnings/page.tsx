"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const EarningsPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Earnings');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Earnings</h1>
      <p>This is the earnings page.</p>
    </div>
  );
};

export default EarningsPage;
