"use client";

import { useState } from 'react';
import Stepper from '@/app/components/Stepper';
import { Button } from '@/app/components/ui/Button';
import Message from '@/app/components/Message';
import OtpInput from '@/app/components/OtpInput';
import authService from '@/app/services/auth.service';
import FileUpload from '@/app/components/FileUpload';
import { uploadToCloudinary } from '@/app/services/cloudinary.service';
import { useRouter } from 'next/navigation';
import { FiUser, FiPhone, FiCamera, FiMail, FiLock, FiCheck, FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

export default function PassengerSignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    profilePhoto: null as File | null,
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    deviceDetails: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, profilePhoto: file }));
  };

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) errors.name = 'Full name is required.';
      if (!formData.dob) {
        errors.dob = 'Date of birth is required.';
      } else {
        const today = new Date();
        const birthDate = new Date(formData.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            errors.dob = 'You must be at least 18 years old.';
        }
      }
      if (!formData.gender) errors.gender = 'Gender is required.';
      if (!formData.email) {
        errors.email = 'Email is required.';
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email address.';
      }
    }
    if (step === 2) {
        if (!formData.phone) {
            errors.phone = 'Phone number is required.';
        } else if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'Invalid phone number.';
        }
        if (!formData.address) errors.address = 'Address is required.';
    }
    if (step === 5) {
        if (!formData.password) errors.password = 'Password is required.';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  };

  const handleNext = () => {
    if (currentStep === 6) { // Preview Step
        let allErrors: Record<string, string> = {};
        for (let i = 1; i <= 5; i++) {
            allErrors = {...allErrors, ...validateStep(i)};
        }
        if (Object.keys(allErrors).length > 0) {
            setFormErrors(allErrors);
            for (let i = 1; i <= 5; i++) {
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
      setCurrentStep(6); // Go back to preview step
      return;
    }
    setLoading(true);
    try {
      const profilePhotoUrl = formData.profilePhoto ? await uploadToCloudinary(formData.profilePhoto) : '';

      const finalFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dob: formData.dob,
        profilePhoto: profilePhotoUrl,
        verifiedToken
      };
      await authService.signupPassenger(finalFormData);
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setFormErrors({ submit: 'Failed to create account. Please try again.' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "peer h-12 w-full border border-gray-300 rounded-md bg-transparent px-4 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none";
  const labelClasses = "absolute left-2 top-3.5 text-gray-400 text-base transition-all pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1";

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
    { status: getStepStatus(1), icon: FiUser, label: 'Personal Info' },
    { status: getStepStatus(2), icon: FiPhone, label: 'Contact Info' },
    { status: getStepStatus(3), icon: FiCamera, label: 'Profile Photo' },
    { status: getStepStatus(4), icon: FiMail, label: 'Verify Email' },
    { status: getStepStatus(5), icon: FiLock, label: 'Password' },
    { status: getStepStatus(6), icon: FiEye, label: 'Preview' },
    { status: getStepStatus(7), icon: FiCheck, label: 'Done' },
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
                <label htmlFor="name" className={labelClasses}>Full Name</label>
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div className="relative">
                <input id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="dob" className={labelClasses}>Date of Birth</label>
                {formErrors.dob && <p className="text-red-500 text-xs mt-1">{formErrors.dob}</p>}
            </div>
            <div className="relative">
                <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className={inputClasses}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="gender" className={labelClasses}>Gender</label>
                {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
            </div>
            <div className="relative">
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
          </div>
        )}
        {currentStep === 2 && (
            <div className="space-y-6">
                <div className="relative">
                    <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div className="relative">
                    <input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="address" className={labelClasses}>Address</label>
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>
            </div>
        )}
        {currentStep === 3 && (
            <div className="space-y-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo (Optional)</label>
                <FileUpload onFileSelect={handleFileChange} />
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
                    {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                </div>
                <div className="relative">
                    <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
                    {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
                </div>
            </div>
        )}
        {currentStep === 6 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Preview Your Details</h2>
            <div className="text-left mt-4 bg-gray-50 p-4 rounded-lg text-gray-800">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Date of Birth:</strong> {formData.dob}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Profile Photo:</strong> {formData.profilePhoto ? formData.profilePhoto.name : 'Not uploaded'}</p>
            </div>
            <div className="flex items-center mt-4">
                <input id="agreedToTerms" name="agreedToTerms" type="checkbox" checked={formData.agreedToTerms} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-black">I confirm that all the information I have provided is correct.</label>
            </div>
            {formErrors.agreedToTerms && <p className="text-red-500 text-xs mt-1">{formErrors.agreedToTerms}</p>}
          </div>
        )}
        {currentStep === 7 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Final Step</h2>
            <p className="mt-2 text-lg text-gray-700">
                You are all set. Click the button below to create your account.
            </p>
            <Button onClick={handleSubmit} disabled={loading} className="mt-6 w-full">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 && currentStep < 7 && (
            <Button onClick={handleBack} variant="flat" type="button">
                <FiArrowLeft className="mr-2"/>
                Back
            </Button>
          )}
          {currentStep < 7 && (
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
