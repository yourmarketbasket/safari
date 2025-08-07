import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripsPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Trips");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Trips page. Here, owners will be able to view assigned trips, including details like route, time, passengers, class, and any cancellations.
        </p>
      </div>
    </div>
  );
};

export default TripsPage;
