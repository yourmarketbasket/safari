import { Metadata } from 'next';
import RoleCarousel from './RoleCarousel';

export const metadata: Metadata = {
    title: 'Role Selection',
};

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-12">
      <div className="w-full max-w-6xl p-8 space-y-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Choose Your Role</h1>
        <p className="mt-4 text-xl text-gray-600">
          Select the role that best describes you to get started with Safary.
        </p>
        <RoleCarousel />
      </div>
    </div>
  );
}
