"use client";

import { NextPage } from "next";

const IncomePage: NextPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Income Reports</h1>
      <p className="mb-4">This page will be used to view income reports and analytics.</p>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Income Analytics</h2>
        <p>Charts and data visualizations for income will be displayed here.</p>
      </div>
    </div>
  );
};

export default IncomePage;
