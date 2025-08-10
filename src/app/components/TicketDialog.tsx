"use client";

import { Chip } from './Chip';
import { Button } from './ui/Button';

import { Ticket } from "@/app/models/Ticket.model";

interface TicketDialogProps {
  ticket: Ticket | null;
  onClose: () => void;
}

export default function TicketDialog({ ticket, onClose }: TicketDialogProps) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Ticket Details</h2>
        <div className="space-y-3">
          <p><strong>Ticket ID:</strong> {ticket.ticketId || ticket._id}</p>
          <p><strong>Trip ID:</strong> {ticket.tripId}</p>
          <p><strong>Registration Date:</strong> {new Date(ticket.registrationTimestamp).toLocaleString()}</p>
          <p><strong>Class:</strong> {ticket.class}</p>
          <div className="flex items-center">
            <strong className="mr-2">Status:</strong>
            <Chip
              text={ticket.status}
              type={
                ticket.status === 'boarded' ? 'success' :
                ticket.status === 'canceled' ? 'error' :
                ticket.status === 'paid' || ticket.status === 'registered' ? 'info' :
                'default'
              }
            />
          </div>
        </div>
        <Button
          onClick={onClose}
          className="mt-6"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
