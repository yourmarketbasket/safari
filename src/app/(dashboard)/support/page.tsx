"use client";

import Link from 'next/link';

const features = [
  { name: 'Sacco Management', href: '/support/sacco-management', description: 'Onboard, approve, or reject Sacco applications.' },
  { name: 'System Monitoring', href: '/support/system-monitoring', description: 'View real-time trips, buses, and system alerts.' },
  { name: 'Inquiry Management', href: '/support/inquiries', description: 'Handle inquiries regarding fares, loyalty, etc.' },
  { name: 'Driver Support', href: '/support/driver-support', description: 'Assist drivers with on-trip issues.' },
  { name: 'Cancellations & Reallocations', href: '/support/cancellations', description: 'Review reallocations and authorize refunds.' },
  { name: 'Payroll Disputes', href: '/support/payroll-disputes', description: 'Resolve payment issues for owners and drivers.' },
  { name: 'Reports', href: '/support/reports', description: 'Generate reports on various system activities.' },
  { name: 'Escalations', href: '/support/escalations', description: 'Escalate unresolved issues to system admins.' },
];

export default function SupportPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Support Staff Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Manage Saccos, monitor system health, and resolve user inquiries.
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
