import { Metadata } from 'next';
import PublicRoute from '@/app/components/PublicRoute';
import SaccoSignUpForm from './SaccoSignupForm';

export const metadata: Metadata = {
    title: 'Sacco Signup',
};

export default function SaccoSignupPage() {

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Sacco Signup</h1>
            <p className="mt-2 text-lg text-gray-700">
              Register your Sacco to manage your transport business.
            </p>
          </div>
          <SaccoSignUpForm />
        </div>
      </div>
    </PublicRoute>
  );
}
