import { Metadata } from 'next';
import Link from 'next/link';
import { FiUser, FiUsers, FiBriefcase, FiClipboard, FiTruck, FiUserCheck } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Role Selection',
};

const roles = [
  { name: 'Passenger', href: '/signup/passenger', icon: <FiUser className="h-16 w-16" />, color: 'bg-blue-500', pulse: 'animate-pulse-blue' },
  { name: 'Sacco', href: '/signup/sacco', icon: <FiUsers className="h-16 w-16" />, color: 'bg-green-500', pulse: 'animate-pulse-green' },
  { name: 'Owner', href: '/signup/owner', icon: <FiBriefcase className="h-16 w-16" />, color: 'bg-purple-500', pulse: 'animate-pulse-purple' },
  { name: 'Queue Manager', href: '/signup/queue-manager', icon: <FiClipboard className="h-16 w-16" />, color: 'bg-pink-500', pulse: 'animate-pulse-pink' },
  { name: 'Driver', href: '/signup/driver', icon: <FiTruck className="h-16 w-16" />, color: 'bg-yellow-500', pulse: 'animate-pulse-yellow' },
  { name: 'Staff', href: '/signup/staff', icon: <FiUserCheck className="h-16 w-16" />, color: 'bg-teal-500', pulse: 'animate-pulse-teal' },
];

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white py-12">
      <div className="w-full max-w-5xl p-8 space-y-12 text-center">
        <h1 className="text-5xl font-bold">Choose Your Role</h1>
        <p className="mt-4 text-xl text-gray-400">
          Select the role that best describes you to get started with Safary.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 pt-12">
          {roles.map((role) => (
            <Link href={role.href} key={role.name} passHref>
              <div className="group flex flex-col items-center space-y-4 cursor-pointer">
                <div className={`relative w-40 h-40 rounded-full flex items-center justify-center text-white transition-transform duration-300 ease-in-out transform group-hover:scale-110 ${role.color} ${role.pulse}`}>
                  {role.icon}
                </div>
                <p className="text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{role.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
