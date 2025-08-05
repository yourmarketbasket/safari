"use client";

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';
import { UserRole } from '../models/User.model';

const availableRoles: UserRole[] = [
  "passenger",
  "sacco",
  "owner",
  "queue_manager",
  "driver",
  "support_staff",
  "admin",
];


export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('passenger');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signup({ name, email, phone, password, role });
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-gray-600">Join Safary today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
           <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input id="phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a...</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} required className="block w-full px-4 py-3 mt-1 bg-gray-50 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {availableRoles.map((r) => (
                <option key={r} value={r}>{r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
           <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the <a href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">Terms and Conditions</a></label>
            </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <button type="submit" disabled={loading || !agreedToTerms} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" title="Login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
