"use client";

import { useState, useMemo, useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';
import { DataTable, ColumnDef } from '@/app/components/DataTable';
import Modal from '@/app/components/Modal';
import { Chip } from '@/app/components/Chip';

interface Inquiry {
    _id: string;
    passengerName: string;
    subject: string;
    status: 'open' | 'in-progress' | 'resolved' | 'escalated';
    lastUpdate: Date;
}

const mockInquiries: Inquiry[] = [
    { _id: 'inq-1', passengerName: 'John Doe', subject: 'Payment Failure', status: 'open', lastUpdate: new Date() },
    { _id: 'inq-2', passengerName: 'Jane Smith', subject: 'Reallocation Dispute', status: 'in-progress', lastUpdate: new Date() },
    { _id: 'inq-3', passengerName: 'Peter Jones', subject: 'Missed Boarding', status: 'resolved', lastUpdate: new Date() },
    { _id: 'inq-4', passengerName: 'Mary Brown', subject: 'Refund Request', status: 'escalated', lastUpdate: new Date() },
];

const InquiriesPage = () => {
    const { setTitle } = usePageTitleStore();
    useEffect(() => {
        setTitle("Passenger Inquiries");
    }, [setTitle]);

    const [inquiries, setInquiries] = useState(mockInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewInquiry = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
    };

    const columns: ColumnDef<Inquiry>[] = useMemo(() => [
        { header: 'Passenger Name', accessorKey: 'passengerName' },
        { header: 'Subject', accessorKey: 'subject' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row: Inquiry) => (
                <Chip
                    text={row.status}
                    type={
                        row.status === 'open' ? 'error' :
                        row.status === 'in-progress' ? 'warning' :
                        row.status === 'resolved' ? 'success' :
                        'default'
                    }
                />
            )
        },
        { header: 'Last Update', accessorKey: 'lastUpdate', cell: (row: Inquiry) => new Date(row.lastUpdate).toLocaleString() },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: (row: Inquiry) => (
                <button
                    onClick={() => handleViewInquiry(row)}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    View
                </button>
            )
        }
    ], []);

    return (
        <PrivateRoute allowedRoles={['support_staff']}>
            <div className="container mx-auto px-6 py-8">
                <DataTable columns={columns} data={inquiries} filterColumn="status" />

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {selectedInquiry && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800">{selectedInquiry.subject}</h2>
                            <p className="mt-2 text-sm text-gray-500">From: {selectedInquiry.passengerName}</p>
                            <div className="mt-4">
                                <h3 className="font-semibold">Conversation History</h3>
                                <div className="mt-2 p-4 h-48 bg-gray-100 rounded-lg overflow-y-auto">
                                    <p className="text-sm">[Passenger] My payment failed but my card was charged.</p>
                                    <p className="text-sm text-right">[Support] Let me check that for you.</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <textarea
                                    placeholder="Type your response..."
                                    className="w-full p-2 border rounded-lg"
                                    rows={4}
                                ></textarea>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Close
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                                    Send Response
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </PrivateRoute>
    );
};

export default InquiriesPage;
