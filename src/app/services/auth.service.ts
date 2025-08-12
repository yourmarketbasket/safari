import api from '../lib/api';
import { User } from '../models/User.model';

// Types for authentication function arguments
export type LoginCredentials = {
  emailOrPhone: string;
  password?: string;
  // mfaCode is removed from initial login
}


export type ForgotPasswordData = {
    emailOrPhone: string;
}

export type ResetPasswordData = {
    otp: string;
    newPassword?: string;
}

export type VerifyMfaData = {
    mfaToken: string;
    mfaCode: string;
}

// The API response for a successful login/signup
// It can be a partial response if MFA is required.
export type AuthData = {
    token: string;
    user: User;
    mfaRequired?: false;
} | {
    mfaRequired: true;
    mfaToken: string;
}

export type AuthResponse = {
    success: boolean;
    data: AuthData;
}

/**
 * Logs in a user. Can return a final auth token or an MFA token.
 */
import axios from 'axios';

export const login = async (loginData: LoginCredentials): Promise<AuthData> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', loginData);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Could not login');
    }
    throw error;
  }
};

/**
 * Verifies the MFA code using the temporary MFA token.
 */
export const verifyMfa = async (verifyData: VerifyMfaData): Promise<AuthData> => {
    const response = await api.post<AuthResponse>('/auth/verify-mfa', verifyData);
    return response.data.data;
}

// Signup data types
export type PassengerSignupData = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  verifiedToken?: string;
  dob?: string;
  profilePhoto?: string;
};

export type SaccoSignupData = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  registrationNumber?: string;
  byLawsDocument?: string;
  leadershipInfoDocument?: string;
  registrationFeePaymentProof?: string;
  address?: object;
  verifiedToken?: string;
};

export type OwnerSignupData = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  idNumberOrBusinessRegNo?: string;
  kraPinCertificate?: string;
  saccoAffiliation?: string;
  verifiedToken?: string;
};

export type QueueManagerSignupData = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  idNumber?: string;
  drivingLicense?: string;
  dob?: string;
  verifiedToken?: string;
};

export type DriverSignupData = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  licenseNumber?: string;
  saccoId?: string;
  idNumber?: string;
  idPhotoFront?: string;
  idPhotoBack?: string;
  drivingLicenseExpiry?: string;
  drivingLicensePhoto?: string;
  dob?: string;
  gender?: string;
  verifiedToken?: string;
};

// Signup functions
export const signupPassenger = async (data: PassengerSignupData): Promise<AuthData> => {
  const response = await api.post<AuthResponse>('/passengers/signup', data);
  return response.data.data;
};

export const signupSacco = async (data: SaccoSignupData): Promise<AuthData> => {
  const response = await api.post<AuthResponse>('/saccos/signup', data);
  return response.data.data;
};

export const signupOwner = async (data: OwnerSignupData): Promise<AuthData> => {
  const response = await api.post<AuthResponse>('/owners/signup', data);
  return response.data.data;
};

export const signupQueueManager = async (data: QueueManagerSignupData): Promise<AuthData> => {
  const response = await api.post<AuthResponse>('/queue-managers/signup', data);
  return response.data.data;
};

export const signupDriver = async (data: DriverSignupData): Promise<AuthData> => {
  const response = await api.post<AuthResponse>('/drivers/signup', data);
  return response.data.data;
};

/**
 * Sends a signup OTP to the user's email.
 */
export const sendSignupOtp = async (email: string): Promise<void> => {
  await api.post('/auth/send-otp', { email });
};

/**
 * Verifies the signup OTP.
 */
export const verifySignupOtp = async (email: string, otp: string): Promise<string> => {
  const response = await api.post('/auth/verify-otp', { email, otp });
  return response.data.data.verifiedToken;
};

/**
 * Sends a password reset OTP.
 */
export const forgotPassword = async (forgotPasswordData: ForgotPasswordData): Promise<void> => {
  await api.post('/auth/forgot-password', forgotPasswordData);
};

/**
 * Resets the user's password using an OTP.
 */
export const resetPassword = async (resetPasswordData: ResetPasswordData): Promise<void> => {
  await api.post('/auth/reset-password', resetPasswordData);
};

/**
 * Logs out the user.
 */
export const logout = () => {
  console.log('User logged out.');
};

/**
 * Fetches the current user's profile.
 */
export const getProfile = async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
};

const authService = {
  login,
  verifyMfa,
  sendSignupOtp,
  verifySignupOtp,
  forgotPassword,
  resetPassword,
  logout,
  getProfile,
  signupPassenger,
  signupSacco,
  signupOwner,
  signupQueueManager,
  signupDriver,
};

export default authService;
