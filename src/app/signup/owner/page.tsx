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
            <h1 className="text-2xl font-bold text-gray-900">Become a Vehicle Owner</h1>
            <p className="mt-2 text-gray-600">
              Join our network of vehicle owners and manage your assets with ease.
            </p>
          </div>
          <OwnerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
