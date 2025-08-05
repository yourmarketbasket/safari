import { VehicleClass } from "./Vehicle.model";

export type TicketStatus = "registered" | "paid" | "boarded" | "canceled";

export interface Ticket {
  id: string;
  passengerId: string;
  tripId: string;
  routeId: string;
  class: VehicleClass;
  registrationTimestamp: Date;
  qrCode: string;
  status: TicketStatus;
  paymentId: string;
  systemFee: number;
  discountId?: string;
}
