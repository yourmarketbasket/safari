"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { User } from "@/app/models/User.model";

// Dummy data for users
const dummyUsers: User[] = [
  { _id: "60d0fe4f5311236168a10b01", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", role: "passenger", rank: "Ordinary", approvedStatus: "approved", permissions: [], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b02", name: "Jane Smith", email: "jane.smith@example.com", phone: "123-456-7891", role: "driver", rank: "Staff", approvedStatus: "approved", permissions: ["view_manifest"], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b03", name: "Admin User", email: "admin@example.com", phone: "123-456-7892", role: "admin", rank: "Manager", approvedStatus: "approved", permissions: ["manage_users", "set_fares"], verified: { email: true, phone: true }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b04", name: "Suspended Driver", email: "suspend@example.com", phone: "123-456-7893", role: "driver", rank: "Staff", approvedStatus: "suspended", permissions: [], verified: { email: true, phone: false }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b05", name: "Blocked User", email: "blocked@example.com", phone: "123-456-7894", role: "passenger", rank: "Ordinary", approvedStatus: "blocked", permissions: [], verified: { email: false, phone: false }, createdAt: new Date() },
  { _id: "60d0fe4f5311236168a10b06", name: "Pending Passenger", email: "pending@example.com", phone: "123-456-7895", role: "passenger", rank: "Ordinary", approvedStatus: "pending", permissions: [], verified: { email: false, phone: false }, createdAt: new Date() },
];

// Column definitions for the user table
const columns: ColumnDef<User>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
  {
    header: "Status",
    accessorKey: "approvedStatus",
    cell: (row) => {
      const status = row.approvedStatus;
      const type =
        status === "approved" ? "success" :
        status === "suspended" ? "warning" :
        status === "pending" ? "info" :
        "error";
      return <Chip text={status} type={type} />;
    },
  },
  { header: "Rank", accessorKey: "rank" },
  {
      header: "Actions",
      accessorKey: "_id",
      cell: () => (
          <div className="flex gap-2">
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">View</button>
              <button className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Suspend</button>
              <button className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Block</button>
          </div>
      )
  }
];

const UsersPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("User Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-500">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Users</h2>
          <p className="text-4xl font-bold text-green-500">1,100</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Suspended Users</h2>
          <p className="text-4xl font-bold text-yellow-500">50</p>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Users List</h2>
        <DataTable data={dummyUsers} columns={columns} filterColumn="approvedStatus" />
      </div>
    </div>
  );
};

export default UsersPage;
