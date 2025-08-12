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
            <h1 className="text-4xl font-bold text-gray-900">Sacco Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register your Sacco and manage your fleet with ease.
            </p>
          </div>
          <SaccoSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
