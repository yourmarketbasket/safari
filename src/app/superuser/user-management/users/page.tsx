"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Type for User data
type User = {
  id: number;
  name: string;
  email: string;
  role: "Passenger" | "Driver" | "Admin" | "Support";
  status: "Active" | "Suspended" | "Blocked";
  lastLogin: string;
};

// Dummy data for users
const dummyUsers: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Passenger", status: "Active", lastLogin: "2023-10-27" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Driver", status: "Active", lastLogin: "2023-10-26" },
  { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active", lastLogin: "2023-10-27" },
  { id: 4, name: "Suspended Driver", email: "suspend@example.com", role: "Driver", status: "Suspended", lastLogin: "2023-09-01" },
  { id: 5, name: "Blocked User", email: "blocked@example.com", role: "Passenger", status: "Blocked", lastLogin: "2023-08-15" },
];

// Column definitions for the user table
const columns: ColumnDef<User>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const type =
        status === "Active" ? "success" :
        status === "Suspended" ? "warning" :
        "error";
      return <Chip text={status} type={type} />;
    },
  },
  { header: "Last Login", accessorKey: "lastLogin" },
  {
      header: "Actions",
      accessorKey: "id",
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
        <DataTable data={dummyUsers} columns={columns} filterColumn="status" />
      </div>
    </div>
  );
};

export default UsersPage;
