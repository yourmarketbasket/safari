export type UserRole =
  | "passenger"
  | "sacco"
  | "owner"
  | "queue_manager"
  | "driver"
  | "support_staff"
  | "admin"
  | "superuser";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  password?: string; // Password should typically not be exposed on the frontend
  role: UserRole;
  mfaSecret?: string; // Optional, for Superuser/support staff
}
