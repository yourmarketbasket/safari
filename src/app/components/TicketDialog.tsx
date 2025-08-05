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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
        <p><strong>ID:</strong> {ticket.id}</p>
        <p><strong>Route:</strong> {ticket.route}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
