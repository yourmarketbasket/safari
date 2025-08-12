import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import PassengerSignUpForm from './PassengerSignupForm';
import AuthLayout from '@/app/components/AuthLayout';

export const metadata: Metadata = {
    title: 'Passenger Signup',
};

export default function PassengerSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create Your Passenger Account</h1>
            <p className="mt-2 text-gray-600">
              Join Safary today and enjoy seamless travel. Let&apos;s get you set up in a few simple steps.
            </p>
          </div>
          <PassengerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
