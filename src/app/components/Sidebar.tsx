"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// A simple placeholder icon component
const PlaceholderIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: <PlaceholderIcon /> },
  { name: 'Head Office', href: '/head-office', icon: <PlaceholderIcon /> },
  { name: 'Support Staff', href: '/support', icon: <PlaceholderIcon /> },
  { name: 'Admin', href: '/admin', icon: <PlaceholderIcon /> },
  { name: 'Sacco', href: '/sacco', icon: <PlaceholderIcon /> },
  { name: 'Owner', href: '/owner', icon: <PlaceholderIcon /> },
  { name: 'Queue Manager', href: '/queue-manager', icon: <PlaceholderIcon /> },
  { name: 'Driver', href: '/driver', icon: <PlaceholderIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`flex-shrink-0 bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-200">
        <Link href="/dashboard" className="text-blue-600">{isCollapsed ? 'S' : 'Safary'}</Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              <div className={isActive ? 'text-white' : 'text-blue-500'}>{link.icon}</div>
              {!isCollapsed && <span className="ml-4">{link.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="px-2 py-4 border-t border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-blue-100 hover:text-blue-600"
        >
          <PlaceholderIcon />
          {!isCollapsed && <span className="ml-4">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
