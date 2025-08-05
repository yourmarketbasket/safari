export type SaccoStatus = "pending" | "approved" | "rejected";

export interface Sacco {
  id: string;
  name: string;
  license: string;
  contact: string;
  ntsaCompliance: boolean;
  status: SaccoStatus;
  createdBy: string; // Support Staff ID
  createdAt: Date;
}
