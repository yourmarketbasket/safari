import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const EarningsPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Earnings");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Earnings page. Here, drivers can view their cut for each trip after the system fee has been deducted. They can also view their payment history.
        </p>
      </div>
    </div>
  );
};

export default EarningsPage;
