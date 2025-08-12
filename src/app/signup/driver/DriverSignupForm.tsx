"use client";

import { useState } from 'react';
import Stepper from '@/app/components/Stepper';
import { Button } from '@/app/components/ui/Button';
import Message from '@/app/components/Message';
import OtpInput from '@/app/components/OtpInput';
import authService from '@/app/services/auth.service';
import FileUpload from '@/app/components/FileUpload';
import { useRouter } from 'next/navigation';
import { uploadToCloudinary } from '@/app/services/cloudinary.service';
import { FiUser, FiPhone, FiFileText, FiUpload, FiMail, FiLock, FiCheck, FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,12}$/;

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

type DriverFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  idNumber: string;
  saccoId: string;
  idPhotoFront: File | null;
  idPhotoBack: File | null;
  licenseNumber: string;
  licenseExpiry: string;
  licenseIssueDate: string;
  licenseClass: string;
  endorsements: string;
  drivingLicensePhoto: File | null;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
  deviceDetails: string;
};

export default function DriverSignUpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DriverFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    idNumber: '',
    saccoId: '',
    idPhotoFront: null,
    idPhotoBack: null,
    licenseNumber: '',
    licenseExpiry: '',
    licenseIssueDate: '',
    licenseClass: '',
    endorsements: '',
    drivingLicensePhoto: null,
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
      if (!formData.saccoId) errors.saccoId = 'SACCO ID is required.';
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
    }
    if (step === 3) {
        if (!formData.licenseNumber) errors.licenseNumber = 'License number is required.';
        if (!formData.licenseExpiry) errors.licenseExpiry = 'License expiry date is required.';
    }
    if (step === 4) {
        if (!formData['idPhotoFront']) errors['idPhotoFront'] = 'ID front photo is required.';
        if (!formData['idPhotoBack']) errors['idPhotoBack'] = 'ID back photo is required.';
        if (!formData['drivingLicensePhoto']) errors['drivingLicensePhoto'] = 'Driving license scan is required.';
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
    setFormErrors({});

    try {
      // Step 1: Upload files to Cloudinary
      const idPhotoFrontUrl = formData.idPhotoFront ? await uploadToCloudinary(formData.idPhotoFront) : '';
      const idPhotoBackUrl = formData.idPhotoBack ? await uploadToCloudinary(formData.idPhotoBack) : '';
      const drivingLicensePhotoUrl = formData.drivingLicensePhoto ? await uploadToCloudinary(formData.drivingLicensePhoto) : '';

      // Step 2: Prepare data for your backend
      const finalFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        licenseNumber: formData.licenseNumber,
        saccoId: formData.saccoId,
        idNumber: formData.idNumber,
        idPhotoFront: idPhotoFrontUrl,
        idPhotoBack: idPhotoBackUrl,
        drivingLicenseExpiry: formData.licenseExpiry,
        drivingLicensePhoto: drivingLicensePhotoUrl,
        dob: formData.dob,
        gender: formData.gender,
        verifiedToken
      };

      // Step 3: Call your backend signup service
      await authService.signupDriver(finalFormData);

      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setFormErrors({ submit: 'Failed to create account. Please check your details and try again.' });
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
            <div className="relative">
                <input id="saccoId" name="saccoId" type="text" required value={formData.saccoId} onChange={handleChange} placeholder=" " className={inputClasses}/>
                <label htmlFor="saccoId" className={labelClasses}>SACCO ID</label>
                {formErrors.saccoId && <p className="text-red-500 text-xs mt-1">{formErrors.saccoId}</p>}
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
                    <input id="licenseClass" name="licenseClass" type="text" value={formData.licenseClass} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="licenseClass" className={labelClasses}>License Class (Optional)</label>
                    {formErrors.licenseClass && <p className="text-red-500 text-xs mt-1">{formErrors.licenseClass}</p>}
                </div>
                <div className="relative">
                    <input id="licenseIssueDate" name="licenseIssueDate" type="date" value={formData.licenseIssueDate} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="licenseIssueDate" className={labelClasses}>License Issue Date (Optional)</label>
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
                    <input id="endorsements" name="endorsements" type="text" value={formData.endorsements} onChange={handleChange} placeholder=" " className={inputClasses}/>
                    <label htmlFor="endorsements" className={labelClasses}>Endorsements (Optional)</label>
                    {formErrors.endorsements && <p className="text-red-500 text-xs mt-1">{formErrors.endorsements}</p>}
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">ID Front Photo</label>
                        <FileUpload onFileSelect={handleFileChange('idPhotoFront')} />
                        {formErrors.idPhotoFront && <p className="text-red-500 text-xs mt-1">{formErrors.idPhotoFront}</p>}
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">ID Back Photo</label>
                        <FileUpload onFileSelect={handleFileChange('idPhotoBack')} />
                        {formErrors.idPhotoBack && <p className="text-red-500 text-xs mt-1">{formErrors.idPhotoBack}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Driving License Photo</label>
                    <FileUpload onFileSelect={handleFileChange('drivingLicensePhoto')} />
                    {formErrors.drivingLicensePhoto && <p className="text-red-500 text-xs mt-1">{formErrors.drivingLicensePhoto}</p>}
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
              <p><strong>SACCO ID:</strong> {formData.saccoId}</p>
              <p><strong>ID Front Photo:</strong> {formData.idPhotoFront ? formData.idPhotoFront.name : 'Not uploaded'}</p>
              <p><strong>ID Back Photo:</strong> {formData.idPhotoBack ? formData.idPhotoBack.name : 'Not uploaded'}</p>
              <p><strong>License Number:</strong> {formData.licenseNumber}</p>
              <p><strong>License Class:</strong> {formData.licenseClass || 'N/A'}</p>
              <p><strong>License Issue Date:</strong> {formData.licenseIssueDate || 'N/A'}</p>
              <p><strong>License Expiry Date:</strong> {formData.licenseExpiry}</p>
              <p><strong>Endorsements:</strong> {formData.endorsements || 'N/A'}</p>
              <p><strong>Driving License Photo:</strong> {formData.drivingLicensePhoto ? formData.drivingLicensePhoto.name : 'Not uploaded'}</p>
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
