import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import PassengerSignUpForm from './PassengerSignupForm';

export const metadata: Metadata = {
    title: 'Passenger Signup',
};

import AuthLayout from '@/app/components/AuthLayout';

export default function PassengerSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Passenger Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Create your Safary account to start booking your trips.
            </p>
          </div>
          <PassengerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
