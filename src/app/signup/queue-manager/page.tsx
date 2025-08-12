import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import QueueManagerSignUpForm from './QueueManagerSignupForm';

export const metadata: Metadata = {
    title: 'Queue Manager Signup',
};
// force 
export default function QueueManagerSignupPage() {

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12">
        <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Queue Manager Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register as a queue manager to help us manage queues.
            </p>
          </div>
          <QueueManagerSignUpForm />
        </div>
      </div>
    </PublicRoute>
  );
}
