import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import QueueManagerSignUpForm from './QueueManagerSignupForm';

export const metadata: Metadata = {
    title: 'Queue Manager Signup',
};
// force 
import AuthLayout from '@/app/components/AuthLayout';

export default function QueueManagerSignupPage() {

  return (
    <PublicRoute>
      <AuthLayout>
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Queue Manager Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register as a queue manager to help us manage queues.
            </p>
          </div>
          <QueueManagerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
