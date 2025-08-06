"use client";

import PrivateRoute from '@/app/components/PrivateRoute';

export default function SupportPage() {
  return (
    <PrivateRoute allowedRoles={['support_staff']}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Support Staff Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the support staff dashboard. Please use the sidebar to navigate to the different sections.
        </p>
      </div>
    </PrivateRoute>
  );
}
