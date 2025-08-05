import api from '../lib/api';
import { Trip } from '../models/Trip.model';
import { Payroll } from '../models/Payroll.model';
import { Vehicle } from '../models/Vehicle.model';

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
}

// Trip Management
export const getTripsByOwner = async (ownerId: string): Promise<Trip[]> => {
  const response = await api.get<Trip[]>(`/owners/${ownerId}/trips`, getAuthHeader());
  return response.data;
};

// Income/Payroll
export const getPayrollByOwner = async (ownerId: string): Promise<Payroll[]> => {
    const response = await api.get<Payroll[]>(`/owners/${ownerId}/payroll`, getAuthHeader());
    return response.data;
};

// Vehicle Management
export const getVehiclesByOwner = async (ownerId: string): Promise<Vehicle[]> => {
    const response = await api.get<Vehicle[]>(`/owners/${ownerId}/vehicles`, getAuthHeader());
    return response.data;
};

const ownerService = {
  getTripsByOwner,
  getPayrollByOwner,
  getVehiclesByOwner,
};

export default ownerService;
