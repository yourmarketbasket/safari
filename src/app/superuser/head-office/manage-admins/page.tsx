"use client";

import { useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

export default function ManageAdminsPage() {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Manage Admins");
  }, [setTitle]);

  return (
    <div>
      <p className="mt-4 text-gray-600">This page is under construction. Functionality for managing admins will be implemented here.</p>
    </div>
  );
}
