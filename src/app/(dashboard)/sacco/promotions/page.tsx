"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const PromotionsPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Promotions');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Promotions</h1>
      <p>This is the promotions page.</p>
    </div>
  );
};

export default PromotionsPage;
