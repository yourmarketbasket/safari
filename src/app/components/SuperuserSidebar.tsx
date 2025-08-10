"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiBriefcase, FiBarChart2, FiHelpCircle, FiChevronDown, FiShield, FiActivity, FiXCircle, FiAlertTriangle, FiTrendingUp, FiTruck, FiFileText, FiGitMerge, FiList, FiCreditCard, FiDollarSign, FiHeadphones } from 'react-icons/fi';
import { useSuperuserAuth } from '../lib/SuperuserAuthContext';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';
import ConnectionStatus from './ConnectionStatus';
import { Button } from './ui/Button';

const navLinks = [
  {
    name: 'Dashboards',
    icon: <FiHome />,
    children: [
      { name: 'Dashboard', href: '/superuser/dashboard', icon: <FiActivity /> },
      { name: 'Admin Analytics', href: '/superuser/dashboard/admin-analytics', icon: <FiBarChart2 /> },
    ]
  },
  {
    name: 'Support',
    icon: <FiHeadphones />,
    children: [
      { name: 'Support Tickets', href: '/superuser/support/tickets', icon: <FiList /> },
      { name: 'Passenger & Driver Support', href: '/superuser/support/passenger-driver-support', icon: <FiUsers /> },
      { name: 'Cancellations & Reallocations', href: '/superuser/support/cancellations-reallocations', icon: <FiXCircle /> },
      { name: 'System Errors', href: '/superuser/support/system-errors', icon: <FiAlertTriangle /> },
    ]
  },
  {
    name: 'Management',
    icon: <FiBriefcase />,
    children: [
      { name: 'Team Management', href: '/superuser/management/teams', icon: <FiUsers /> },
      { name: 'Support Group Management', href: '/superuser/management/support-groups', icon: <FiHelpCircle /> },
      { name: 'Escalations', href: '/superuser/management/escalations', icon: <FiTrendingUp /> },
      { name: 'Bus Operator Coordination', href: '/superuser/management/bus-operator-coordination', icon: <FiTruck /> },
    ]
  },
  {
    name: 'User Management',
    icon: <FiUsers />,
    children: [
      { name: 'Users', href: '/superuser/user-management/users', icon: <FiUsers /> },
      { name: 'Permissions', href: '/superuser/user-management/permissions', icon: <FiShield /> },
    ]
  },
  {
    name: 'Payments',
    icon: <FiCreditCard />,
    children: [
      { name: 'Methods', href: '/superuser/payments/methods', icon: <FiCreditCard /> },
      { name: 'Income', href: '/superuser/payments/income', icon: <FiTrendingUp /> },
      { name: 'Fares', href: '/superuser/payments/fares', icon: <FiDollarSign /> },
    ]
  },
  {
    name: 'Operations',
    icon: <FiSettings />,
    children: [
      { name: 'Operational Reports', href: '/superuser/operations/reports', icon: <FiFileText /> },
      { name: 'Policy & Compliance', href: '/superuser/operations/policy-compliance', icon: <FiShield /> },
      { name: 'Edge Cases', href: '/superuser/operations/edge-cases', icon: <FiGitMerge /> },
      { name: 'Audit Trails', href: '/superuser/operations/audit-trails', icon: <FiList /> },
    ]
  },
];

export default function SuperuserSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { logout } = useSuperuserAuth();

  const handleMenuClick = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <aside className={`flex-shrink-0 bg-white text-gray-800 flex flex-col transition-all duration-300 shadow-2xl ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center justify-center px-4 text-2xl font-light border-b border-gray-200 relative">
        {!isCollapsed && <Link href="/superuser/dashboard" className="text-purple-600">Superuser</Link>}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatedHamburgerIcon isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navLinks.map((link) => (
          <div key={link.name}>
            <Button
              variant="ghost"
              onClick={() => handleMenuClick(link.name)}
              className={`w-full flex items-center px-4 py-2 text-sm font-light rounded-lg transition-colors ${
                openMenu === link.name ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              }`}
            >
              <div className="w-5 h-5">{link.icon}</div>
              {!isCollapsed && <span className="ml-3 flex-1 text-left">{link.name}</span>}
              {!isCollapsed && <FiChevronDown className={`w-5 h-5 transition-transform ${openMenu === link.name ? 'rotate-180' : ''}`} />}
            </Button>
            {openMenu === link.name && !isCollapsed && (
              <div className="pl-8 py-2 space-y-2">
                {link.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className={`flex items-center px-4 py-2 text-sm font-light rounded-lg transition-colors ${
                      pathname === child.href
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                    }`}
                  >
                    <div className="w-5 h-5">{child.icon}</div>
                    <span className="ml-3">{child.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/superuser/profile" className="flex items-center px-4 py-2 text-sm font-light rounded-lg text-gray-600 hover:bg-purple-100 hover:text-purple-600">
            <FiUsers className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Profile</span>}
        </Link>
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 space-y-2">
        <ConnectionStatus />
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-sm font-normal"
        >
          <FiLogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
