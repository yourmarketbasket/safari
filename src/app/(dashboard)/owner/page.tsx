"use client";

import Link from 'next/link';

const features = [
  { name: 'My Trips', href: '/owner/trips', description: 'View all trips assigned to your vehicles.' },
  { name: 'Income', href: '/owner/income', description: 'View earnings per trip and access payroll history.' },
  { name: 'Vehicle Details', href: '/owner/vehicles', description: 'Manage the details of your owned vehicles.' },
  { name: 'HR / Payroll', href: '/owner/hr', description: 'Onboard drivers and manage payroll for your buses.' },
];

export default function OwnerDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Owner Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Manage your vehicles, drivers, and earnings.
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
  );
}
