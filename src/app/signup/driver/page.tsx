import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import DriverSignUpForm from './DriverSignupForm';

export const metadata: Metadata = {
    title: 'Driver Signup',
};

import AuthLayout from '@/app/components/AuthLayout';

export default function DriverSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Driver Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register as a driver to start your journey with Safary.
            </p>
          </div>
          <DriverSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
