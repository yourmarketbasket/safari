import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const QueueManagementPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Queue Management");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Queue Management page. Here, Sacco staff will be able to add or remove buses from route queues, with specific queues for different classes. They will also be able to view the queue sorted by registration timestamp.
        </p>
      </div>
    </div>
  );
};

export default QueueManagementPage;
