"use client";

import { useState } from 'react';
import { NewStaffData } from '../services/superuser.service';
import { User, UserRole } from '../models/User.model';

const availableRoles: UserRole[] = [
  "support_staff",
  "admin",
  "sacco",
  "owner",
  "queue_manager",
  "driver",
  "passenger",
  "superuser",
];

interface AddStaffFormProps {
  onClose: () => void;
  onSubmit: (formData: NewStaffData) => void;
  isLoading: boolean;
  error: Error | null;
  initialData?: User;
}

export default function AddStaffForm({ onClose, onSubmit, isLoading, error, initialData }: AddStaffFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [role, setRole] = useState<UserRole>(initialData?.role || 'support_staff');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // The password would be set here for a new user, or handled in a separate flow.
    // For this form, we'll assume a default or temporary password is set server-side.
    onSubmit({ name, email, phone, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm" />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          required
          className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm"
        >
          {availableRoles.map((r) => (
            <option key={r} value={r}>
              {r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-red-600">
          Failed to add staff: {error.message}
        </p>
      )}
      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
