"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Head Office', href: '/head-office' },
  { name: 'Support Staff', href: '/support' },
  { name: 'Admin', href: '/admin' },
  { name: 'Sacco', href: '/sacco' },
  { name: 'Owner', href: '/owner' },
  { name: 'Queue Manager', href: '/queue-manager' },
  { name: 'Driver', href: '/driver' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
        <Link href="/dashboard">SafarEasy</Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              pathname === link.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
