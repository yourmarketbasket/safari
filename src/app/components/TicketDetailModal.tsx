"use client";

import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { SupportTicket, TicketStatus, TicketPriority } from '../models/SupportTicket.model';
import superuserService from '../services/superuser.service';
import Message from './Message';

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketUpdate: (ticket: SupportTicket) => void;
  ticket: SupportTicket | null;
}

const statuses: TicketStatus[] = ['open', 'in_progress', 'resolved', 'closed', 'escalated'];
const priorities: TicketPriority[] = ['low', 'medium', 'high', 'urgent'];

export default function TicketDetailModal({ isOpen, onClose, onTicketUpdate, ticket }: TicketDetailModalProps) {
  const [status, setStatus] = useState<TicketStatus>('open');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [resolutionDetails, setResolutionDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setResolutionDetails(ticket.resolutionDetails || '');
      setError(null);
    }
  }, [isOpen, ticket]);

  if (!isOpen || !ticket) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ticketData = { status, priority, resolutionDetails };
      const updatedTicket = await superuserService.updateSupportTicket(ticket._id, ticketData);
      onTicketUpdate(updatedTicket);
      onClose();
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full text-gray-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <FiX size={20} />
        </button>
        <h2 className="text-2xl font-bold text-purple-700 mb-2">{ticket.title}</h2>
        <p className="text-sm text-gray-500 mb-4">Ticket ID: {ticket.ticketId}</p>

        <div className="max-h-[65vh] overflow-y-auto pr-2 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-semibold text-md mb-2">Ticket Details</h3>
                <p><strong>User:</strong> {ticket.user.name}</p>
                <p><strong>Category:</strong> {ticket.category}</p>
                <p><strong>Description:</strong> {ticket.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-semibold text-md mb-2">Update Ticket</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as TicketStatus)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="resolutionDetails" className="block text-sm font-medium text-gray-700 mb-1">Resolution Details</label>
                    <textarea id="resolutionDetails" value={resolutionDetails} onChange={(e) => setResolutionDetails(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" rows={4}></textarea>
                </div>
            </div>
            {error && <Message type="error" message={error} />}
        </div>

        <div className="flex justify-end pt-4 mt-4 border-t">
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm mr-3" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-bold flex items-center" disabled={isLoading}>
              <FiSave className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </div>
    </div>
  );
}
