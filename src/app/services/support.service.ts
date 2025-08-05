import api from '../lib/api';
import { Sacco } from '../models/Sacco.model';
import { Dispute } from '../models/Dispute.model';

export type NewSaccoData = Omit<Sacco, 'id' | 'status' | 'createdBy' | 'createdAt'>;

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
}

// SaccoService functions (performed by Support Staff)
export const getSaccos = async (): Promise<Sacco[]> => {
  const response = await api.get<Sacco[]>('/saccos', getAuthHeader());
  return response.data;
};

export const addSacco = async (saccoData: NewSaccoData): Promise<Sacco> => {
  const response = await api.post<Sacco>('/saccos', saccoData, getAuthHeader());
  return response.data;
};

export const approveSacco = async (saccoId: string): Promise<Sacco> => {
  const response = await api.post<Sacco>(`/saccos/${saccoId}/approve`, {}, getAuthHeader());
  return response.data;
};

// SupportService functions
export const getInquiries = async (): Promise<Dispute[]> => {
    const response = await api.get<Dispute[]>('/support/inquiries', getAuthHeader());
    return response.data;
};

export const resolveInquiry = async (inquiryId: string, resolution: string): Promise<Dispute> => {
    const response = await api.post<Dispute>(`/support/inquiries/${inquiryId}/resolve`, { resolution }, getAuthHeader());
    return response.data;
};

export const getSystemAlerts = async (): Promise<Record<string, unknown>[]> => {
    const response = await api.get<Record<string, unknown>[]>('/support/alerts', getAuthHeader());
    return response.data;
};


const supportService = {
  getSaccos,
  addSacco,
  approveSacco,
  getInquiries,
  resolveInquiry,
  getSystemAlerts,
};

export default supportService;
