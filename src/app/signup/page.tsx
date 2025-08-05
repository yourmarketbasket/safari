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

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600";
  const inputClasses = "block w-full px-4 py-3 mt-1 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-blue-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-gray-800">Join Safary today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          <div className="relative">
            <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="name" className={labelClasses}>Full Name</label>
          </div>
          <div className="relative">
            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="email" className={labelClasses}>Email Address</label>
          </div>
           <div className="relative">
            <input id="phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="phone" className={labelClasses}>Phone Number</label>
          </div>
          <div className="relative">
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
            <label htmlFor="password" className={labelClasses}>Password</label>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-black mb-1">I am a...</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} required className="block w-full px-4 py-3 bg-transparent border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {availableRoles.map((r) => (
                <option key={r} value={r} className="text-black">{r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
           <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
              <label htmlFor="terms" className="ml-2 block text-sm text-black">I agree to the <a href="/terms" className="font-medium text-indigo-800 hover:text-indigo-600">Terms and Conditions</a></label>
            </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <button type="submit" disabled={loading || !agreedToTerms} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-800">
          Already have an account?{' '}
          <Link href="/login" title="Login" className="font-medium text-indigo-800 hover:text-indigo-600">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
