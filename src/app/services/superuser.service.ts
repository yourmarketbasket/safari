import api from '../lib/api';
import { User, UserRank, UserStatus } from '../models/User.model';
import { Permission } from '../models/Permission.model';
import axios from 'axios';

export type LoginCredentials = {
  emailOrPhone: string;
  password?: string;
}

export type SignupData = Omit<User, 'id'> & { verifiedToken?: string };

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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Could not login');
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
  await api.post('/auth/send-otp', { email });
};

/**
 * Verifies the signup OTP.
 */
export const verifySignupOtp = async (email: string, otp: string): Promise<string> => {
  const response = await api.post('/auth/verify-otp', { email, otp });
  return response.data.data.verifiedToken;
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

// User Management
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUserStatus = async (id: string, status: UserStatus): Promise<User> => {
  const response = await api.put(`/users/${id}/status`, { status });
  return response.data;
};

export const updateUserRank = async (id: string, rank: UserRank): Promise<User> => {
  const response = await api.put(`/users/${id}/rank`, { rank });
  return response.data;
};

export const addUserPermission = async (id: string, permission: string): Promise<User> => {
  const response = await api.post(`/users/${id}/permissions`, { permission });
  return response.data;
};

export const addUserPermissions = async (id: string, permissions: string[]): Promise<User> => {
    const response = await api.post(`/users/${id}/permissions`, { permissions });
    return response.data;
};

export const removeUserPermission = async (id: string, permission: string): Promise<User> => {
  const response = await api.delete(`/users/${id}/permissions/${permission}`);
  return response.data;
};

// Permission Management
export const createPermission = async (permission: Omit<Permission, 'permissionNumber'>): Promise<Permission> => {
  const response = await api.post('/permissions', permission);
  return response.data;
};

export const createPermissions = async (permissions: Omit<Permission, 'permissionNumber'>[]): Promise<Permission[]> => {
    const response = await api.post('/permissions', permissions);
    return response.data;
};

export const getAllPermissions = async (): Promise<Permission[]> => {
  const response = await api.get('/permissions');
  return response.data;
};

export const getPermissionById = async (id: string): Promise<Permission> => {
  const response = await api.get(`/permissions/${id}`);
  return response.data;
};

export const updatePermission = async (id: string, permission: Partial<Permission>): Promise<Permission> => {
  const response = await api.put(`/permissions/${id}`, permission);
  return response.data;
};

export const deletePermission = async (id: string): Promise<void> => {
  await api.delete(`/permissions/${id}`);
};

const superuserService = {
  login,
  register,
  sendSignupOtp,
  verifySignupOtp,
  getSupportStaff,
  addSupportStaff,
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateUserRank,
  addUserPermission,
  addUserPermissions,
  removeUserPermission,
  createPermission,
  createPermissions,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};

export default superuserService;
