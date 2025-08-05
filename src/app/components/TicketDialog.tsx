"use client";

interface Ticket {
  id: string;
  route: string;
  date: string;
  status: string;
}

interface TicketDialogProps {
  ticket: Ticket | null;
  onClose: () => void;
}

export default function TicketDialog({ ticket, onClose }: TicketDialogProps) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Ticket Details</h2>
        <div className="space-y-3">
          <p><strong>ID:</strong> {ticket.id}</p>
          <p><strong>Route:</strong> {ticket.route}</p>
          <p><strong>Date:</strong> {ticket.date}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${ticket.status === 'upcoming' ? 'text-green-600' : 'text-gray-600'}`}>{ticket.status}</span></p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
