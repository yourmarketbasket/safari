import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const RouteManagementPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Route Management");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Route Management page. Here, Sacco staff will be able to add, edit, and delete dynamic routes, including details like name, stops, distance, base fare, and class-specific fares. They will also be able to adjust fares based on factors like fuel prices and time of day, according to rules set by the Superuser.
        </p>
      </div>
    </div>
  );
};

export default RouteManagementPage;
