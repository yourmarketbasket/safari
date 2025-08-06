"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Message from '../../components/Message';
import PublicRoute from '../../components/PublicRoute';
import authService from '../../services/auth.service';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

export default function SuperuserRegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    if (!adminKey) {
        setError('Please enter an admin key.');
        return;
    }

    setLoading(true);
    try {
      await authService.registerSuperuser({
        name,
        email,
        phone,
        password,
        role: 'admin', // Superuser role is admin
        adminKey,
      });
      router.push('/superuser/login');
    } catch (err) {
      setError('Failed to register. Please check the admin key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";
  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
          <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Superuser Registration</h1>
              <p className="mt-2 text-gray-800">Create a new superuser account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
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
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="password" className={labelClasses}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <span>Hide</span> : <span>Show</span>}
              </button>
            </div>
            <div className="relative">
              <input id="adminKey" name="adminKey" type="password" required value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder=" " className={inputClasses}/>
              <label htmlFor="adminKey" className={labelClasses}>Admin Key</label>
            </div>
            {error && <Message message={error} type="error" />}
            <div>
              <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center text-gray-800">
            Already have a superuser account?{' '}
            <Link href="/superuser/login" title="Superuser Login" className="font-medium text-indigo-800 hover:text-indigo-600">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}
