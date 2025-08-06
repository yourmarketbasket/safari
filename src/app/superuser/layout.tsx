"use client";

import SuperuserDashboardLayout from '../components/SuperuserDashboardLayout';
import { SuperuserAuthProvider } from '../lib/SuperuserAuthContext';
import SuperuserPrivateRoute from '../components/SuperuserPrivateRoute';
import { usePathname } from 'next/navigation';

export default function LayoutForSuperuserDashboards({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/superuser/login' || pathname === '/superuser/register';

  return (
    <SuperuserAuthProvider>
      {isAuthPage ? (
        children
      ) : (
        <SuperuserPrivateRoute>
          <SuperuserDashboardLayout>
            {children}
          </SuperuserDashboardLayout>
        </SuperuserPrivateRoute>
      )}
    </SuperuserAuthProvider>
  );
}
