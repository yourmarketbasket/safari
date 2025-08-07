import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripCompletionPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Trip Completion");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Trip Completion page. Here, drivers can submit a trip summary, which will trigger the payroll process.
        </p>
      </div>
    </div>
  );
};

export default TripCompletionPage;
