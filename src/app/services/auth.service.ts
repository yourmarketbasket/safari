import api from '../lib/api';
import { User } from '../models/User.model';

// Types for authentication function arguments
export type LoginCredentials = {
  emailOrPhone: string;
  password?: string;
  mfaCode?: string;
}

// Omit 'id' and 'role' for signup, as these are usually set by the server
export type SignupData = Omit<User, 'id' | 'role'>;

export type SuperuserSignupData = SignupData & {
    adminKey: string;
}

export type ForgotPasswordData = {
    emailOrPhone: string;
}

export type ResetPasswordData = {
    otp: string;
    newPassword?: string;
}

// The API response for a successful login/signup
export type AuthResponse = {
    token: string;
    user: User;
}

/**
 * Logs in a user.
 * The request body will be automatically encrypted by the api instance.
 */
export const login = async (loginData: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', loginData);
  return response.data;
};

/**
 * Signs up a new user (Support Staff or Admin).
 */
export const signup = async (signupData: SignupData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signup', signupData);
  return response.data;
};

/**
 * Registers a new superuser.
 */
export const registerSuperuser = async (superuserData: SuperuserSignupData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register-superuser', superuserData);
  return response.data;
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

const authService = {
  login,
  signup,
  registerSuperuser,
  forgotPassword,
  resetPassword,
  logout,
};

export default authService;
