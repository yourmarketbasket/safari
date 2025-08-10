"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { SupportTicket } from "@/app/models/SupportTicket.model";
import superuserService from "@/app/services/superuser.service";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import Message from "@/app/components/Message";
import { FiEye, FiTrash2, FiArrowUp } from "react-icons/fi";
import TicketDetailModal from "@/app/components/TicketDetailModal";
import { Chip } from "@/app/components/Chip";
import { Button } from "@/app/components/ui/Button";
import Pagination from "@/app/components/Pagination";

const SupportTicketsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const ticketsData = await superuserService.getAllSupportTickets();
            setTickets(ticketsData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to fetch data.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTitle("Support Ticket Management");
        fetchData();
    }, [setTitle]);

    const handleOpenModal = (ticket: SupportTicket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    const handleTicketUpdate = (updatedTicket: SupportTicket) => {
        setTickets(tickets.map(t => t._id === updatedTicket._id ? updatedTicket : t));
    };

    const handleDeleteTicket = async (ticketId: string) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            try {
                await superuserService.deleteSupportTicket(ticketId);
                setTickets(tickets.filter(t => t._id !== ticketId));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to delete ticket.");
                }
            }
        }
    };

    const handleEscalateTicket = async (ticketId: string) => {
        try {
            const updatedTicket = await superuserService.escalateSupportTicket(ticketId);
            handleTicketUpdate(updatedTicket);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to escalate ticket.");
            }
        }
    };

    const columns: ColumnDef<SupportTicket>[] = [
      { header: "Ticket ID", accessorKey: "ticketId" },
      { header: "Title", accessorKey: "title" },
      { header: "User", accessorKey: "user", cell: (row) => row.user.name },
      { header: "Status", accessorKey: "status", cell: (row) => <Chip text={row.status} type={row.status === 'resolved' || row.status === 'closed' ? 'success' : 'info'} /> },
      { header: "Priority", accessorKey: "priority", cell: (row) => <Chip text={row.priority} type={row.priority === 'high' || row.priority === 'urgent' ? 'error' : 'default'} /> },
      {
          header: "Actions",
          accessorKey: "_id",
          cell: (row) => (
              <div className="flex gap-2">
                  <Button onClick={() => handleOpenModal(row)} size="sm"><FiEye /> View</Button>
                  <Button onClick={() => handleDeleteTicket(row._id)} size="sm" variant="danger"><FiTrash2 /> Delete</Button>
                  {row.status !== 'escalated' && <Button onClick={() => handleEscalateTicket(row._id)} size="sm" variant="secondary"><FiArrowUp /> Escalate</Button>}
              </div>
          )
      }
    ];

    const totalPages = Math.ceil(tickets.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Support Tickets</h2>
        {error && <Message type="error" message={error} />}
        {!isLoading && !error && (
            <>
                <DataTable
                    data={tickets}
                    columns={columns}
                    filterColumn="title"
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </>
        )}
      </div>

      <TicketDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTicketUpdate={handleTicketUpdate}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default SupportTicketsPage;
