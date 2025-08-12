"use client";

import { useState } from 'react';
import Stepper from '@/app/components/Stepper';
import { Button } from '@/app/components/ui/Button';
import Message from '@/app/components/Message';
import OtpInput from '@/app/components/OtpInput';
import authService from '@/app/services/auth.service';
import { useAuth } from '@/app/lib/AuthContext';
import FileUpload from '@/app/components/FileUpload';
import { FiBriefcase, FiMapPin, FiFileText, FiCreditCard, FiMail, FiLock, FiCheck, FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

export default function SaccoSignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    registrationNumber: string;
    email: string;
    phone: string;
    address: string;
    registrationCertificate: File | null;
    formalIntentRequest: File | null;
    byLaws: File | null;
    leadershipInfo: File | null;
    proofOfPayment: File | null;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
    deviceDetails: string;
  }>({
    name: '',
    registrationNumber: '',
    email: '',
    phone: '',
    address: '',
    registrationCertificate: null,
    formalIntentRequest: null,
    byLaws: null,
    leadershipInfo: null,
    proofOfPayment: null,
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    deviceDetails: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) errors.name = 'Sacco name is required.';
      if (!formData.registrationNumber) errors.registrationNumber = 'Registration number is required.';
      if (!formData.email) {
        errors.email = 'Email is required.';
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email address.';
      }
      if (!formData.phone) {
        errors.phone = 'Phone number is required.';
      } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Invalid phone number.';
      }
    }
    if (step === 2) {
        if (!formData.address) errors.address = 'Address is required.';
    }
    if (step === 3) {
        if (!formData.registrationCertificate) errors.registrationCertificate = 'Registration certificate is required.';
        if (!formData.formalIntentRequest) errors.formalIntentRequest = 'Formal intent request is required.';
        if (!formData.byLaws) errors.byLaws = 'By-laws are required.';
        if (!formData.leadershipInfo) errors.leadershipInfo = 'Leadership information is required.';
    }
    if (step === 4) {
        if (!formData.proofOfPayment) errors.proofOfPayment = 'Proof of payment is required.';
    }
    if (step === 6) {
        if (!formData.password) errors.password = 'Password is required.';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  };

  const handleNext = () => {
    if (currentStep === 7) { // Preview Step
        let allErrors: Record<string, string> = {};
        for (let i = 1; i <= 6; i++) {
            allErrors = {...allErrors, ...validateStep(i)};
        }
        if (Object.keys(allErrors).length > 0) {
            setFormErrors(allErrors);
            for (let i = 1; i <= 6; i++) {
                if (Object.keys(validateStep(i)).length > 0) {
                    setCurrentStep(i);
                    break;
                }
            }
            return;
        }
        if (!formData.agreedToTerms) {
            setFormErrors({ agreedToTerms: 'You must agree to the terms to proceed.' });
            return;
        }
    }

    const errors = validateStep(currentStep);
    if (Object.keys(errors).length === 0) {
      setCurrentStep(prev => prev + 1);
    }
    setFormErrors(errors);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleSendOtp = async () => {
    if (!emailRegex.test(formData.email)) {
      setFormErrors({ email: 'Please enter a valid email address to receive an OTP.' });
      return;
    }
    setSendOtpLoading(true);
    setOtpError('');
    setFormErrors({});
    try {
      await authService.sendSignupOtp(formData.email);
      setIsOtpSent(true);
      setSuccessMessage('OTP has been sent to your email.');
    } catch {
      setFormErrors({ email: 'Failed to send OTP. Please try again.' });
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
      setFormErrors({});
      setCurrentStep(prev => prev + 1);
    } catch {
      setOtpError('Invalid or expired OTP. Please try again.');
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.agreedToTerms) {
      setFormErrors({ agreedToTerms: 'You must agree to the terms and conditions.' });
      setCurrentStep(7); // Go back to preview step
      return;
    }
    setLoading(true);
    try {
      const finalFormData = {
        ...formData,
        role: 'sacco' as const,
        deviceDetails: navigator.userAgent,
        verifiedToken
      };
      await signup(finalFormData);
      setSuccessMessage("Account created successfully! Redirecting...");
    } catch (err) {
      setFormErrors({ submit: 'Failed to create account. Please try again.' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "peer h-12 w-full border border-gray-300 rounded-md bg-transparent px-4 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none";
  const labelClasses = "absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600";

  const getStepStatus = (step: number): StepStatus => {
    const errors = validateStep(step);
    if (Object.keys(errors).length > 0 && currentStep > step) {
        return 'error';
    }
    if (currentStep === step) return 'current';
    if (currentStep > step) return 'complete';
    return 'upcoming';
  };

  const steps = [
    { status: getStepStatus(1), icon: FiBriefcase, label: 'SACCO Details' },
    { status: getStepStatus(2), icon: FiMapPin, label: 'Address' },
    { status: getStepStatus(3), icon: FiFileText, label: 'Documents' },
    { status: getStepStatus(4), icon: FiCreditCard, label: 'Payment' },
    { status: getStepStatus(5), icon: FiMail, label: 'Verify Email' },
    { status: getStepStatus(6), icon: FiLock, label: 'Password' },
    { status: getStepStatus(7), icon: FiEye, label: 'Preview' },
    { status: getStepStatus(8), icon: FiCheck, label: 'Done' },
  ];

  return (
    <div>
      <Stepper steps={steps} onStepClick={handleStepClick}/>
      <div className="my-4">
        {otpError && <Message message={otpError} type="error" />}
        {successMessage && <Message message={successMessage} type="success" />}
        {formErrors.submit && <Message message={formErrors.submit} type="error" />}
      </div>
      <div className="mt-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="relative">
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="name" className={labelClasses}>Sacco Name</label>
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div className="relative">
                <input id="registrationNumber" name="registrationNumber" type="text" required value={formData.registrationNumber} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="registrationNumber" className={labelClasses}>Registration Number</label>
                {formErrors.registrationNumber && <p className="text-red-500 text-xs mt-1">{formErrors.registrationNumber}</p>}
            </div>
            <div className="relative">
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div className="relative">
                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>
          </div>
        )}
        {currentStep === 2 && (
            <div className="space-y-6">
                <div className="relative">
                    <input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="address" className={labelClasses}>Physical Address</label>
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>
            </div>
        )}
        {currentStep === 3 && (
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Certificate</label>
                    <FileUpload onFileSelect={handleFileChange('registrationCertificate')} />
                    {formErrors.registrationCertificate && <p className="text-red-500 text-xs mt-1">{formErrors.registrationCertificate}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Formal Intent Request</label>
                    <FileUpload onFileSelect={handleFileChange('formalIntentRequest')} />
                    {formErrors.formalIntentRequest && <p className="text-red-500 text-xs mt-1">{formErrors.formalIntentRequest}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">By-Laws</label>
                    <FileUpload onFileSelect={handleFileChange('byLaws')} />
                    {formErrors.byLaws && <p className="text-red-500 text-xs mt-1">{formErrors.byLaws}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Leadership Information</label>
                    <FileUpload onFileSelect={handleFileChange('leadershipInfo')} />
                    {formErrors.leadershipInfo && <p className="text-red-500 text-xs mt-1">{formErrors.leadershipInfo}</p>}
                </div>
            </div>
        )}
        {currentStep === 4 && (
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proof of Payment</label>
                    <FileUpload onFileSelect={handleFileChange('proofOfPayment')} />
                    {formErrors.proofOfPayment && <p className="text-red-500 text-xs mt-1">{formErrors.proofOfPayment}</p>}
                </div>
            </div>
        )}
        {currentStep === 5 && (
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
        {currentStep === 6 && (
            <div className="space-y-6">
                <div className="relative">
                    <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="password" className={labelClasses}>Password</label>
                    {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                </div>
                <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
                    {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
                </div>
            </div>
        )}
        {currentStep === 7 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Preview Your Details</h2>
            <div className="text-left mt-4 bg-gray-50 p-4 rounded-lg text-gray-800">
              <p><strong>Sacco Name:</strong> {formData.name}</p>
              <p><strong>Registration Number:</strong> {formData.registrationNumber}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Registration Certificate:</strong> {formData.registrationCertificate ? formData.registrationCertificate.name : 'Not uploaded'}</p>
              <p><strong>Formal Intent Request:</strong> {formData.formalIntentRequest ? formData.formalIntentRequest.name : 'Not uploaded'}</p>
              <p><strong>By-Laws:</strong> {formData.byLaws ? formData.byLaws.name : 'Not uploaded'}</p>
              <p><strong>Leadership Information:</strong> {formData.leadershipInfo ? formData.leadershipInfo.name : 'Not uploaded'}</p>
              <p><strong>Proof of Payment:</strong> {formData.proofOfPayment ? formData.proofOfPayment.name : 'Not uploaded'}</p>
            </div>
            <div className="flex items-center mt-4">
                <input id="agreedToTerms" name="agreedToTerms" type="checkbox" checked={formData.agreedToTerms} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-black">I confirm that all the information I have provided is correct.</label>
            </div>
            {formErrors.agreedToTerms && <p className="text-red-500 text-xs mt-1">{formErrors.agreedToTerms}</p>}
          </div>
        )}
        {currentStep === 8 && (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Final Step</h2>
                <p className="mt-2 text-lg text-gray-700">
                    Your SACCO account is ready to be created. Click the button below to finalize your registration.
                </p>
                <Button onClick={handleSubmit} disabled={loading} className="mt-6 w-full">
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </div>
        )}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && currentStep < 8 && (
            <Button onClick={handleBack} variant="flat" type="button">
                <FiArrowLeft className="mr-2"/>
                Back
            </Button>
          )}
          {currentStep < 8 && (
            <Button onClick={handleNext} variant="flat" type="button">
                Next
                <FiArrowRight className="ml-2"/>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
