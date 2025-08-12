import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import QueueManagerSignUpForm from './QueueManagerSignupForm';
import AuthLayout from '@/app/components/AuthLayout';

export const metadata: Metadata = {
    title: 'Queue Manager Signup',
};
// force
export default function QueueManagerSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Queue Manager Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Join Safary as a queue manager and help us provide a seamless experience.
            </p>
          </div>
          <QueueManagerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
