import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TicketScanningPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Ticket Scanning");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Ticket Scanning page. Here, queue managers will be able to scan QR code tickets using a webcam. The page will display passenger details, queue position, class, and boarding status.
        </p>
      </div>
    </div>
  );
};

export default TicketScanningPage;
