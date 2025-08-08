export type UserRole =
  | "passenger"
  | "sacco"
  | "owner"
  | "queue_manager"
  | "driver"
  | "support_staff"
  | "admin"
  | "superuser"
  | "headoffice";

export type UserRank =
  | "CEO"
  | "CFO"
  | "COO"
  | "CTO"
  | "VP"
  | "Director"
  | "Manager"
  | "Supervisor"
  | "Team Lead"
  | "Staff"
  | "Intern";

export type UserStatus = "pending" | "approved" | "rejected" | "active" | "inactive" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  password?: string; // Password should typically not be exposed on the frontend
  role: UserRole;
  mfaSecret?: string; // Optional, for Superuser/support staff
  rank?: UserRank;
  approvedStatus?: UserStatus;
  permissions?: string[];
  verified?: {
    email: boolean;
    phone: boolean;
  };
}
