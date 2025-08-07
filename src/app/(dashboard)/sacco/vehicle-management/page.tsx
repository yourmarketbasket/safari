import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const VehicleManagementPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Vehicle Management");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Vehicle Management page. Here, Sacco staff will be able to add, edit, and delete buses, with details such as license plate, capacity, owner, condition, and class (Economy, Business, First Class). They will also assign buses to approved Saccos.
        </p>
      </div>
    </div>
  );
};

export default VehicleManagementPage;
