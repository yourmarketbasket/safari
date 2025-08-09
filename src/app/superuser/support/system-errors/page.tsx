"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Type for the data
type SystemError = {
  id: number;
  code: string;
  desc: string;
  time: string;
  status: "New" | "In Progress" | "Resolved";
};

// Dummy data
const dummyErrors: SystemError[] = [
  { id: 1, code: "E5001", desc: "Overbooking queue failure", time: "2023-10-27 10:00 AM", status: "New" },
  { id: 2, code: "E4041", desc: "Route mismatch for Bus 12", time: "2023-10-27 09:30 AM", status: "In Progress" },
  { id: 3, code: "E2003", desc: "Connectivity failure, server X", time: "2023-10-27 08:00 AM", status: "Resolved" },
  { id: 4, code: "E5002", desc: "Payment gateway timeout", time: "2023-10-27 11:00 AM", status: "New" },
  { id: 5, code: "E3010", desc: "GPS sync error on Bus 21", time: "2023-10-27 10:45 AM", status: "In Progress" },
  { id: 6, code: "E2004", desc: "Database connection pool exhausted", time: "2023-10-27 10:30 AM", status: "Resolved" },
];

// Column definitions
const columns: ColumnDef<SystemError>[] = [
  { header: "Error Code", accessorKey: "code" },
  { header: "Description", accessorKey: "desc" },
  { header: "Timestamp", accessorKey: "time" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const type =
        status === "Resolved" ? "success" :
        status === "In Progress" ? "warning" :
        "error";
      return <Chip text={status} type={type} />;
    },
  },
];

const SystemErrorsPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">System Errors</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">New Errors</h2>
          <p className="text-4xl font-bold text-red-500">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-500">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Resolved Today</h2>
          <p className="text-4xl font-bold text-green-500">28</p>
        </div>
      </div>

      {/* System Errors Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Error Log</h2>
        <DataTable data={dummyErrors} columns={columns} filterColumn="status" />
      </div>
    </div>
  );
};

export default SystemErrorsPage;
