import AuthGuard from '../components/AuthGuard';
import DashboardLayout from '../components/DashboardLayout';
import QueryProvider from '../components/QueryProvider';

export default function LayoutForDashboards({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthGuard>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </AuthGuard>
    </QueryProvider>
  );
}
