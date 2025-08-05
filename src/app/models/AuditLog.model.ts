export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: Record<string, unknown>;
  timestamp: Date;
}
