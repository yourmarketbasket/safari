"use client";

import { NextPage } from "next";

const UsersPage: NextPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p className="mb-4">This page will be used to list, view, and manage users. It will include summary cards, search and filter options, and actions to block, suspend, or approve users.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-3xl">1,234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Active Users</h2>
          <p className="text-3xl">1,100</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Suspended Users</h2>
          <p className="text-3xl">50</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Users List</h2>
        <p>A table of users will be displayed here with options for management.</p>
      </div>
    </div>
  );
};

export default UsersPage;
