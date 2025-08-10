import api from '../lib/api';
import { Ticket } from '../models/Ticket.model';
import { Loyalty } from '../models/Loyalty.model';

// Ticket Management
export const getMyTickets = async (passengerId: string): Promise<Ticket[]> => {
  const response = await api.get<Ticket[]>(`/passengers/${passengerId}/tickets`);
  return response.data;
};

// Loyalty
export const getMyLoyalty = async (passengerId: string): Promise<Loyalty> => {
    const response = await api.get<Loyalty>(`/passengers/${passengerId}/loyalty`);
    return response.data;
};

const passengerService = {
  getMyTickets,
  getMyLoyalty,
};

export default passengerService;
