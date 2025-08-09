"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PrivateRoute from '@/app/components/PrivateRoute';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import { Chip } from '@/app/components/Chip';

interface TripDetails {
    _id: string;
    route: string;
    departureTime: Date;
    status: 'paid' | 'registered' | 'waitlisted' | 'cancelled';
    queuePosition: number;
    bus: {
        plate: string;
        model: string;
    };
    routeDetails: {
        stops: string[];
        estimatedDuration: string;
    };
    currentLocation: {
        lat: number;
        lng: number;
    };
}

interface MockTripDetails {
    [key: string]: TripDetails;
}

// Mock Trip Data
const mockTripDetails: MockTripDetails = {
  'reg-trip-1': {
    _id: 'reg-trip-1',
    route: 'Nairobi - Mombasa',
    departureTime: new Date('2024-12-01T08:00:00'),
    status: 'paid',
    queuePosition: 5,
    bus: {
      plate: 'KDA 123B',
      model: 'Scania',
    },
    routeDetails: {
      stops: ['Voi', 'Mtito Andei'],
      estimatedDuration: '8 hours',
    },
    currentLocation: {
      lat: -1.286389,
      lng: 36.817223,
    },
  },
  'reg-trip-2': {
    _id: 'reg-trip-2',
    route: 'Nairobi-Kisumu',
    departureTime: new Date('2024-12-01T08:00:00'),
    status: 'paid',
    queuePosition: 5,
    bus: {
      plate: 'KDA 123B',
      model: 'Scania',
    },
    routeDetails: {
      stops: ['Voi', 'Mtito Andei'],
      estimatedDuration: '8 hours',
    },
    currentLocation: {
      lat: -1.286389,
      lng: 36.817223,
    },
  },
  'reg-trip-3': {
    _id: 'reg-trip-3',
    route: 'Nairobi-Nakuru',
    departureTime: new Date('2024-12-01T08:00:00'),
    status: 'paid',
    queuePosition: 5,
    bus: {
      plate: 'KDA 123B',
      model: 'Scania',
    },
    routeDetails: {
      stops: ['Voi', 'Mtito Andei'],
      estimatedDuration: '8 hours',
    },
    currentLocation: {
      lat: -1.286389,
      lng: 36.817223,
    },
  },
};

const TripDetailsPage = () => {
  const { setTitle } = usePageTitleStore();
  const params = useParams();
  const tripId = params.id as string;
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [busLocation, setBusLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    setTitle("Trip Details");
    const tripData = mockTripDetails[tripId];
    if (tripData) {
      setTrip(tripData);
      setBusLocation(tripData.currentLocation);
    }
  }, [setTitle, tripId]);

  useEffect(() => {
    // Simulate real-time bus location updates
    const interval = setInterval(() => {
      setBusLocation((prevLocation) => {
        if (!prevLocation) return null;
        return {
          lat: prevLocation.lat + 0.001,
          lng: prevLocation.lng + 0.001,
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!trip) {
    return (
      <PrivateRoute allowedRoles={['passenger']}>
        <div className="container mx-auto px-6 py-8">
          <p>Loading trip details...</p>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute allowedRoles={['passenger']}>
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{trip.route}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Departure: {new Date(trip.departureTime).toLocaleString()}
              </p>
            </div>
            <Chip
              text={trip.status}
              type={trip.status === 'paid' ? 'success' : 'info'}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Placeholder */}
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map Placeholder</p>
              {busLocation && (
                <div className="absolute text-sm p-2 bg-white rounded shadow">
                  Bus Location: {busLocation.lat.toFixed(4)}, {busLocation.lng.toFixed(4)}
                </div>
              )}
            </div>

            {/* Trip Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Trip Information</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li><strong>Queue Position:</strong> {trip.queuePosition}</li>
                  <li><strong>Bus Plate:</strong> {trip.bus.plate}</li>
                  <li><strong>Bus Model:</strong> {trip.bus.model}</li>
                  <li><strong>Estimated Duration:</strong> {trip.routeDetails.estimatedDuration}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Stops</h3>
                <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside">
                  {trip.routeDetails.stops.map((stop: string) => (
                    <li key={stop}>{stop}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default TripDetailsPage;
