export type UserRole = 'passenger' | 'sacco' | 'owner' | 'queue_manager' | 'driver' | 'support_staff' | 'admin' | 'superuser' | 'ordinary';

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
  address?: string;
  dob?: string;
  gender?: string;
  deviceDetails?: string;

  // Driver fields
  idNumber?: string;
  idFrontPhotoUrl?: string;
  idBackPhotoUrl?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  licenseIssueDate?: string;
  licenseClass?: string;
  endorsements?: string;
  drivingLicenseUrl?: string;

  // Passenger fields
  profilePhotoUrl?: string;

  // SACCO fields
  registrationCertificateUrl?: string;
  formalIntentRequestUrl?: string;
  byLawsUrl?: string;
  leadershipInfoUrl?: string;
  proofOfPaymentUrl?: string;
  saccoRegistrationNumber?: string;

  // Queue Manager fields
  nationalIdUrl?: string;
  medicalCertificateUrl?: string;

  // Owner fields
  kraPinCertificateUrl?: string;
  certificateOfIncorporationUrl?: string;
  saccoAffiliation?: string;
}
