import { UserRole } from './User.model';

export interface Permission {
  _id: string;
  permissionNumber: string;
  description: string;
  roles: UserRole[];
  modulePage?: string;
  httpMethod?: string;
  constraints?: string;
}
