"use client";

import SuperuserSidebar from './SuperuserSidebar';
import { useSuperuserAuth } from '../lib/SuperuserAuthContext';

function Header() {
    const { user } = useSuperuserAuth();
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900">Superuser Dashboard</h1>
                {user && (
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-800">Welcome, {user.name || 'Superuser'}</span>
                    </div>
                )}
            </div>
        </header>
    );
}

export default function SuperuserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SuperuserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
