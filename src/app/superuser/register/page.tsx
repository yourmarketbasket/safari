"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Message from '../../components/Message';
import SuperuserPublicRoute from '../../components/SuperuserPublicRoute';
import authService, { SignupData } from '../../services/auth.service';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

function SuperuserRegisterPageContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState('');

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
    if (!adminKey) {
        setError('Please enter an admin key.');
        return;
    }

    setLoading(true);
    try {
      const userData: SignupData = {
        name,
        email,
        phone,
        password,
        role: 'superuser',
      };
      await authService.registerSuperuser(userData, adminKey);
      router.push('/superuser/login');
    } catch (err) {
      setError('Failed to register. Please check the admin key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const labelClasses = "absolute left-4 top-3 text-gray-400 transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";
  const inputClasses = "block w-full px-4 py-3 bg-gray-800 text-white border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 peer";

  return (
    <SuperuserPublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl">
          <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Superuser Registration</h1>
              <p className="mt-2 text-gray-400">Create a new superuser account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input id="phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
              </div>
               <div className="relative">
                <input id="adminKey" name="adminKey" type="password" required value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="adminKey" className={labelClasses}>Admin Key</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="password" className={labelClasses}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.118 3.558-5.558 6.818-6.505M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.542 12c-1.274 4.057-5.064 7-9.542 7-1.096 0-2.144-.196-3.138-.55M2.458 12c.946-3.118 3.558-5.558 6.818-6.505" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
              </div>
            </div>
            {error && <Message message={error} type="error" />}
            <div>
              <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-cyan-400 transition-all duration-300">
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center text-gray-400">
            Already have a superuser account?{' '}
            <Link href="/superuser/login" title="Superuser Login" className="font-medium text-cyan-400 hover:text-cyan-300">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </SuperuserPublicRoute>
  );
}

export default function SuperuserRegisterPage() {
  return (
    <SuperuserRegisterPageContent />
  );
}
