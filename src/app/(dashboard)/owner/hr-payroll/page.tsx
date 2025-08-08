"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const HRPayrollPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('HR & Payroll');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">HR & Payroll</h1>
      <p>This is the HR & Payroll page.</p>
    </div>
  );
};

export default HRPayrollPage;
