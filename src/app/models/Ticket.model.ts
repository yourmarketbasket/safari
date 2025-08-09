import { VehicleClass } from './Vehicle.model';

export type TicketStatus = 'registered' | 'paid' | 'boarded' | 'canceled';

export interface Ticket {
  _id: string;
  passengerId: string; // Corresponds to ObjectId, represented as string
  tripId: string; // Corresponds to ObjectId, represented as string
  routeId: string; // Corresponds to ObjectId, represented as string
  class: VehicleClass;
  registrationTimestamp: Date;
  qrCode?: string;
  ticketId?: string; // Short code for USSD
  status: TicketStatus;
  paymentId?: string; // Corresponds to ObjectId, represented as string
  systemFee: number;
  discountId?: string; // Corresponds to ObjectId, represented as string
}
