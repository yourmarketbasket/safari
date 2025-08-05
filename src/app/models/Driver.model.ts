export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  ntsaCompliance: boolean;
  saccoId: string;
  vehicleId: string;
  performanceMetrics: Record<string, unknown>;
}
