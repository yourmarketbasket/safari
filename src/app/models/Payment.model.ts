export type PaymentMethod = "mpesa" | "card";
export type PaymentStatus = "pending" | "completed" | "failed";

export interface Payment {
  id: string;
  ticketId: string;
  amount: number;
  systemFee: number;
  method: PaymentMethod;
  status: PaymentStatus;
  timestamp: Date;
}
