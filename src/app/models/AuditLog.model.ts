export type AuditLogAction =
  // Auth Actions
  | 'login' | 'signup' | 'superuser_registered'
  // Superuser Actions
  | 'staff_created' | 'staff_updated' | 'staff_deleted' | 'fare_policy_set' | 'system_fee_set' | 'loyalty_policy_set'
  // Sacco Actions
  | 'sacco_created' | 'sacco_approved' | 'sacco_rejected' | 'sacco_updated'
  // Route Actions
  | 'route_created' | 'route_updated' | 'route_finalized' | 'fare_adjusted'
  // Vehicle Actions
  | 'vehicle_created' | 'vehicle_updated' | 'vehicle_deleted'
  // Discount Actions
  | 'discount_created' | 'discount_applied' | 'discount_deleted'
  // Trip Actions
  | 'trip_registered' | 'trip_canceled' | 'trip_completed';

export interface AuditLog {
  _id: string;
  userId: string; // Corresponds to ObjectId, represented as string
  action: AuditLogAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: Record<string, any>; // Corresponds to Mixed type
  timestamp: Date;
}
