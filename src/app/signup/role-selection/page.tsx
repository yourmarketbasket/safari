import { Metadata } from 'next';
import RoleCarousel from './RoleCarousel';

export const metadata: Metadata = {
    title: 'Role Selection',
};

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-8">
      <div className="w-full max-w-7xl px-12 p-8 space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Choose Your Role</h1>
        <p className="text-lg text-gray-700">
          Select the role that best describes you to get started with Safary. Each role has a tailored experience to meet your needs.
        </p>
        <RoleCarousel />
      </div>
    </div>
  );
}
