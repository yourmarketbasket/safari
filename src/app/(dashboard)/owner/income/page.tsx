"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const IncomePage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Income');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Income</h1>
      <p>This is the income page.</p>
    </div>
  );
};

export default IncomePage;
