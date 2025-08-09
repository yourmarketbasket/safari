"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import PrivateRoute from '@/app/components/PrivateRoute';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import { DataTable, ColumnDef } from '@/app/components/DataTable';
import Modal from '@/app/components/Modal';
import { Chip } from '@/app/components/Chip';
import Link from 'next/link';

interface Trip {
    _id: string;
    route: string;
    departureTime: Date;
    stops: string[];
    availableSeats: number;
    cost: number;
}

interface RegisteredTrip extends Trip {
    status: 'paid' | 'registered' | 'waitlisted';
    queuePosition: number;
}

// Mock Data for All Trips
const mockTrips: Trip[] = [
  {
    _id: 'trip-1',
    route: 'Nairobi - Mombasa',
    departureTime: new Date('2024-12-01T08:00:00'),
    stops: ['Voi', 'Mtito Andei'],
    availableSeats: 15,
    cost: 1200,
  },
  {
    _id: 'trip-2',
    route: 'Nairobi - Nakuru',
    departureTime: new Date('2024-12-01T09:30:00'),
    stops: ['Naivasha'],
    availableSeats: 5,
    cost: 800,
  },
  {
    _id: 'trip-3',
    route: 'Kisumu - Nairobi',
    departureTime: new Date('2024-12-01T10:00:00'),
    stops: ['Kericho', 'Nakuru'],
    availableSeats: 20,
    cost: 1500,
  },
  {
    _id: 'trip-4',
    route: 'Eldoret - Nairobi',
    departureTime: new Date('2024-12-02T07:00:00'),
    stops: ['Nakuru'],
    availableSeats: 0,
    cost: 1000,
  },
];


// Mock Data for Registered Trips
const initialMockRegisteredTrips: RegisteredTrip[] = [
  {
    _id: 'reg-trip-1',
    route: 'Nairobi - Mombasa',
    departureTime: new Date('2024-12-01T08:00:00'),
    status: 'paid',
    queuePosition: 5,
    cost: 1200,
    stops: [],
    availableSeats: 0,
  },
  {
    _id: 'reg-trip-2',
    route: 'Kisumu - Nairobi',
    departureTime: new Date('2024-12-05T10:00:00'),
    status: 'registered',
    queuePosition: 12,
    cost: 1500,
    stops: [],
    availableSeats: 0,
  },
  {
    _id: 'reg-trip-3',
    route: 'Nairobi - Nakuru',
    departureTime: new Date('2024-12-10T09:30:00'),
    status: 'waitlisted',
    queuePosition: 3,
    cost: 800,
    stops: [],
    availableSeats: 0,
  },
];

