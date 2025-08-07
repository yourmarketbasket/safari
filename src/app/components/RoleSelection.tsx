"use client";

import { useState } from 'react';
import { UserRole } from '../models/User.model';
import Message from './Message';

interface RoleSelectionProps {
  roles: UserRole[];
  onSubmit: (role: UserRole) => Promise<void>;
}

export default function RoleSelection({ roles, onSubmit }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(roles[0] || 'passenger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(selectedRole);
    } catch (err) {
      setError('Failed to select role. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {roles.map((r) => (
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
  );
}
