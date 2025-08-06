import SuperuserDashboardLayout from '../components/SuperuserDashboardLayout';
import { SuperuserAuthProvider } from '../lib/SuperuserAuthContext';
import SuperuserPrivateRoute from '../components/SuperuserPrivateRoute';

export default function LayoutForSuperuserDashboards({ children }: { children: React.ReactNode }) {
  return (
    <SuperuserAuthProvider>
      <SuperuserPrivateRoute>
        <SuperuserDashboardLayout>
          {children}
        </SuperuserDashboardLayout>
      </SuperuserPrivateRoute>
    </SuperuserAuthProvider>
  );
}
