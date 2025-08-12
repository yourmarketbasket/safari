import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import StaffSignUpForm from './StaffSignupForm';
import AuthLayout from '@/app/components/AuthLayout';

export const metadata: Metadata = {
    title: 'Staff Signup',
};

export default function StaffSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Staff Registration</h1>
            <p className="mt-2 text-gray-600">
              Create your official Safary staff account to access internal resources.
            </p>
          </div>
          <StaffSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
