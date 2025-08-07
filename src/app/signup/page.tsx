"use client";

import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';
import { UserRole } from '../models/User.model';
import Message from '../components/Message';
import PublicRoute from '../components/PublicRoute';
import OtpInput from '../components/OtpInput';
import authService from '../services/auth.service';
import { FiSend, FiCheck } from 'react-icons/fi';

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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('passenger');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSendOtp = async () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address to receive an OTP.');
      return;
    }
    setSendOtpLoading(true);
    setOtpError('');
    setError('');
    try {
      await authService.sendSignupOtp(email);
      setIsOtpSent(true);
      setSuccessMessage('OTP has been sent to your email.');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter the 6-digit OTP.');
      return;
    }
    setVerifyOtpLoading(true);
    setOtpError('');
    try {
      await authService.verifySignupOtp(email, otp);
      setIsOtpVerified(true);
      setSuccessMessage('Email verified successfully!');
      setError('');
    } catch (err) {
      setOtpError('Invalid or expired OTP. Please try again.');
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isOtpVerified) {
      setError('Please verify your email before creating an account.');
      return;
    }
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
  const isEmailValid = emailRegex.test(email);

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-blue-200 py-12">
        <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-gray-800">Join Safary today</p>
          </div>
          <div className="my-4">
            {error && <Message message={error} type="error" />}
            {otpError && <Message message={otpError} type="error" />}
            {successMessage && <Message message={successMessage} type="success" />}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
              </div>
              <div className="relative">
                <input id="phone" name="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder=" " className={inputClasses}/>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="role" className="absolute left-4 top-[-10px] text-xs text-black bg-white px-1 z-10">Role</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} required className="appearance-none block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}>
                  {availableRoles.map((r) => ( <option key={r} value={r} className="text-black">{r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>))}
                </select>
              </div>
              {!isOtpVerified && (
                <div className="relative">
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className={inputClasses} disabled={isOtpSent}/>
                  <label htmlFor="email" className={labelClasses}>Email Address</label>
                  {isEmailValid && !isOtpSent && (
                  <button type="button" onClick={handleSendOtp} disabled={sendOtpLoading} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-indigo-600 disabled:text-gray-300">
                    {sendOtpLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div> : <FiSend className="h-5 w-5" />}
                  </button>
                  )}
                </div>
              )}
            </div>

            {!isOtpVerified && isOtpSent && (
              <div className="flex items-center space-x-2">
                <OtpInput onComplete={setOtp} />
                <button type="button" onClick={handleVerifyOtp} disabled={verifyOtpLoading || otp.length !== 6} className="flex items-center justify-center w-full px-4 py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-400">
                  {verifyOtpLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><FiCheck className="h-6 w-6 mr-2" /> Verify</>}
                </button>
              </div>
            )}

            {isOtpVerified && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={inputClasses}/>
                    <label htmlFor="password" className={labelClasses}>Password</label>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5">
                      {showPassword ? <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.118 3.558-5.558 6.818-6.505M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.542 12c-1.274 4.057-5.064 7-9.542 7-1.096 0-2.144-.196-3.138-.55M2.458 12c.946-3.118 3.558-5.558 6.818-6.505" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" /></svg>}
                    </button>
                  </div>
                  <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" " className={inputClasses}/>
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
              </>
            )}

            <div className="pt-2">
              <button type="submit" disabled={loading || !isOtpVerified || !agreedToTerms || !confirmedDetails} className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300">
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div> : 'Create Account'}
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
    </PublicRoute>
  );
}
