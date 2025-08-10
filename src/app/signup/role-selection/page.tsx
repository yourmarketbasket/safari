import { Metadata } from 'next';
import Link from 'next/link';
import { FiUser, FiUsers, FiBriefcase, FiClipboard, FiTruck, FiUserCheck } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Role Selection',
};

const roles = [
  { name: 'Passenger', href: '/signup/passenger', icon: <FiUser className="h-12 w-12 mx-auto text-indigo-600" /> },
  { name: 'Sacco', href: '/signup/sacco', icon: <FiUsers className="h-12 w-12 mx-auto text-indigo-600" /> },
  { name: 'Owner', href: '/signup/owner', icon: <FiBriefcase className="h-12 w-12 mx-auto text-indigo-600" /> },
  { name: 'Queue Manager', href: '/signup/queue-manager', icon: <FiClipboard className="h-12 w-12 mx-auto text-indigo-600" /> },
  { name: 'Driver', href: '/signup/driver', icon: <FiTruck className="h-12 w-12 mx-auto text-indigo-600" /> },
  { name: 'Staff', href: '/signup/staff', icon: <FiUserCheck className="h-12 w-12 mx-auto text-indigo-600" /> },
];

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Role</h1>
        <p className="mt-2 text-lg text-gray-700">
          Select the role that best describes you to get started with Safary.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
          {roles.map((role) => (
            <Link href={role.href} key={role.name} passHref>
              <div className="p-8 bg-indigo-50 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
                <div className="mb-4">{role.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900">{role.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
