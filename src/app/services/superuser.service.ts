import api from '../lib/api';
import { User } from '../models/User.model';

// Use Omit to create a type for new staff data, as id will be assigned by the server.
export type NewStaffData = Omit<User, 'id'>;

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
}

/**
 * Fetches all support staff.
 * The response will be automatically decrypted by the api instance.
 */
export const getSupportStaff = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/superuser/support-staff', getAuthHeader());
  return response.data;
};

/**
 * Adds a new support staff member.
 * The request body will be automatically encrypted.
 * @param staffData - Contains name, email, phone, role, etc.
 */
export const addSupportStaff = async (staffData: NewStaffData): Promise<User> => {
  const response = await api.post<User>('/superuser/support-staff', staffData, getAuthHeader());
  return response.data;
};

/**
 * Fetches system-wide metrics.
 * The shape of metrics is not defined, so we use Record<string, unknown>
 */
export const getSystemMetrics = async (): Promise<Record<string, unknown>> => {
  const response = await api.get<Record<string, unknown>>('/superuser/metrics', getAuthHeader());
  return response.data;
};

/**
 * Updates system policies.
 * The shape of policies is not defined, so we use Record<string, unknown>
 * @param policies - An object containing fare, fee, and loyalty policies.
 */
export const updatePolicies = async (policies: Record<string, unknown>): Promise<void> => {
  await api.post('/superuser/policies', policies, getAuthHeader());
};


const superuserService = {
  getSupportStaff,
  addSupportStaff,
  getSystemMetrics,
  updatePolicies,
};

export default superuserService;
