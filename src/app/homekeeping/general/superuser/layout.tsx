import AuthGuard from '@/app/components/AuthGuard';
import DashboardLayout from '@/app/components/DashboardLayout';
import QueryProvider from '@/app/components/QueryProvider';

export default function LayoutForSuperuser({ children }: { children: React.ReactNode }) {
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
