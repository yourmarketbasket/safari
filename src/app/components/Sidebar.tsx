"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUsers, FiShield, FiTruck, FiUser, FiPocket, FiList, FiPower, FiChevronDown, FiChevronUp, FiTrendingUp, FiGift, FiMonitor, FiHelpCircle, FiTool, FiAlertTriangle, FiFileText, FiChevronsUp } from 'react-icons/fi';
import { useAuth } from '../lib/AuthContext';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';
import { UserRole } from '../models/User.model';
import ConnectionStatus from './ConnectionStatus';
import { Button } from './ui/Button';

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactElement;
  subLinks?: {
    name: string;
    href: string;
    icon: React.ReactElement;
  }[];
}

const allNavLinks: { [key in UserRole]?: NavLink[] } = {
  admin: [
    { name: 'Dashboard', href: '/admin', icon: <FiShield /> },
    { name: 'Routes', href: '/routes', icon: <FiTruck /> },
    { name: 'Performance Monitoring', href: '/admin/performance-monitoring', icon: <FiTrendingUp /> },
    { name: 'Escalation Queue', href: '/admin/escalation-queue', icon: <FiList /> },
    { name: 'System Reports', href: '/admin/system-reports', icon: <FiList /> },
  ],
  sacco: [
    { name: 'Dashboard', href: '/sacco', icon: <FiTruck /> },
    { name: 'Routes', href: '/routes', icon: <FiTruck /> },
    { name: 'Route Management', href: '/sacco/route-management', icon: <FiList /> },
    { name: 'Vehicle Management', href: '/sacco/vehicle-management', icon: <FiTruck /> },
    { name: 'Queue Management', href: '/sacco/queue-management', icon: <FiList /> },
    { name: 'Driver Management', href: '/sacco/driver-management', icon: <FiUser /> },
    { name: 'Revenue', href: '/sacco/revenue', icon: <FiTrendingUp /> },
    { name: 'Promotions', href: '/sacco/promotions', icon: <FiGift /> },
    { name: 'HR/Payroll', href: '/sacco/hr-payroll', icon: <FiUsers /> },
  ],
  owner: [
    { name: 'Dashboard', href: '/owner', icon: <FiUser /> },
    { name: 'Routes', href: '/routes', icon: <FiTruck /> },
    { name: 'Trips', href: '/owner/trips', icon: <FiList /> },
    { name: 'Income', href: '/owner/income', icon: <FiTrendingUp /> },
    { name: 'Vehicle Details', href: '/owner/vehicle-details', icon: <FiTruck /> },
    { name: 'HR/Payroll', href: '/owner/hr-payroll', icon: <FiUsers /> },
  ],
  passenger: [
    { name: 'Dashboard', href: '/passenger', icon: <FiPocket /> },
    { name: 'Trips', href: '/passenger/trips', icon: <FiList /> },
    { name: 'Routes', href: '/routes', icon: <FiTruck /> },
  ],
  support_staff: [
    { name: 'Dashboard', href: '/support/dashboard', icon: <FiMonitor /> },
    { name: 'Passenger Inquiries', href: '/support/inquiries', icon: <FiHelpCircle /> },
    { name: 'Driver Support', href: '/support/driver-support', icon: <FiTool /> },
    { name: 'Cancellations', href: '/support/cancellations', icon: <FiAlertTriangle /> },
    { name: 'System Errors', href: '/support/system-errors', icon: <FiAlertTriangle /> },
    { name: 'Reports', href: '/support/reports', icon: <FiFileText /> },
    { name: 'Escalations', href: '/support/escalations', icon: <FiChevronsUp /> },
  ],
  queue_manager: [
    { name: 'Dashboard', href: '/queue-manager', icon: <FiList /> },
    { name: 'Ticket Scanning', href: '/queue-manager/ticket-scanning', icon: <FiPocket /> },
    { name: 'Boarding Stats', href: '/queue-manager/boarding-stats', icon: <FiTrendingUp /> },
  ],
  driver: [
    { name: 'Dashboard', href: '/driver', icon: <FiUser /> },
    { name: 'Trip Registration', href: '/driver/trip-registration', icon: <FiList /> },
    { name: 'Trip Monitoring', href: '/driver/trip-monitoring', icon: <FiTrendingUp /> },
    { name: 'Passenger Verification', href: '/driver/passenger-verification', icon: <FiPocket /> },
    { name: 'Earnings', href: '/driver/earnings', icon: <FiTrendingUp /> },
    { name: 'Trip Completion', href: '/driver/trip-completion', icon: <FiList /> },
  ],
  Superuser: [
    { name: 'Dashboard', href: '/superuser', icon: <FiShield /> },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navLinks = user ? allNavLinks[user.role] || [] : [];

  const handleSubmenuClick = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <aside className={`flex-shrink-0 bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-2xl ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center justify-center px-4 text-2xl font-normal border-b border-gray-200 relative">
        {!isCollapsed && <Link href="/dashboard" className="text-purple-600">Safary</Link>}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatedHamburgerIcon isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          const isChildActive = link.subLinks?.some(subLink => pathname.startsWith(subLink.href));
          return (
          <div key={link.name}>
            {link.subLinks ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleSubmenuClick(link.name)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs font-normal rounded-lg transition-colors ${
                    (openSubmenu === link.name || isChildActive) ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-5 h-5">{link.icon}</div>
                    {!isCollapsed && <span className="ml-3">{link.name}</span>}
                  </div>
                  {!isCollapsed && (openSubmenu === link.name ? <FiChevronUp /> : <FiChevronDown />)}
                </Button>
                {openSubmenu === link.name && !isCollapsed && (
                  <div className="pl-8 space-y-1 mt-1">
                    {link.subLinks.map((subLink) => {
                      const isActive = pathname === subLink.href;
                      return (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className={`flex items-center px-4 py-1 text-xs font-normal rounded-lg transition-colors ${
                            isActive
                              ? 'bg-purple-500 text-white'
                              : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
                          }`}
                        >
                          <div className="w-4 h-4">{subLink.icon}</div>
                          <span className="ml-2">{subLink.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-2 text-xs font-normal rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                <div className="w-5 h-5">{link.icon}</div>
                {!isCollapsed && <span className="ml-3">{link.name}</span>}
              </Link>
            )}
          </div>
          );
        })}
        <Link href="/profile" className="flex items-center px-4 py-2 text-xs font-normal rounded-lg text-gray-600 hover:bg-purple-100 hover:text-purple-600">
            <FiUser className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Profile</span>}
        </Link>
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 space-y-2">
        <ConnectionStatus />
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-xs font-normal"
        >
          <FiPower className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
