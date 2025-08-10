import api from '../lib/api';
import { User } from '../models/User.model';

// Types for authentication function arguments
export type LoginCredentials = {
  emailOrPhone: string;
  password?: string;
  // mfaCode is removed from initial login
}

import { UserRole } from '../models/User.model';

export type SignupData = {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    password?: string;
    verifiedToken?: string;
    address?: string;
    dob?: string;
    gender?: string;
    deviceDetails?: string;
    drivingLicense?: File | null;
    saccoLicense?: File | null;
    saccoRegistrationNumber?: string;
};

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

/**
 * Signs up a new user.
 */
export const signup = async (signupData: SignupData): Promise<AuthData> => {
    const { drivingLicense, saccoLicense, ...rest } = signupData;

    if (drivingLicense || saccoLicense) {
        const formData = new FormData();
        Object.keys(rest).forEach(key => {
            const value = (rest as Record<string, string | Blob | null>)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (drivingLicense) {
            formData.append('drivingLicense', drivingLicense);
        }
        if (saccoLicense) {
            formData.append('saccoLicense', saccoLicense);
        }

        const response = await api.post<AuthResponse>('/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } else {
        const response = await api.post<AuthResponse>('/auth/signup', signupData);
        return response.data.data;
    }
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
  signup,
  sendSignupOtp,
  verifySignupOtp,
  forgotPassword,
  resetPassword,
  logout,
  getProfile,
};

export default authService;
