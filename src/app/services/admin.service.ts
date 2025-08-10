import api from '../lib/api';
import { Dispute } from '../models/Dispute.model';

// This service handles Admin-specific duties like escalations and reports.

/**
 * Fetches the queue of escalated issues.
 */
export const getEscalatedIssues = async (): Promise<Dispute[]> => {
  const response = await api.get<Dispute[]>('/admin/escalations');
  return response.data;
};

/**
 * Fetches data for system reports.
 * @param reportType - The type of report to generate (e.g., 'revenue', 'trips').
 * @param params - Date ranges or other filters.
 */
export const getSystemReport = async (reportType: string, params: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const response = await api.get<Record<string, unknown>>(`/admin/reports/${reportType}`, { params });
  return response.data;
};


const adminService = {
  getEscalatedIssues,
  getSystemReport,
};

export default adminService;
