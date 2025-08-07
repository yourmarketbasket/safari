import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const PassengerVerificationPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Passenger Verification");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Passenger Verification page. Here, drivers can scan QR codes for passenger boarding and disembarkation. This will also update seat availability for mid-trip exits, specific to each class.
        </p>
      </div>
    </div>
  );
};

export default PassengerVerificationPage;
