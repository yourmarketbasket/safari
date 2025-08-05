export interface Reallocation {
  id: string;
  ticketId: string;
  originalTripId: string;
  newTripId: string;
  reason: string;
  timestamp: Date;
}
