export const trip = {
    route: {
      name: 'Route 101',
      origin: 'Central Station',
      destination: 'North Suburbs',
      stops: ['Midtown', 'Uptown', 'Downtown'],
    },
    status: 'On Route',
    passengers: [
      { id: 1, name: 'Alice', status: 'On Board', stop: 'Uptown' },
      { id: 2, name: 'Bob', status: 'On Board', stop: 'North Suburbs' },
      { id: 3, name: 'Charlie', status: 'To be Picked Up', stop: 'Midtown' },
      { id: 4, name: 'David (Reassigned)', status: 'To be Picked Up', stop: 'Uptown' },
    ],
    notifications: [
      { id: 1, type: 'cancellation', message: 'Trip 102 has been cancelled. 5 passengers reassigned to your trip.' },
      { id: 2, type: 'delay', message: 'Heavy traffic on 5th street. Expect a 15-minute delay.' },
    ],
  };

  export const passengersAtStop = [
    { id: 3, name: 'Charlie', status: 'To be Picked Up', stop: 'Midtown' },
    { id: 5, name: 'Eve', status: 'To be Picked Up', stop: 'Midtown' },
  ];

  export const passengersToDisembark = [
      { id: 1, name: 'Alice', status: 'On Board', stop: 'Uptown' },
  ]

  export const tripSummary = {
    tripId: 'TRIP-123',
    route: 'Route 101',
    totalPassengers: 25,
    distance: '50 km',
    duration: '1 hour 30 minutes',
  };

  export const shiftSummary = {
    totalTrips: 3,
    totalEarnings: 'KES 3,500',
    hoursWorked: '8 hours',
  };
