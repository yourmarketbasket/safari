export type DisputeStatus = "open" | "escalated" | "resolved";

export interface Dispute {
  id: string;
  ticketId?: string;
  payrollId?: string;
  description: string;
  status: DisputeStatus;
}
