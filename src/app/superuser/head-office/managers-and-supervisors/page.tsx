"use client";

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

export default function ManagersAndSupervisorsPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Managers and Supervisors");
  }, [setTitle]);

  return (
    <div>
      <p className="mt-4 text-gray-600">This page is under construction. Functionality for managing managers and supervisors will be implemented here.</p>
    </div>
  );
}
