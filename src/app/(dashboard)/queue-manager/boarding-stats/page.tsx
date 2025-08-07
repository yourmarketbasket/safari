import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const BoardingStatsPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Boarding Stats");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Boarding Stats page. Here, queue managers will be able to view boarding statistics, delays, and class-specific updates in real-time.
        </p>
      </div>
    </div>
  );
};

export default BoardingStatsPage;
