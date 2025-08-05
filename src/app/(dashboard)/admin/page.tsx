"use client";

import Link from 'next/link';

const features = [
  { name: 'Performance Monitoring', href: '/admin/performance-monitoring', description: 'View metrics on support staff performance.' },
  { name: 'Escalation Queue', href: '/admin/escalation-queue', description: 'Resolve issues escalated by support staff.' },
  { name: 'System Reports', href: '/admin/system-reports', description: 'Analyze system-wide data and generate reports.' },
];

import PrivateRoute from '@/app/components/PrivateRoute';

export default function AdminPage() {
  return (
    <PrivateRoute allowedRoles={['admin']}>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Monitor system health, manage escalations, and analyze performance.
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
