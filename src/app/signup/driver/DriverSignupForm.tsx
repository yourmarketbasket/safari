"use client";

import { useState } from 'react';
import Stepper from '@/app/components/Stepper';
import { Button } from '@/app/components/ui/Button';
import Message from '@/app/components/Message';
import OtpInput from '@/app/components/OtpInput';
import authService from '@/app/services/auth.service';
import { useAuth } from '@/app/lib/AuthContext';
import FileUpload from '@/app/components/FileUpload';
import { FiUser, FiPhone, FiFileText, FiUpload, FiMail, FiLock, FiCheck, FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

export default function DriverSignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
    idNumber: string;
    idFrontPhoto: File | null;
    idBackPhoto: File | null;
    licenseNumber: string;
    licenseExpiry: string;
    licenseIssueDate: string;
    licenseClass: string;
    endorsements: string;
    drivingLicense: File | null;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
    deviceDetails: string;
  }>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    idNumber: '',
    idFrontPhoto: null,
    idBackPhoto: null,
    licenseNumber: '',
    licenseExpiry: '',
    licenseIssueDate: '',
    licenseClass: '',
    endorsements: '',
    drivingLicense: null,
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
        if (age < 24) {
            errors.dob = 'You must be at least 24 years old.';
        }
      }
      if (!formData.gender) errors.gender = 'Gender is required.';
      if (!formData.idNumber) errors.idNumber = 'ID number is required.';
    }
    if (step === 2) {
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
        if (!formData.address) errors.address = 'Address is required.';
    }
    if (step === 3) {
        if (!formData.licenseNumber) errors.licenseNumber = 'License number is required.';
        if (!formData.licenseClass) errors.licenseClass = 'License class is required.';
        if (!formData.licenseIssueDate) {
            errors.licenseIssueDate = 'License issue date is required.';
        } else {
            const today = new Date();
            const issueDate = new Date(formData.licenseIssueDate);
            let yearsHeld = today.getFullYear() - issueDate.getFullYear();
            const m = today.getMonth() - issueDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < issueDate.getDate())) {
                yearsHeld--;
            }
            if (yearsHeld < 4) {
                errors.licenseIssueDate = 'You must have held your license for at least 4 years.';
            }
        }
        if (!formData.licenseExpiry) errors.licenseExpiry = 'License expiry date is required.';
    }
    if (step === 4) {
        if (!formData.endorsements) errors.endorsements = 'Endorsements are required.';
        if (!formData.idFrontPhoto) errors.idFrontPhoto = 'ID front photo is required.';
        if (!formData.idBackPhoto) errors.idBackPhoto = 'ID back photo is required.';
        if (!formData.drivingLicense) errors.drivingLicense = 'Driving license scan is required.';
    }
    if (step === 6) {
        if (!formData.password) errors.password = 'Password is required.';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  };

  const handleNext = () => {
    // For the preview step, we need to validate all previous steps
    if (currentStep === 7) {
        let allErrors: Record<string, string> = {};
        for (let i = 1; i <= 6; i++) {
            allErrors = {...allErrors, ...validateStep(i)};
        }
        if (Object.keys(allErrors).length > 0) {
            setFormErrors(allErrors);
            // Find the first step with an error and go to it
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
    // Final validation check before submitting
    if (!formData.agreedToTerms) {
      setFormErrors({ agreedToTerms: 'You must agree to the terms and conditions.' });
      setCurrentStep(7); // Go back to preview step
      return;
    }
    setLoading(true);
    try {
      const finalFormData = {
        ...formData,
        role: 'driver' as const,
        deviceDetails: navigator.userAgent,
        verifiedToken
      };
      await signup(finalFormData);
      // On successful signup, AuthContext will redirect, but we can also move to a success screen
      setSuccessMessage("Account created successfully! Redirecting...");
    } catch (err) {
      setFormErrors({ submit: 'Failed to create account. Please try again.' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";
  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 pointer-events-none peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs";

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
    { status: getStepStatus(3), icon: FiFileText, label: 'License Details' },
    { status: getStepStatus(4), icon: FiUpload, label: 'Documents' },
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
                <input id="idNumber" name="idNumber" type="text" required value={formData.idNumber} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="idNumber" className={labelClasses}>ID Number</label>
                {formErrors.idNumber && <p className="text-red-500 text-xs mt-1">{formErrors.idNumber}</p>}
            </div>
          </div>
        )}
        {currentStep === 2 && (
            <div className="space-y-6">
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
                <div className="relative">
                    <input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="address" className={labelClasses}>Address</label>
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>
            </div>
        )}
        {currentStep === 3 && (
            <div className="space-y-6">
                <div className="relative">
                    <input id="licenseNumber" name="licenseNumber" type="text" required value={formData.licenseNumber} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="licenseNumber" className={labelClasses}>License Number</label>
                    {formErrors.licenseNumber && <p className="text-red-500 text-xs mt-1">{formErrors.licenseNumber}</p>}
                </div>
                <div className="relative">
                    <input id="licenseClass" name="licenseClass" type="text" required value={formData.licenseClass} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="licenseClass" className={labelClasses}>License Class</label>
                    {formErrors.licenseClass && <p className="text-red-500 text-xs mt-1">{formErrors.licenseClass}</p>}
                </div>
                <div className="relative">
                    <input id="licenseIssueDate" name="licenseIssueDate" type="date" required value={formData.licenseIssueDate} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="licenseIssueDate" className={labelClasses}>License Issue Date</label>
                    {formErrors.licenseIssueDate && <p className="text-red-500 text-xs mt-1">{formErrors.licenseIssueDate}</p>}
                </div>
                <div className="relative">
                    <input id="licenseExpiry" name="licenseExpiry" type="date" required value={formData.licenseExpiry} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="licenseExpiry" className={labelClasses}>License Expiry Date</label>
                    {formErrors.licenseExpiry && <p className="text-red-500 text-xs mt-1">{formErrors.licenseExpiry}</p>}
                </div>
            </div>
        )}
        {currentStep === 4 && (
            <div className="space-y-6">
                 <div className="relative">
                    <input id="endorsements" name="endorsements" type="text" required value={formData.endorsements} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="endorsements" className={labelClasses}>Endorsements</label>
                    {formErrors.endorsements && <p className="text-red-500 text-xs mt-1">{formErrors.endorsements}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Front Photo</label>
                    <FileUpload onFileSelect={handleFileChange('idFrontPhoto')} />
                    {formErrors.idFrontPhoto && <p className="text-red-500 text-xs mt-1">{formErrors.idFrontPhoto}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Back Photo</label>
                    <FileUpload onFileSelect={handleFileChange('idBackPhoto')} />
                    {formErrors.idBackPhoto && <p className="text-red-500 text-xs mt-1">{formErrors.idBackPhoto}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Driving License Scan</label>
                    <FileUpload onFileSelect={handleFileChange('drivingLicense')} />
                    {formErrors.drivingLicense && <p className="text-red-500 text-xs mt-1">{formErrors.drivingLicense}</p>}
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
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Date of Birth:</strong> {formData.dob}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>ID Number:</strong> {formData.idNumber}</p>
              <p><strong>ID Front Photo:</strong> {formData.idFrontPhoto ? formData.idFrontPhoto.name : 'Not uploaded'}</p>
              <p><strong>ID Back Photo:</strong> {formData.idBackPhoto ? formData.idBackPhoto.name : 'Not uploaded'}</p>
              <p><strong>License Number:</strong> {formData.licenseNumber}</p>
              <p><strong>License Class:</strong> {formData.licenseClass}</p>
              <p><strong>License Issue Date:</strong> {formData.licenseIssueDate}</p>
              <p><strong>License Expiry Date:</strong> {formData.licenseExpiry}</p>
              <p><strong>Endorsements:</strong> {formData.endorsements}</p>
              <p><strong>Driving License:</strong> {formData.drivingLicense ? formData.drivingLicense.name : 'Not uploaded'}</p>
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
                You are all set. Click the button below to create your account.
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
