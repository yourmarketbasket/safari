import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const QueueManagerDashboard = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Queue Manager Dashboard");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          Welcome to the Queue Manager dashboard. Please use the sidebar to navigate to the available pages.
        </p>
      </div>
    </div>
  );
};

export default QueueManagerDashboard;
