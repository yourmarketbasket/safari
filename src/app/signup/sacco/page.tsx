import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import SaccoSignUpForm from './SaccoSignupForm';

export const metadata: Metadata = {
    title: 'Sacco Signup',
};

import AuthLayout from '@/app/components/AuthLayout';

export default function SaccoSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Sacco Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register your Sacco to manage your transport business.
            </p>
          </div>
          <SaccoSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
