import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const RevenuePage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Revenue");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Revenue page. Here, Sacco staff will be able to view trip revenue, system fee deductions, and the impact of discounts. The page will also feature analytics and charts for better financial insights.
        </p>
      </div>
    </div>
  );
};

export default RevenuePage;
