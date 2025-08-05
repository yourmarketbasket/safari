"use client";

import Link from 'next/link';

const features = [
  { name: 'Route Management', href: '/sacco/route-management', description: 'Add, edit, or remove your Sacco&apos;s routes.' },
  { name: 'Vehicle Management', href: '/sacco/vehicle-management', description: 'Manage your fleet of vehicles.' },
  { name: 'Driver Management', href: '/sacco/driver-management', description: 'Onboard and manage your drivers.' },
  { name: 'Revenue', href: '/sacco/revenue', description: 'View trip revenue and system deductions.' },
  { name: 'Promotions', href: '/sacco/promotions', description: 'Create discounts and manage loyalty programs.' },
  { name: 'HR / Payroll', href: '/sacco/hr', description: 'Manage driver contracts and process payroll.' },
];

import PrivateRoute from '@/app/components/PrivateRoute';

export default function SaccoDashboardPage() {
  return (
    <PrivateRoute allowedRoles={['sacco']}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Sacco Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage all aspects of your Sacco&apos;s operations from here.
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
