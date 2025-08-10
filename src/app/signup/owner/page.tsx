import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import OwnerSignUpForm from './OwnerSignupForm';

export const metadata: Metadata = {
    title: 'Owner Signup',
};

export default function OwnerSignupPage() {

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Owner Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register as a vehicle owner to manage your assets.
            </p>
          </div>
          <OwnerSignUpForm />
        </div>
      </div>
    </PublicRoute>
  );
}
