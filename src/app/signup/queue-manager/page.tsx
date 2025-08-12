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
            <h1 className="text-2xl font-bold text-gray-900">Become a Queue Manager</h1>
            <p className="mt-2 text-gray-600">
              Help us ensure a smooth and efficient boarding process for our passengers.
            </p>
          </div>
          <QueueManagerSignUpForm />
        </div>
      </AuthLayout>
    </PublicRoute>
  );
}
