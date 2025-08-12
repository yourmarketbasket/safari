import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import SaccoSignUpForm from './SaccoSignupForm';
import AuthLayout from '@/app/components/AuthLayout';

export const metadata: Metadata = {
    title: 'Sacco Signup',
};

export default function SaccoSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Register Your Sacco</h1>
            <p className="mt-2 text-gray-600">
              Join our platform and streamline your Sacco&apos;s operations.
            </p>
          </div>
          <SaccoSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
