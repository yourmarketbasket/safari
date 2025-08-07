"use client";

import SuperuserDashboardLayout from '../components/SuperuserDashboardLayout';
import { SuperuserAuthProvider } from '../lib/SuperuserAuthContext';
import SuperuserPrivateRoute from '../components/SuperuserPrivateRoute';
import { usePathname } from 'next/navigation';
import QueryProvider from '../components/QueryProvider';

export default function LayoutForSuperuserDashboards({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/superuser/login' || pathname === '/superuser/register';

  return (
    <SuperuserAuthProvider>
      {isAuthPage ? (
        children
      ) : (
        <QueryProvider>
          <SuperuserPrivateRoute>
            <SuperuserDashboardLayout>
              {children}
            </SuperuserDashboardLayout>
          </SuperuserPrivateRoute>
        </QueryProvider>
      )}
    </SuperuserAuthProvider>
  );
}
