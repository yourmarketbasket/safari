import { Metadata } from 'next';
import RoleCarousel from './RoleCarousel';

export const metadata: Metadata = {
    title: 'Role Selection',
};

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-8">
      <div className="w-full max-w-7xl px-12 p-8 space-y-8 text-center">
        <p className="text-2xl text-gray-600">
          Select the role that best describes you to get started with Safary.
        </p>
        <RoleCarousel />
      </div>
    </div>
  );
}
