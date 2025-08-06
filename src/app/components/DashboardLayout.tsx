"use client";

import Sidebar from './Sidebar';
import SupportSidebar from './SupportSidebar';
import { useAuth } from '../lib/AuthContext';

// A simple header component, can be moved to its own file later if it grows.
function Header() {
    const { user } = useAuth();
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                {user && (
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-800">Welcome, {user.name || 'User'}</span>
                    </div>
                )}
            </div>
        </header>
    );
}


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {user?.role === 'support_staff' ? <SupportSidebar /> : <Sidebar />}
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
