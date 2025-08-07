import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const VehicleDetailsPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Vehicle Details");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Vehicle Details page. Here, owners will be able to add or edit details for their buses, such as license plate, capacity, condition, and class.
        </p>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
