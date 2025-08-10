"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import Pagination from "@/app/components/Pagination";

// Define the type for a support ticket
type SupportTicket = {
  _id: string;
  issue: string;
  handler: string;
  resolution: string;
  status: "Resolved" | "In Progress" | "Open" | "Escalated";
};

// Dummy data for the tables
const dummyData: SupportTicket[] = [
  { _id: "60d0fe4f5311236168a109ca", issue: "Payment Failure #1234", handler: "Jane Doe", resolution: "Refund processed", status: "Resolved" },
  { _id: "60d0fe4f5311236168a109cb", issue: "Missed Boarding #5678", handler: "John Smith", resolution: "Reallocated to next bus", status: "In Progress" },
  { _id: "60d0fe4f5311236168a109cc", issue: "Unsuitable Stop #9101", handler: "Alice", resolution: "Pending passenger confirmation", status: "Open" },
  { _id: "60d0fe4f5311236168a109cd", issue: "Lost Luggage #B456", handler: "Jane Doe", resolution: "Investigating", status: "In Progress" },
  { _id: "60d0fe4f5311236168a109ce", issue: "Driver Dispute #C789", handler: "Bob Brown", resolution: "Awaiting driver report", status: "Open" },
  { _id: "60d0fe4f5311236168a109cf", issue: "App Crash on Booking", handler: "Tech Team", resolution: "Patch v1.2 deployed", status: "Resolved" },
  { _id: "60d0fe4f5311236168a109d0", issue: "Double Charge #D112", handler: "John Smith", resolution: "Second charge refunded", status: "Resolved" },
];

const escalatedDummyData: SupportTicket[] = [
    { _id: "60d0fe4f5311236168a109d1", issue: "Repeated Cancellations on Route 5", handler: "Superuser", resolution: "Under review with operator", status: "Escalated" },
    { _id: "60d0fe4f5311236168a109d2", issue: "Large Refund Request #F999", handler: "Superuser", resolution: "Awaiting manager approval", status: "Escalated" },
];

// Define the columns for the data table
const columns: ColumnDef<SupportTicket>[] = [
  { header: "Issue", accessorKey: "issue" },
  { header: "Handler", accessorKey: "handler" },
  { header: "Resolution", accessorKey: "resolution" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.status;
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
  const { setTitle } = usePageTitleStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [escalatedCurrentPage, setEscalatedCurrentPage] = useState(1);
  const [escalatedItemsPerPage, setEscalatedItemsPerPage] = useState(10);

  useEffect(() => {
    setTitle("Passenger & Driver Support");
  }, [setTitle]);

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);
  const totalPagesEscalated = Math.ceil(escalatedDummyData.length / escalatedItemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
        <DataTable
            data={dummyData}
            columns={columns}
            filterColumn="status"
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
        />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Escalated Issues Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escalated Issues</h2>
        <DataTable
            data={escalatedDummyData}
            columns={columns}
            filterColumn="status"
            currentPage={escalatedCurrentPage}
            itemsPerPage={escalatedItemsPerPage}
            onPageChange={setEscalatedCurrentPage}
            onItemsPerPageChange={setEscalatedItemsPerPage}
        />
        <Pagination
            currentPage={escalatedCurrentPage}
            totalPages={totalPagesEscalated}
            onPageChange={setEscalatedCurrentPage}
            itemsPerPage={escalatedItemsPerPage}
            onItemsPerPageChange={setEscalatedItemsPerPage}
        />
      </div>
    </div>
  );
};

export default PassengerDriverSupportPage;
