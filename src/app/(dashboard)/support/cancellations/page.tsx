"use client";

import { useState, useMemo, useEffect } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';
import { DataTable, ColumnDef } from '@/app/components/DataTable';
import { Chip } from '@/app/components/Chip';
import Modal from '@/app/components/Modal';
import { Button } from '@/app/components/ui/Button';

interface Cancellation {
    _id: string;
    tripId: string;
    reason: string;
    status: 'pending' | 'completed' | 'failed';
    timestamp: Date;
}

const mockCancellations: Cancellation[] = [
    { _id: 'can-1', tripId: 'trip-123', reason: 'Bus breakdown', status: 'completed', timestamp: new Date() },
    { _id: 'can-2', tripId: 'trip-456', reason: 'Driver unavailable', status: 'pending', timestamp: new Date() },
    { _id: 'can-3', tripId: 'trip-789', reason: 'Weather conditions', status: 'failed', timestamp: new Date() },
];

const CancellationsPage = () => {
    const { setTitle } = usePageTitleStore();
    useEffect(() => {
        setTitle("Cancellations & Reallocations");
    }, [setTitle]);

    const [cancellations, setCancellations] = useState(mockCancellations);
    const [selectedCancellation, setSelectedCancellation] = useState<Cancellation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (cancellation: Cancellation) => {
        setSelectedCancellation(cancellation);
        setIsModalOpen(true);
    };

    const columns: ColumnDef<Cancellation>[] = useMemo(() => [
        { header: 'Trip ID', accessorKey: 'tripId' },
        { header: 'Reason', accessorKey: 'reason' },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row: Cancellation) => (
                <Chip
                    text={row.status}
                    type={
                        row.status === 'pending' ? 'warning' :
                        row.status === 'completed' ? 'success' :
                        'error'
                    }
                />
            )
        },
        { header: 'Timestamp', accessorKey: 'timestamp', cell: (row: Cancellation) => new Date(row.timestamp).toLocaleString() },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: (row: Cancellation) => (
                <Button
                    onClick={() => handleViewDetails(row)}
                    size="sm"
                >
                    View Details
                </Button>
            )
        }
    ], []);

    return (
        <PrivateRoute allowedRoles={['support_staff']}>
            <div className="container mx-auto px-6 py-8">
                <DataTable columns={columns} data={cancellations} filterColumn="status" />

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {selectedCancellation && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800">Cancellation Details</h2>
                            <p className="mt-2 text-sm text-gray-500">Trip ID: {selectedCancellation.tripId}</p>
                            <div className="mt-4">
                                <h3 className="font-semibold">Reason for Cancellation</h3>
                                <p>{selectedCancellation.reason}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold">Reallocation Status</h3>
                                <p>Reallocation for this trip is {selectedCancellation.status}.</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    variant="secondary"
                                >
                                    Close
                                </Button>
                                <Button>
                                    Authorize Refund
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </PrivateRoute>
    );
};

export default CancellationsPage;
