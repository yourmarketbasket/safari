"use client";

import Link from 'next/link';

const features = [
  {
    name: 'Support Staff Management',
    href: '/head-office/support-staff',
    description: 'Add, edit, or remove support staff members and manage their roles.',
  },
  {
    name: 'System Oversight',
    href: '/head-office/system-oversight',
    description: 'View key system metrics for Saccos, trips, revenue, and more.',
  },
  {
    name: 'Policy Management',
    href: '/head-office/policy-management',
    description: 'Define system-wide policies for fares, fees, and loyalty programs.',
  },
];

import PrivateRoute from '@/app/components/PrivateRoute';

export default function HeadOfficePage() {
  return (
    <PrivateRoute allowedRoles={['headoffice']}>
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Head Office Dashboard</h1>
        <p className="mt-2 text-gray-600">
          As a Superuser, you have full administrative control over the system.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.name} href={feature.href} passHref>
              <div className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <h2 className="text-lg font-bold text-gray-900">{feature.name}</h2>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
}
