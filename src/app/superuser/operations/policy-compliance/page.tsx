"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";

// Type for Policy data
type Policy = {
  id: number;
  name: string;
  category: "Cancellations" | "Data Privacy" | "Driver Conduct";
  version: string;
  status: "Active" | "Draft" | "Archived";
};

// Dummy data for policies
const dummyPolicies: Policy[] = [
  { id: 1, name: "Refund Policy for Trip Cancellations", category: "Cancellations", version: "v2.1", status: "Active" },
  { id: 2, name: "GDPR Data Handling", category: "Data Privacy", version: "v1.5", status: "Active" },
  { id: 3, name: "Driver Code of Conduct", category: "Driver Conduct", version: "v3.0", status: "Draft" },
  { id: 4, name: "Reallocation Procedure", category: "Cancellations", version: "v1.0", status: "Archived" },
];

// Column definitions for the policy table
const columns: ColumnDef<Policy>[] = [
  { header: "Policy Name", accessorKey: "name" },
  { header: "Category", accessorKey: "category" },
  { header: "Version", accessorKey: "version" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const statusColor =
        status === "Active" ? "bg-green-200 text-green-800" :
        status === "Draft" ? "bg-yellow-200 text-yellow-800" :
        "bg-gray-200 text-gray-800";
      return <span className={`px-2 py-1 rounded-full font-semibold text-xs ${statusColor}`}>{status}</span>;
    },
  },
  {
      header: "Actions",
      accessorKey: "id",
      cell: () => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Manage</button>
  }
];

const PolicyCompliancePage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Policy & Compliance</h1>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Policy</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">New Policy</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">System Policies</h2>
        <DataTable data={dummyPolicies} columns={columns} filterColumn="category" />
      </div>
    </div>
  );
};

export default PolicyCompliancePage;
