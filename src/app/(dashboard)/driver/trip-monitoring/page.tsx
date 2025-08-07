import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TripMonitoringPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Trip Monitoring");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Trip Monitoring page. Here, drivers can view trip registrations, see mid-trip passengers, and view any reassigned passengers. They can also see class details and finalize the dynamic route.
        </p>
      </div>
    </div>
  );
};

export default TripMonitoringPage;
