import api from '../lib/api';
import { User, UserRank, ApprovedStatus } from '../models/User.model';
import { Permission } from '../models/Permission.model';
import axios from 'axios';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export type LoginCredentials = {
  emailOrPhone: string;
  password?: string;
}

import { UserRole } from '../models/User.model';

export type SignupData = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  password?: string;
  role?: UserRole;
  mfaSecret?: string;
  rank?: UserRank;
  approvedStatus?: ApprovedStatus;
  permissions?: string[];
  verified?: {
    email: boolean;
    phone: boolean;
  };
  verifiedToken?: string;
};

export type NewStaffData = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  password?: string;
  mfaSecret?: string;
  rank?: UserRank;
  approvedStatus?: ApprovedStatus;
  permissions?: string[];
  verified?: {
    email: boolean;
    phone: boolean;
  };
  role?: string;
};

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
  const response = await api.post<ApiResponse<{ verifiedToken: string }>>('/auth/verify-otp', { email, otp });
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
  const response = await api.get<ApiResponse<User[]>>('/users');
  return response.data.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<ApiResponse<User>>(`/users/${id}`);
  return response.data.data;
};

export const updateUserStatus = async (id: string, status: ApprovedStatus): Promise<User> => {
  const response = await api.put<ApiResponse<User>>(`/users/${id}/status`, { status });
  return response.data.data;
};

export const updateUserRank = async (id: string, rank: UserRank): Promise<User> => {
  const response = await api.put<ApiResponse<User>>(`/users/${id}/rank`, { rank });
  return response.data.data;
};

export const addUserPermission = async (id: string, permission: string): Promise<User> => {
  const response = await api.post<ApiResponse<User>>(`/users/${id}/permissions`, { permission });
  return response.data.data;
};

export const addUserPermissions = async (id: string, permissions: string[]): Promise<User> => {
    const response = await api.post<ApiResponse<User>>(`/users/${id}/permissions`, { permissions });
    return response.data.data;
};

export const removeUserPermission = async (id: string, permission: string): Promise<User> => {
  const response = await api.delete<ApiResponse<User>>(`/users/${id}/permissions/${permission}`);
  return response.data.data;
};

// Permission Management
export const createPermission = async (permission: Omit<Permission, '_id'>): Promise<Permission> => {
  const response = await api.post<ApiResponse<Permission>>('/permissions', permission);
  return response.data.data;
};

export const createPermissions = async (permissions: Omit<Permission, '_id'>[]): Promise<Permission[]> => {
    const response = await api.post<ApiResponse<Permission[]>>('/permissions', permissions);
    return response.data.data;
};

export const getAllPermissions = async (): Promise<Permission[]> => {
  const response = await api.get<ApiResponse<Permission[]>>('/permissions');
  return response.data.data;
};

export const getPermissionByNumber = async (permissionNumber: string): Promise<Permission> => {
  const response = await api.get<ApiResponse<Permission>>(`/permissions/${permissionNumber}`);
  return response.data.data;
};

export const updatePermission = async (permissionNumber: string, permission: Partial<Permission>): Promise<Permission> => {
  const response = await api.put<ApiResponse<Permission>>(`/permissions/${permissionNumber}`, permission);
  return response.data.data;
};

export const deletePermission = async (permissionNumber: string): Promise<void> => {
  await api.delete<ApiResponse<object>>(`/permissions/${permissionNumber}`);
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
  getPermissionByNumber,
  updatePermission,
  deletePermission,
};

export default superuserService;
