"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { UserRole } from '../models/User.model';
import Message from '../components/Message';
import api from '../lib/api';

const availableRoles: UserRole[] = [
  "passenger",
  "sacco",
  "owner",
  "queue_manager",
  "driver",
];

export default function RoleSelectionPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('passenger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/select-role', { role: selectedRole });
      // Redirect to the dashboard or appropriate page after role selection
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to select role. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>You must be signed in to select a role.</p>
        <button onClick={() => router.push('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Select Your Role</h1>
          <p className="mt-2 text-gray-800">Welcome, {session.user?.name}! Please select your role to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="role" className="absolute left-4 top-[-10px] text-xs text-black bg-white px-1 z-10">Role</label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              required
              className="appearance-none block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              {availableRoles.map((r) => (
                <option key={r} value={r} className="text-black">
                  {r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          {error && <Message message={error} type="error" />}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300"
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={() => signOut()} className="text-sm text-gray-600 hover:underline">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
