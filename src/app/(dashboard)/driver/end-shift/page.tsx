"use client";
import React from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

import { shiftSummary } from '@/app/data/dummy';

const EndShiftPage = () => {
  const { setTitle } = usePageTitleStore();
  React.useEffect(() => {
    setTitle('End of Shift');
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">End of Shift Report</h2>

        {/* Shift Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-bold">Total Trips:</p>
            <p>{shiftSummary.totalTrips}</p>
          </div>
          <div>
            <p className="font-bold">Total Earnings:</p>
            <p>{shiftSummary.totalEarnings}</p>
          </div>
          <div>
            <p className="font-bold">Hours Worked:</p>
            <p>{shiftSummary.hoursWorked}</p>
          </div>
        </div>

        {/* Final Report Form */}
        <form>
          <div className="mb-4">
            <label htmlFor="shiftIssues" className="block text-gray-700 font-bold mb-2">
              Issues or Incidents
            </label>
            <textarea
              id="shiftIssues"
              name="shiftIssues"
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Report any issues or incidents during the shift..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            End Shift and Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default EndShiftPage;
