"use client";

import { NextPage } from "next";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Define the type for a support ticket
type SupportTicket = {
  id: number;
  issue: string;
  handler: string;
  resolution: string;
  status: "Resolved" | "In Progress" | "Open" | "Escalated";
};

// Dummy data for the tables
const dummyData: SupportTicket[] = [
  { id: 1, issue: "Payment Failure #1234", handler: "Jane Doe", resolution: "Refund processed", status: "Resolved" },
  { id: 2, issue: "Missed Boarding #5678", handler: "John Smith", resolution: "Reallocated to next bus", status: "In Progress" },
  { id: 3, issue: "Unsuitable Stop #9101", handler: "Alice", resolution: "Pending passenger confirmation", status: "Open" },
  { id: 4, issue: "Lost Luggage #B456", handler: "Jane Doe", resolution: "Investigating", status: "In Progress" },
  { id: 5, issue: "Driver Dispute #C789", handler: "Bob Brown", resolution: "Awaiting driver report", status: "Open" },
  { id: 6, issue: "App Crash on Booking", handler: "Tech Team", resolution: "Patch v1.2 deployed", status: "Resolved" },
  { id: 7, issue: "Double Charge #D112", handler: "John Smith", resolution: "Second charge refunded", status: "Resolved" },
];

const escalatedDummyData: SupportTicket[] = [
    { id: 8, issue: "Repeated Cancellations on Route 5", handler: "Superuser", resolution: "Under review with operator", status: "Escalated" },
    { id: 9, issue: "Large Refund Request #F999", handler: "Superuser", resolution: "Awaiting manager approval", status: "Escalated" },
];

// Define the columns for the data table
const columns: ColumnDef<SupportTicket>[] = [
  { header: "Issue", accessorKey: "issue" },
  { header: "Handler", accessorKey: "handler" },
  { header: "Resolution", accessorKey: "resolution" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (status) => {
      const type =
        status === "Resolved" ? "success" :
        status === "In Progress" ? "warning" :
        status === "Open" ? "info" :
        "error";
      return <Chip text={status} type={type} />;
    },
  },
];

const PassengerDriverSupportPage: NextPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Passenger & Driver Support</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Open Tickets</h2>
          <p className="text-4xl font-bold text-blue-500">125</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-500">32</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Resolved Today</h2>
          <p className="text-4xl font-bold text-green-500">58</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Escalated</h2>
          <p className="text-4xl font-bold text-red-500">{escalatedDummyData.length}</p>
        </div>
      </div>

      {/* Support Issues Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Support Issues</h2>
        <DataTable data={dummyData} columns={columns} filterColumn="status" />
      </div>

      {/* Escalated Issues Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escalated Issues</h2>
        <DataTable data={escalatedDummyData} columns={columns} filterColumn="status" />
      </div>
    </div>
  );
};

export default PassengerDriverSupportPage;
