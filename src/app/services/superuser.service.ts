import api from '../lib/api';
import { User } from '../models/User.model';
import axios from 'axios';

export type LoginCredentials = {
  emailOrPhone: string;
  password?: string;
}

export type SignupData = Omit<User, 'id'>;

export type NewStaffData = Omit<User, 'id' | 'role'> & { role?: string };

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
 * Logs in a superuser.
 */
export const login = async (loginData: LoginCredentials): Promise<AuthData> => {
  try {
    const response = await api.post<AuthResponse>('/superuser/login', loginData);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      throw new Error('Could not login');
    }
    throw error;
  }
};

/**
 * Registers a new superuser.
 */
export const register = async (userData: SignupData, adminKey: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/superuser/register', { userData, adminKey });
  return response.data;
};

/**
 * Sends a signup OTP to the user's email.
 */
export const sendSignupOtp = async (email: string): Promise<void> => {
  await api.post('/auth/send-signup-otp', { email });
};

/**
 * Verifies the signup OTP.
 */
export const verifySignupOtp = async (email: string, otp: string): Promise<void> => {
  await api.post('/auth/verify-signup-otp', { email, otp });
};

export const getSupportStaff = async (): Promise<User[]> => {
    // This is a dummy implementation
    return [];
};

export const addSupportStaff = async (staffData: NewStaffData): Promise<User> => {
    // This is a dummy implementation
    console.log(staffData);
    return {} as User;
};

const superuserService = {
  login,
  register,
  sendSignupOtp,
  verifySignupOtp,
  getSupportStaff,
  addSupportStaff,
};

export default superuserService;
