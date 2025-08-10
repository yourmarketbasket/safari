import { Metadata } from 'next';
import RoleCarousel from './RoleCarousel';

export const metadata: Metadata = {
    title: 'Role Selection',
};

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-8">
      <div className="w-11/12 max-w-6xl p-8 space-y-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Choose Your Role</h1>
        <p className="text-xl text-gray-600">
          Select the role that best describes you to get started with Safary.
        </p>
        <RoleCarousel />
      </div>
    </div>
  );
}