const MyTripsPage = () => {
  const { setTitle } = usePageTitleStore();
  useEffect(() => {
    setTitle("Trips");
  }, [setTitle]);

  const [registeredTrips, setRegisteredTrips] = useState<RegisteredTrip[]>(initialMockRegisteredTrips);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(mockTrips);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | RegisteredTrip | null>(null);

  const handleSearch = (searchTerm: string) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = mockTrips.filter(trip =>
      trip.route.toLowerCase().includes(lowercasedSearchTerm) ||
      trip.stops.some(stop => stop.toLowerCase().includes(lowercasedSearchTerm))
    );
    setFilteredTrips(results);
  };

  const handleRegister = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsRegisterModalOpen(true);
  };

  const confirmRegistration = () => {
    if (!selectedTrip) return;
    console.log(`Registering for trip: ${selectedTrip.route}`);
    const newRegisteredTrip: RegisteredTrip = {
        ...(selectedTrip as Trip),
        _id: `reg-${selectedTrip._id}`,
        status: 'registered',
        queuePosition: Math.floor(Math.random() * 20) + 1,
    }
    setRegisteredTrips([...registeredTrips, newRegisteredTrip]);
    setIsRegisterModalOpen(false);
    setIsSearchModalOpen(false);
    setSelectedTrip(null);
  };

  const handleCancelTrip = useCallback((trip: RegisteredTrip) => {
    setSelectedTrip(trip);
    setIsCancelModalOpen(true);
  }, []);

  const confirmCancellation = () => {
    if (!selectedTrip) return;
    console.log(`Cancelling trip: ${selectedTrip.route}`);
    setRegisteredTrips(registeredTrips.filter(trip => trip._id !== selectedTrip._id));
    setIsCancelModalOpen(false);
    setSelectedTrip(null);
  };

  const handlePay = useCallback((trip: RegisteredTrip) => {
    setSelectedTrip(trip);
    setIsPaymentModalOpen(true);
  }, []);

  const confirmPayment = () => {
    if (!selectedTrip) return;
    console.log(`Paying for trip: ${selectedTrip.route}`);
    setRegisteredTrips(
      registeredTrips.map(trip =>
        trip._id === selectedTrip._id ? { ...trip, status: 'paid' } : trip
      )
    );
    setIsPaymentModalOpen(false);
    setSelectedTrip(null);
  };

  const myTripsColumns: ColumnDef<RegisteredTrip>[] = useMemo(
    () => [
      { header: 'Route', accessorKey: 'route' },
      {
        header: 'Departure Time',
        accessorKey: 'departureTime',
        cell: (row: RegisteredTrip) => new Date(row.departureTime).toLocaleString(),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (row: RegisteredTrip) => (
          <Chip
            text={row.status}
            type={
              row.status === 'paid' ? 'success' :
              row.status === 'registered' ? 'info' :
              row.status === 'waitlisted' ? 'warning' :
              'default'
            }
          />
        ),
      },
      { header: 'Queue Position', accessorKey: 'queuePosition' },
      {
        header: 'Actions',
        accessorKey: '_id',
        cell: (row: RegisteredTrip) => (
          <div className="flex space-x-2">
            <Link href={`/passenger/trips/${row._id}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                View Details
            </Link>
            {row.status === 'registered' && (
              <button
                onClick={() => handlePay(row)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Pay Now
              </button>
            )}
            <button
              onClick={() => handleCancelTrip(row)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        ),
      },
    ],
    [handlePay, handleCancelTrip]
  );

  const searchColumns: ColumnDef<Trip>[] = useMemo(
    () => [
      { header: 'Route', accessorKey: 'route' },
      {
        header: 'Departure Time',
        accessorKey: 'departureTime',
        cell: (row: Trip) => new Date(row.departureTime).toLocaleString(),
      },
      { header: 'Stops', accessorKey: 'stops', cell: (row: Trip) => row.stops.join(', ') },
      { header: 'Available Seats', accessorKey: 'availableSeats' },
      { header: 'Cost (Ksh)', accessorKey: 'cost' },
      {
        header: 'Actions',
        accessorKey: '_id',
        cell: (row: Trip) => (
          <button
            onClick={() => handleRegister(row)}
            disabled={row.availableSeats === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
          >
            {row.availableSeats === 0 ? 'Waitlist' : 'Register'}
          </button>
        ),
      },
    ],
    []
  );

  return (
    <PrivateRoute allowedRoles={['passenger']}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-end mb-4">
            <button onClick={() => setIsSearchModalOpen(true)} className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                Search for Trips
            </button>
        </div>
        <DataTable columns={myTripsColumns} data={registeredTrips} filterColumn="route" />

        {/* Search Modal */}
        <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} >
            <div className="p-8 bg-white rounded-lg shadow-xl w-[90vw] max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Search for a Trip</h2>
                    <input
                        type="text"
                        placeholder="Search by route or stop..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="p-2 border border-gray-400 rounded-md flex-grow text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-6">
                    <DataTable columns={searchColumns} data={filteredTrips} filterColumn="route" />
                </div>
            </div>
        </Modal>

        {/* Register Modal */}
        <Modal isOpen={isRegisterModalOpen && selectedTrip !== null} onClose={() => setIsRegisterModalOpen(false)}>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Confirm Registration</h2>
              {selectedTrip && (
                <p className="mt-4 text-gray-600">
                    Are you sure you want to register for the trip from{' '}
                    <span className="font-semibold">{selectedTrip.route}</span> departing at{' '}
                    <span className="font-semibold">{new Date(selectedTrip.departureTime).toLocaleString()}</span>?
                </p>
              )}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRegistration}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Confirm
                </button>
              </div>
            </div>
        </Modal>

        {/* Other Modals (Cancel, Pay) */}
        <Modal isOpen={isCancelModalOpen && selectedTrip !== null} onClose={() => setIsCancelModalOpen(false)}>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Confirm Cancellation</h2>
              {selectedTrip && (
                <p className="mt-4 text-gray-600">
                    Are you sure you want to cancel your registration for the trip from{' '}
                    <span className="font-semibold">{selectedTrip.route}</span>?
                </p>
              )}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Keep Registration
                </button>
                <button
                  onClick={confirmCancellation}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
        </Modal>
        <Modal isOpen={isPaymentModalOpen && selectedTrip !== null} onClose={() => setIsPaymentModalOpen(false)}>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Confirm Payment</h2>
              {selectedTrip && (
                <p className="mt-4 text-gray-600">
                    Please confirm payment of{' '}
                    <span className="font-semibold">Ksh {(selectedTrip as RegisteredTrip).cost}</span> for the trip from{' '}
                    <span className="font-semibold">{selectedTrip.route}</span>.
                </p>
              )}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
        </Modal>
      </div>
    </PrivateRoute>
  );
};

export default MyTripsPage;
