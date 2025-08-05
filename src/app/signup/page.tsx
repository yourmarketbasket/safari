"use client";

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';
import { UserRole } from '../models/User.model';
import Message from '../components/Message';

const availableRoles: UserRole[] = [
  "passenger",
  "sacco",
  "owner",
  "queue_manager",
  "driver",
  "support_staff",
  "admin",
];

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('passenger');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    if (!phoneRegex.test(phone)) {
        setError('Please enter a valid phone number.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms || !confirmedDetails) {
      setError('You must agree to the terms and confirm your details are accurate.');
      return;
    }

    setLoading(true);
    try {
      await signup({ name, email, phone, password, role });
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";
  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-blue-200 py-12">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-gray-800">Join Safary today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="name" className={labelClasses}>Full Name</label>
            </div>
             <div className="relative">
              <label htmlFor="role" className="absolute left-4 top-[-10px] text-xs text-black bg-white px-1 z-10">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} required className="appearance-none block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}>
                {availableRoles.map((r) => ( <option key={r} value={r} className="text-black">{r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="email" className={labelClasses}>Email Address</label>
            </div>
            <div className="relative">
              <input id="phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="phone" className={labelClasses}>Phone Number</label>
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="password" className={labelClasses}>Password</label>
            </div>
            <div className="relative">
              <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
            </div>
          </div>
           <div className="space-y-4">
               <div className="flex items-center">
                  <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                  <label htmlFor="terms" className="ml-2 block text-sm text-black">I agree to the <a href="/terms" className="font-medium text-indigo-800 hover:text-indigo-600">Terms and Conditions</a></label>
                </div>
                <div className="flex items-center">
                  <input id="accurate-details" name="accurate-details" type="checkbox" checked={confirmedDetails} onChange={(e) => setConfirmedDetails(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                  <label htmlFor="accurate-details" className="ml-2 block text-sm text-black">I confirm that I have provided accurate details</label>
                </div>
           </div>
          {error && <div className="pt-2"><Message message={error} type="error" /></div>}
          <div className="pt-2">
            <button type="submit" disabled={loading || !agreedToTerms || !confirmedDetails} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
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
