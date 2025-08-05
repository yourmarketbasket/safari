import DashboardLayout from '../components/DashboardLayout';
import QueryProvider from '../components/QueryProvider';

export default function LayoutForDashboards({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </QueryProvider>
  );
}
