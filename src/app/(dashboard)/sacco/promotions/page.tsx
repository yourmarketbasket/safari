import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const PromotionsPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Promotions");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Promotions page. Here, Sacco staff will be able to create, edit, and delete discounts, such as percentage-based or fixed-amount discounts. They will also manage the loyalty program, including awarding points and setting redemption thresholds.
        </p>
      </div>
    </div>
  );
};

export default PromotionsPage;
