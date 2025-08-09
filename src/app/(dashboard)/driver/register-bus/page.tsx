"use client";
import React from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';

const RegisterBusPage = () => {
  const { setTitle } = usePageTitleStore();
  React.useEffect(() => {
    setTitle('Register Bus for Trips');
  }, [setTitle]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Register Bus for Trips</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="busCondition" className="block text-gray-700 font-bold mb-2">
              Bus Condition
            </label>
            <select
              id="busCondition"
              name="busCondition"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              GPS Status
            </label>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Not Synced</span>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sync GPS
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterBusPage;
