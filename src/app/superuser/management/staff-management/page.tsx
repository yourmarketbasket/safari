"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Staff data
type Staff = {
  id: number;
  name: string;
  role: "Support Lead" | "Support Agent" | "Technical Support";
  status: "Active" | "On Leave";
  performance: "Excellent" | "Good" | "Needs Improvement";
};

// Dummy data for staff
const dummyStaff: Staff[] = [
  { id: 1, name: "Manager Mike", role: "Support Lead", status: "Active", performance: "Excellent" },
  { id: 2, name: "Agent Alice", role: "Support Agent", status: "Active", performance: "Good" },
  { id: 3, name: "Tech Tom", role: "Technical Support", status: "On Leave", performance: "Excellent" },
  { id: 4, name: "Agent Bob", role: "Support Agent", status: "Active", performance: "Needs Improvement" },
];

// Column definitions for the staff table
const columns: ColumnDef<Staff>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Role", accessorKey: "role" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const statusColor = status === "Active" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800";
      return <span className={`px-2 py-1 rounded-full font-semibold text-xs ${statusColor}`}>{status}</span>;
    },
  },
  {
    header: "Performance",
    accessorKey: "performance",
     cell: (performance) => {
      const perfColor =
        performance === "Excellent" ? "bg-blue-200 text-blue-800" :
        performance === "Good" ? "bg-green-200 text-green-800" :
        "bg-yellow-200 text-yellow-800";
      return <span className={`px-2 py-1 rounded-full font-semibold text-xs ${perfColor}`}>{performance}</span>;
    },
  },
  {
      header: "Actions",
      accessorKey: "id",
      cell: () => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Manage</button>
  }
];

const StaffManagementPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Staff Management</h1>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Staff Member</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Add Staff</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Support Staff</h2>
        <DataTable data={dummyStaff} columns={columns} filterColumn="role" />
      </div>
    </div>
  );
};

export default StaffManagementPage;
