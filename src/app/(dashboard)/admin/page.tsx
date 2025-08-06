"use client";

import PrivateRoute from '@/app/components/PrivateRoute';

export default function AdminPage() {
  return (
    <PrivateRoute allowedRoles={['admin']}>
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the admin dashboard. Please use the sidebar to navigate to the different sections.
        </p>
      </div>
    </PrivateRoute>
  );
}
