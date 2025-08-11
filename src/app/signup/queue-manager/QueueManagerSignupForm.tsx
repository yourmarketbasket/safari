"use client";

import { useState } from 'react';
import Stepper from '@/app/components/Stepper';
import { Button } from '@/app/components/ui/Button';
import Message from '@/app/components/Message';
import OtpInput from '@/app/components/OtpInput';
import authService from '@/app/services/auth.service';
import { useAuth } from '@/app/lib/AuthContext';
import FileUpload from '@/app/components/FileUpload';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

const stepLabels = ["Personal Info", "Contact Info", "Documents", "Verify Email", "Password", "Done"];

export default function QueueManagerSignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    nationalId: null as File | null,
    medicalCertificate: null as File | null,
    drivingLicense: null as File | null,
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    deviceDetails: ''
  });
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
  const [verifiedToken, setVerifiedToken] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (name: string) => (file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
        if (!formData.dob || !formData.gender) {
            setError('Please fill in your date of birth and gender.');
            return;
        }
        const today = new Date();
        const birthDate = new Date(formData.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 21 || age > 60) {
            setError('You must be between 21 and 60 years old to register.');
            return;
        }
    }
    setError('');
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSendOtp = async () => {
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address to receive an OTP.');
      return;
    }
    setSendOtpLoading(true);
    setOtpError('');
    setError('');
    try {
      await authService.sendSignupOtp(formData.email);
      setIsOtpSent(true);
      setSuccessMessage('OTP has been sent to your email.');
    } catch {
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
      const token = await authService.verifySignupOtp(formData.email, otp);
      setVerifiedToken(token);
      setIsOtpVerified(true);
      setSuccessMessage('Email verified successfully!');
      setError('');
      setCurrentStep(prev => prev + 1);
    } catch {
      setOtpError('Invalid or expired OTP. Please try again.');
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    setLoading(true);
    try {
      // Add device details to form data
      const finalFormData = {
        ...formData,
        role: 'queue_manager' as const,
        deviceDetails: navigator.userAgent,
        verifiedToken
      };
      await signup(finalFormData);
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";
  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div>
      <Stepper currentStep={currentStep} totalSteps={6} stepLabels={stepLabels}/>
      <div className="my-4">
        {error && <Message message={error} type="error" />}
        {otpError && <Message message={otpError} type="error" />}
        {successMessage && <Message message={successMessage} type="success" />}
      </div>
      <div className="mt-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="relative">
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="name" className={labelClasses}>Full Name</label>
            </div>
            <div className="relative">
                <input id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="dob" className={labelClasses}>Date of Birth</label>
            </div>
            <div className="relative">
                <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className={inputClasses}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="gender" className={labelClasses}>Gender</label>
            </div>
            <div className="relative">
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
            </div>
          </div>
        )}
        {currentStep === 2 && (
            <div className="space-y-6">
                <div className="relative">
                    <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                </div>
                <div className="relative">
                    <input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="address" className={labelClasses}>Address</label>
                </div>
            </div>
        )}
        {currentStep === 3 && (
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">National ID</label>
                    <FileUpload onFileSelect={handleFileChange('nationalId')} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Certificate</label>
                    <FileUpload onFileSelect={handleFileChange('medicalCertificate')} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Driving License (Optional)</label>
                    <FileUpload onFileSelect={handleFileChange('drivingLicense')} />
                </div>
            </div>
        )}
        {currentStep === 4 && (
          <div className="text-center">
            <p className="text-gray-700 mb-4">An OTP will be sent to {formData.email}.</p>
            {!isOtpSent ? (
              <Button onClick={handleSendOtp} disabled={sendOtpLoading}>
                {sendOtpLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            ) : (
                <div className="w-full flex items-center justify-center space-x-2">
                    <OtpInput onComplete={setOtp} />
                    <Button type="button" onClick={handleVerifyOtp} disabled={verifyOtpLoading || otp.length !== 6} variant="success">
                    {verifyOtpLoading ? 'Verifying...' : 'Verify'}
                    </Button>
              </div>
            )}
          </div>
        )}
        {currentStep === 5 && (
            <div className="space-y-6">
                <div className="relative">
                    <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="password" className={labelClasses}>Password</label>
                </div>
                <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
                </div>
            </div>
        )}
        {currentStep === 6 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Review Your Details</h2>
            <div className="text-left mt-4 bg-gray-50 p-4 rounded-lg">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Date of Birth:</strong> {formData.dob}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>National ID:</strong> {formData.nationalId ? formData.nationalId.name : 'Not uploaded'}</p>
              <p><strong>Medical Certificate:</strong> {formData.medicalCertificate ? formData.medicalCertificate.name : 'Not uploaded'}</p>
              <p><strong>Driving License:</strong> {formData.drivingLicense ? formData.drivingLicense.name : 'Not uploaded'}</p>
            </div>
            <div className="flex items-center mt-4">
                <input id="terms" name="agreedToTerms" type="checkbox" checked={formData.agreedToTerms} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label htmlFor="terms" className="ml-2 block text-sm text-black">I agree to the <a href="/terms" className="font-medium text-indigo-800 hover:text-indigo-600">Terms and Conditions</a></label>
            </div>
            <Button onClick={handleSubmit} disabled={loading || !formData.agreedToTerms} className="mt-6 w-full">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && currentStep < 6 && (
            <Button onClick={handleBack} variant="secondary">Back</Button>
          )}
          {currentStep < 5 && (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}
