export type PayrollStatus = "pending" | "completed" | "disputed";

export interface Payroll {
  id: string;
  tripId: string;
  ownerId: string;
  driverId: string;
  saccoId: string;
  totalRevenue: number;
  systemFee: number;
  saccoFee: number;
  driverCut: number;
  ownerCut: number;
  status: PayrollStatus;
  timestamp: Date;
}
