import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import OwnerSignUpForm from './OwnerSignupForm';
import AuthLayout from '@/app/components/AuthLayout';

export const metadata: Metadata = {
    title: 'Owner Signup',
};

export default function OwnerSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Owner Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register as a vehicle owner on Safary.
            </p>
          </div>
          <OwnerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
