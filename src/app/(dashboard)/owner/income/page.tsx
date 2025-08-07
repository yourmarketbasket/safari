import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const IncomePage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Income");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the Income page. Here, owners will be able to view their earnings per trip after all deductions (Sacco, driver, and system fees). They will also have access to their payroll history.
        </p>
      </div>
    </div>
  );
};

export default IncomePage;
