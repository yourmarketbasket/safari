"use client";
import React from 'react';

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const TicketScanningPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Ticket Scanning');
  }, [setTitle]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Scanning</h1>
      <p>This is the ticket scanning page.</p>
    </div>
  );
};

export default TicketScanningPage;
