import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import DriverSignUpForm from './DriverSignupForm';
import AuthLayout from '@/app/components/AuthLayout';

export const metadata: Metadata = {
    title: 'Driver Signup',
};

export default function DriverSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Become a Safary Driver</h1>
            <p className="mt-2 text-gray-600">
              Start your journey with us and drive your way to success.
            </p>
          </div>
          <DriverSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
