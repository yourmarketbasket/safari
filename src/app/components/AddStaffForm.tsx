"use client";

import { useState } from 'react';
import { NewStaffData } from '../services/superuser.service';
import { User, UserRole } from '../models/User.model';
import { Button } from './ui/Button';

const availableRoles: UserRole[] = [
  "Support_staff",
  "Admin",
  "Sacco",
  "Owner",
  "QueueManager",
  "Driver",
  "Passenger",
  "Superuser",
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
  const [role, setRole] = useState<UserRole>(initialData?.role || 'Support_staff');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone, role });
  };

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600";
  const inputClasses = "block w-full px-4 py-3 mt-1 bg-gray-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pt-6">
       <h2 className="text-xl font-bold text-gray-900 text-center mb-4">{initialData ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
      <div className="relative">
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder=" " className={inputClasses} />
        <label htmlFor="name" className={labelClasses}>Full Name</label>
      </div>
      <div className="relative">
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " className={inputClasses} />
        <label htmlFor="email" className={labelClasses}>Email</label>
      </div>
      <div className="relative">
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder=" " className={inputClasses} />
        <label htmlFor="phone" className={labelClasses}>Phone</label>
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-black mb-1">Role</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} required className="block w-full px-4 py-3 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          {availableRoles.map((r) => (
            <option key={r} value={r} className="text-black">{r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-red-600 text-center">
          Failed to add staff: {error.message}
        </p>
      )}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
