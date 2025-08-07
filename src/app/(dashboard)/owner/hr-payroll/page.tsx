import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const HRPayrollPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("HR/Payroll");
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          This is a placeholder for the HR/Payroll page. Here, owners can onboard drivers for their buses, approve payroll distribution after trips, and resolve any payroll disputes.
        </p>
      </div>
    </div>
  );
};

export default HRPayrollPage;
