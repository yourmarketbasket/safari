export type UserRole = 'passenger' | 'sacco' | 'owner' | 'queue_manager' | 'driver' | 'support_staff' | 'admin' | 'superuser';

export type UserRank =
  | 'CEO'
  | 'CFO'
  | 'COO'
  | 'CTO'
  | 'VP'
  | 'Director'
  | 'Manager'
  | 'Supervisor'
  | 'Team Lead'
  | 'Staff'
  | 'Intern'
  | 'Ordinary';

export type ApprovedStatus = 'pending' | 'approved' | 'suspended' | 'blocked';

export interface User {
  _id: string; // Using _id as the primary identifier
  name: string;
  email: string;
  phone: string;
  password?: string; // Password should be optional on the frontend
  role: UserRole;
  rank: UserRank;
  avatar?: string;
  approvedStatus: ApprovedStatus;
  permissions: string[];
  verified: {
    email: boolean;
    phone: boolean;
  };
  mfaSecret?: string;
  passwordResetToken?: string;
  passwordResetExpire?: Date;
  createdAt: Date;
}
