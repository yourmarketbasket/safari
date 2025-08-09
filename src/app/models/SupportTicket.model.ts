import { User } from './User.model';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'technical_issue' | 'billing_inquiry' | 'general_inquiry' | 'feedback' | 'complaint';

export interface SupportTicket {
  _id: string;
  ticketId: string;
  user: User;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: User;
  resolutionDetails?: string;
  createdAt: Date;
  updatedAt: Date;
}
