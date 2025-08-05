"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BuildingOfficeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const UserGroupIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.004 3.004 0 015.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ShieldCheckIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04z" /></svg>;
const TruckIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM5 16h8m-1-4h.01M21 16h-2a1 1 0 00-1 1v1a1 1 0 001 1h2v-3z" /></svg>;
const UserCircleIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const TicketIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.5 5.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19.5 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM4.5 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM15.5 19.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 19.5v-5.5a2 2 0 00-2-2h-4a2 2 0 00-2 2v5.5m10-14v5.5a2 2 0 01-2 2h-4a2 2 0 01-2-2V5.5" /></svg>;
const QueueListIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const SteeringWheelIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.152 13.248A9.942 9.942 0 0112 22a9.942 9.942 0 01-9.152-8.752M12 2v2.05a7 7 0 014.95 2.9l1.414-1.414A9.942 9.942 0 0012 2zm0 18v2.05a7 7 0 004.95-2.9l1.414 1.414A9.942 9.942 0 0112 22zm-7.05-4.95a7 7 0 002.9 4.95V22a9.942 9.942 0 01-1.414-1.414l-1.486 1.486zm14.1 0a7 7 0 00-2.9-4.95V22a9.942 9.942 0 001.414-1.414l1.486 1.486zM12 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ArrowLeftOnRectangleIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l-3-3m0 0l-3 3m3-3V9" /></svg>;

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
  { name: 'Head Office', href: '/head-office', icon: <BuildingOfficeIcon /> },
  { name: 'Support Staff', href: '/support', icon: <UserGroupIcon /> },
  { name: 'Admin', href: '/admin', icon: <ShieldCheckIcon /> },
  { name: 'Sacco', href: '/sacco', icon: <TruckIcon /> },
  { name: 'Owner', href: '/owner', icon: <UserCircleIcon /> },
  { name: 'Passenger', href: '/passenger', icon: <TicketIcon /> },
  { name: 'Queue Manager', href: '/queue-manager', icon: <QueueListIcon /> },
  { name: 'Driver', href: '/driver', icon: <SteeringWheelIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`flex-shrink-0 bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-16 flex items-center justify-between px-4 text-2xl font-bold border-b border-gray-200">
        {!isCollapsed && <Link href="/dashboard" className="text-blue-600">Safary</Link>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md text-gray-600 hover:bg-blue-100 hover:text-blue-600"
        >
          <ArrowLeftOnRectangleIcon />
        </button>
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
    </aside>
  );
}
