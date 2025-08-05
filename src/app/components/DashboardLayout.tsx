"use client";

import Sidebar from './Sidebar';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';

// A simple header component, can be moved to its own file later if it grows.
function Header() {
    const { user, logout } = useAuth();
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                {user && (
                    <div className="flex items-center space-x-4">
                        <span>Welcome, {user.name || 'User'}</span>
                        <Link href="/profile" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                            Profile
                        </Link>
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
