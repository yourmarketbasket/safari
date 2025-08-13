import api from '../lib/api';
import { User, UserRank, ApprovedStatus } from '../models/User.model';
import { Permission } from '../models/Permission.model';
import { Team } from '../models/Team.model';
import { SupportGroup } from '../models/SupportGroup.model';
import { SupportTicket } from '../models/SupportTicket.model';
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
  rememberMe?: boolean;
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
    success: true;
    data: AuthData;
}

/**
 * Logs in a superuser.
 */
export type ErrorResponse = {
  success: false;
  error?: string;
  message?: string;
};

export const login = async (loginData: LoginCredentials): Promise<AuthResponse | ErrorResponse> => {
  try {
    const response = await api.post<AuthResponse | ErrorResponse>('/superuser/login', loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { success: false, error: 'An unknown error occurred' };
  }
};

export type SuperuserRegistrationData = {
    name: string;
    email: string;
    phone?: string;
    password?: string;
};

/**
 * Registers a new superuser.
 */
export const register = async (userData: SuperuserRegistrationData, adminKey: string): Promise<AuthResponse> => {
  const payload = {
    adminKey,
    userData,
  };
  const response = await api.post<AuthResponse | ErrorResponse>('/superuser/register', payload);
  if (response.data.success) {
    return response.data as AuthResponse;
  } else {
    const errorData = response.data as ErrorResponse;
    throw new Error(errorData.error || errorData.message || 'Registration failed');
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

// Team Management
export const getAllTeams = async (): Promise<Team[]> => {
    const response = await api.get<ApiResponse<Team[]>>('/teams');
    return response.data.data;
};

export const createTeam = async (teamData: { name: string; teamLead: string }): Promise<Team> => {
    const response = await api.post<ApiResponse<Team>>('/teams', teamData);
    return response.data.data;
};

export const updateTeam = async (id: string, teamData: Partial<{ name: string; teamLead: string }>): Promise<Team> => {
    const response = await api.put<ApiResponse<Team>>(`/teams/${id}`, teamData);
    return response.data.data;
};

export const deleteTeam = async (id: string): Promise<void> => {
    await api.delete(`/teams/${id}`);
};

export const addTeamMember = async (teamId: string, userId: string): Promise<Team> => {
    const response = await api.post<ApiResponse<Team>>(`/teams/${teamId}/members/${userId}`);
    return response.data.data;
};

export const removeTeamMember = async (teamId: string, userId: string): Promise<Team> => {
    const response = await api.delete<ApiResponse<Team>>(`/teams/${teamId}/members/${userId}`);
    return response.data.data;
};

// Support Group Management
export const getAllSupportGroups = async (): Promise<SupportGroup[]> => {
    const response = await api.get<ApiResponse<SupportGroup[]>>('/support-groups');
    return response.data.data;
};

export const createSupportGroup = async (groupData: { name: string; supervisor: string }): Promise<SupportGroup> => {
    const response = await api.post<ApiResponse<SupportGroup>>('/support-groups', groupData);
    return response.data.data;
};

export const updateSupportGroup = async (id: string, groupData: Partial<{ name: string; supervisor: string }>): Promise<SupportGroup> => {
    const response = await api.put<ApiResponse<SupportGroup>>(`/support-groups/${id}`, groupData);
    return response.data.data;
};

export const deleteSupportGroup = async (id: string): Promise<void> => {
    await api.delete(`/support-groups/${id}`);
};

export const addSupportGroupMember = async (groupId: string, userId: string): Promise<SupportGroup> => {
    const response = await api.post<ApiResponse<SupportGroup>>(`/support-groups/${groupId}/members/${userId}`);
    return response.data.data;
};

export const removeSupportGroupMember = async (groupId: string, userId: string): Promise<SupportGroup> => {
    const response = await api.delete<ApiResponse<SupportGroup>>(`/support-groups/${groupId}/members/${userId}`);
    return response.data.data;
};

// Support Ticket Management
export const getAllSupportTickets = async (): Promise<SupportTicket[]> => {
    const response = await api.get<ApiResponse<SupportTicket[]>>('/support');
    return response.data.data;
};

export const updateSupportTicket = async (id: string, ticketData: Partial<SupportTicket>): Promise<SupportTicket> => {
    const response = await api.put<ApiResponse<SupportTicket>>(`/support/${id}`, ticketData);
    return response.data.data;
};

export const deleteSupportTicket = async (id: string): Promise<void> => {
    await api.delete(`/support/${id}`);
};

export const escalateSupportTicket = async (id: string): Promise<SupportTicket> => {
    const response = await api.post<ApiResponse<SupportTicket>>(`/support/${id}/escalate`);
    return response.data.data;
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
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  removeTeamMember,
  getAllSupportGroups,
  createSupportGroup,
  updateSupportGroup,
  deleteSupportGroup,
  addSupportGroupMember,
  removeSupportGroupMember,
  getAllSupportTickets,
  updateSupportTicket,
  deleteSupportTicket,
  escalateSupportTicket,
};

export default superuserService;
