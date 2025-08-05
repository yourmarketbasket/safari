import api from '../lib/api';
import { Route } from '../models/Route.model';
import { Vehicle } from '../models/Vehicle.model';
import { Driver } from '../models/Driver.model';

// Types for Sacco service function arguments
export type NewRouteData = Omit<Route, 'id' | 'status' | 'fareAdjustments'>;
export type NewVehicleData = Omit<Vehicle, 'id' | 'saccoId'>;
export type NewDriverData = Omit<Driver, 'id' | 'saccoId' | 'performanceMetrics'>;

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
}

// Route Management
export const getRoutes = async (saccoId: string): Promise<Route[]> => {
  const response = await api.get<Route[]>(`/saccos/${saccoId}/routes`, getAuthHeader());
  return response.data;
};

export const addRoute = async (saccoId: string, routeData: NewRouteData): Promise<Route> => {
  const response = await api.post<Route>(`/saccos/${saccoId}/routes`, routeData, getAuthHeader());
  return response.data;
};

// Vehicle Management
export const getVehicles = async (saccoId: string): Promise<Vehicle[]> => {
    const response = await api.get<Vehicle[]>(`/saccos/${saccoId}/vehicles`, getAuthHeader());
    return response.data;
};

export const addVehicle = async (saccoId: string, vehicleData: NewVehicleData): Promise<Vehicle> => {
    const response = await api.post<Vehicle>(`/saccos/${saccoId}/vehicles`, vehicleData, getAuthHeader());
    return response.data;
};

// Driver Management
export const getDrivers = async (saccoId: string): Promise<Driver[]> => {
    const response = await api.get<Driver[]>(`/saccos/${saccoId}/drivers`, getAuthHeader());
    return response.data;
}

const saccoService = {
  getRoutes,
  addRoute,
  getVehicles,
  addVehicle,
  getDrivers,
};

export default saccoService;
