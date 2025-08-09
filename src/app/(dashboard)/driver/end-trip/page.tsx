"use client";
import React from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

import { tripSummary } from '@/app/data/dummy';

const EndTripPage = () => {
  const { setTitle } = usePageTitleStore();
  React.useEffect(() => {
    setTitle('End of Trip');
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">End of Trip Summary</h2>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-bold">Trip ID:</p>
            <p>{tripSummary.tripId}</p>
          </div>
          <div>
            <p className="font-bold">Route:</p>
            <p>{tripSummary.route}</p>
          </div>
          <div>
            <p className="font-bold">Total Passengers:</p>
            <p>{tripSummary.totalPassengers}</p>
          </div>
          <div>
            <p className="font-bold">Distance:</p>
            <p>{tripSummary.distance}</p>
          </div>
          <div>
            <p className="font-bold">Duration:</p>
            <p>{tripSummary.duration}</p>
          </div>
        </div>

        {/* Notes Form */}
        <form>
          <div className="mb-4">
            <label htmlFor="tripNotes" className="block text-gray-700 font-bold mb-2">
              Trip Notes
            </label>
            <textarea
              id="tripNotes"
              name="tripNotes"
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Add any notes about the trip..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Trip Summary
          </button>
        </form>
      </div>
    </div>
  );
};

export default EndTripPage;
