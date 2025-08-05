import api from '../lib/api';
import { Ticket } from '../models/Ticket.model';
import { Loyalty } from '../models/Loyalty.model';

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${token}` } };
}

// Ticket Management
export const getMyTickets = async (passengerId: string): Promise<Ticket[]> => {
  const response = await api.get<Ticket[]>(`/passengers/${passengerId}/tickets`, getAuthHeader());
  return response.data;
};

// Loyalty
export const getMyLoyalty = async (passengerId: string): Promise<Loyalty> => {
    const response = await api.get<Loyalty>(`/passengers/${passengerId}/loyalty`, getAuthHeader());
    return response.data;
};

const passengerService = {
  getMyTickets,
  getMyLoyalty,
};

export default passengerService;
