"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUsers, FiTruck, FiUser, FiList, FiPower, FiChevronDown, FiChevronUp, FiMonitor, FiHelpCircle, FiXCircle, FiTrendingUp, FiPlus, FiCheckCircle, FiHeadphones } from 'react-icons/fi';
import { useAuth } from '../lib/AuthContext';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';
import ConnectionStatus from './ConnectionStatus';
import { Button } from './ui/Button';

const supportNavLinks = [
    { name: 'Dashboard', href: '/support', icon: <FiUsers /> },
    { name: 'Routes', href: '/routes', icon: <FiTruck /> },
    {
      name: 'Sacco Management',
      href: '/support/sacco-management',
      icon: <FiTruck />,
      subLinks: [
        { name: 'Onboard Sacco', href: '/support/sacco-management/onboard', icon: <FiPlus /> },
        { name: 'Approve Sacco', href: '/support/sacco-management/approve', icon: <FiCheckCircle /> },
        { name: 'Reject Sacco', href: '/support/sacco-management/reject', icon: <FiXCircle /> },
      ],
    },
    { name: 'System Monitoring', href: '/support/system-monitoring', icon: <FiMonitor /> },
    { name: 'Inquiry Management', href: '/support/inquiries', icon: <FiHeadphones /> },
    { name: 'Driver Support', href: '/support/driver-support', icon: <FiHeadphones /> },
    { name: 'Cancellations & Reallocations', href: '/support/cancellations', icon: <FiXCircle /> },
    { name: 'Payroll Disputes', href: '/support/payroll-disputes', icon: <FiTrendingUp /> },
    { name: 'Reports', href: '/support/reports', icon: <FiList /> },
    { name: 'Escalations', href: '/support/escalations', icon: <FiTrendingUp /> },
];

export default function SupportSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { logout } = useAuth();

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
        {supportNavLinks.map((link) => {
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
