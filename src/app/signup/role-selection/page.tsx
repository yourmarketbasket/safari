import { Metadata } from 'next';
import Link from 'next/link';
import { FiUser, FiUsers, FiBriefcase, FiClipboard, FiTruck, FiUserCheck } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Role Selection',
};

const roles = [
  { name: 'Passenger', href: '/signup/passenger', icon: <FiUser className="h-12 w-12" />, description: 'For booking trips and managing your travel.', color: 'text-blue-500' },
  { name: 'Sacco', href: '/signup/sacco', icon: <FiUsers className="h-12 w-12" />, description: 'For managing your transport business.', color: 'text-green-500' },
  { name: 'Owner', href: '/signup/owner', icon: <FiBriefcase className="h-12 w-12" />, description: 'For managing your vehicles and income.', color: 'text-purple-500' },
  { name: 'Queue Manager', href: '/signup/queue-manager', icon: <FiClipboard className="h-12 w-12" />, description: 'For managing queues and ticketing.', color: 'text-pink-500' },
  { name: 'Driver', href: '/signup/driver', icon: <FiTruck className="h-12 w-12" />, description: 'For managing your trips and earnings.', color: 'text-yellow-500' },
  { name: 'Staff', href: '/signup/staff', icon: <FiUserCheck className="h-12 w-12" />, description: 'For internal staff members.', color: 'text-teal-500' },
];

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12">
      <div className="w-full max-w-6xl p-8 space-y-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Choose Your Role</h1>
        <p className="mt-4 text-xl text-gray-600">
          Select the role that best describes you to get started with Safary.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-12">
          {roles.map((role) => (
            <div key={role.name} className="relative flex flex-col rounded-2xl bg-white shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl ${role.color}`}>
                  {role.icon}
                </div>
              </div>
              <div className="flex-grow p-8 pt-20">
                <h3 className="text-3xl font-bold text-gray-800">{role.name}</h3>
                <p className="mt-4 text-gray-600">{role.description}</p>
                <div className="mt-8">
                  <p className="text-5xl font-extrabold text-gray-800">Free</p>
                  <p className="text-sm text-gray-500">Forever</p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-b-2xl">
                <Link href={role.href} passHref>
                  <div className="block w-full py-3 px-6 text-center text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    Select
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
