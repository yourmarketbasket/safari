"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUsers, FiShield, FiTruck, FiUser, FiPocket, FiList, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../lib/AuthContext';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';

const allNavLinks = {
  admin: [
    { name: 'Dashboard', href: '/admin', icon: <FiShield /> },
    { name: 'Escalation Queue', href: '/admin/escalation-queue', icon: <FiList /> },
  ],
  sacco: [
    { name: 'Dashboard', href: '/sacco', icon: <FiTruck /> },
    { name: 'Route Management', href: '/sacco/route-management', icon: <FiList /> },
  ],
  owner: [
    { name: 'Dashboard', href: '/owner', icon: <FiUser /> },
    { name: 'My Trips', href: '/owner/trips', icon: <FiList /> },
  ],
  passenger: [
    { name: 'Dashboard', href: '/passenger', icon: <FiPocket /> },
  ],
  support: [
    { name: 'Dashboard', href: '/support', icon: <FiUsers /> },
    { name: 'Sacco Management', href: '/support/sacco-management', icon: <FiTruck /> },
  ],
  headoffice: [
    { name: 'Dashboard', href: '/head-office', icon: <FiHome /> },
    { name: 'Policy Management', href: '/head-office/policy-management', icon: <FiList /> },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navLinks = user ? allNavLinks[user.role] || [] : [];

  return (
    <aside className={`flex-shrink-0 bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-2xl ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center justify-between px-4 text-2xl font-bold border-b border-gray-200">
        {!isCollapsed && <Link href="/dashboard" className="text-purple-600">Safary</Link>}
        <AnimatedHamburgerIcon onClick={() => setIsCollapsed(!isCollapsed)} isCollapsed={isCollapsed} />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              }`}
            >
              <div className="w-6 h-6">{link.icon}</div>
              {!isCollapsed && <span className="ml-4">{link.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 space-y-2">
        <Link href="/profile" className="flex items-center px-4 py-3 text-base font-semibold rounded-lg text-gray-600 hover:bg-purple-100 hover:text-purple-600">
          <FiUser className="w-6 h-6" />
          {!isCollapsed && <span className="ml-4">Profile</span>}
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-base font-semibold rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600"
        >
          <FiLogOut className="w-6 h-6" />
          {!isCollapsed && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
