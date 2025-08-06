"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiBriefcase, FiDollarSign, FiBarChart2, FiHelpCircle } from 'react-icons/fi';
import { useSuperuserAuth } from '../lib/SuperuserAuthContext';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';
import ConnectionStatus from './ConnectionStatus';

const navLinks = [
  { name: 'Dashboard', href: '/superuser/dashboard', icon: <FiHome /> },
  { name: 'Performance', href: '/superuser/performance-dashboard', icon: <FiBarChart2 /> },
  { name: 'Users', href: '/superuser/users', icon: <FiUsers /> },
  { name: 'Saccos', href: '/superuser/sacco-management', icon: <FiBriefcase /> },
  { name: 'Support', href: '/superuser/support-management', icon: <FiHelpCircle /> },
  { name: 'Fees', href: '/superuser/fees-management', icon: <FiDollarSign /> },
  { name: 'Wallets', href: '/superuser/wallet-management', icon: <FiDollarSign /> },
  { name: 'Settings', href: '/superuser/settings', icon: <FiSettings /> },
];

export default function SuperuserSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useSuperuserAuth();

  return (
    <aside className={`flex-shrink-0 bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-2xl ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center justify-center px-4 text-2xl font-bold border-b border-gray-200 relative">
        {!isCollapsed && <Link href="/superuser/dashboard" className="text-purple-600">Superuser</Link>}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatedHamburgerIcon isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === link.href
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
            }`}
          >
            <div className="w-5 h-5">{link.icon}</div>
            {!isCollapsed && <span className="ml-3">{link.name}</span>}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 space-y-2">
        {!isCollapsed && <ConnectionStatus />}
        <Link href="/superuser/profile" className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 hover:bg-purple-100 hover:text-purple-600">
          <FiUsers className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Profile</span>}
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600"
        >
          <FiLogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
