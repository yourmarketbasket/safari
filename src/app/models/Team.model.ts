import { User } from './User.model';

export interface Team {
  _id: string;
  name: string;
  teamLead: User;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}
