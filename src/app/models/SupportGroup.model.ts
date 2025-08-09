import { User } from './User.model';

export interface SupportGroup {
  _id: string;
  name: string;
  supervisor: User;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}
