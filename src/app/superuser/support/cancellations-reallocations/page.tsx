"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Types for the data
type Cancellation = {
  _id: string;
  passenger: string;
  route: string;
  amount: string;
  sacco: string;
  reason: string;
  status: "Refunded" | "Completed" | "Pending";
};

type Reallocation = {
  _id: string;
  passenger: string;
  original: string;
  new: string;
  sacco: string;
  status: "Completed" | "Pending";
};

// Dummy data
const dummyCancellations: Cancellation[] = [
  { _id: "60d0fe4f5311236168a109e1", passenger: "Alice Johnson", route: "Nairobi - Mombasa", amount: "KES 1200", sacco: "Modern Coast", reason: "Mechanical Issue", status: "Refunded" },
  { _id: "60d0fe4f5311236168a109e2", passenger: "Bob Williams", route: "Kisumu - Nairobi", amount: "KES 1000", sacco: "Easy Coach", reason: "Driver Unavailability", status: "Refunded" },
  { _id: "60d0fe4f5311236168a109e3", passenger: "Diana Prince", route: "Mombasa - Malindi", amount: "KES 500", sacco: "Modern Coast", reason: "Passenger Request", status: "Completed" },
  { _id: "60d0fe4f5311236168a109e4", passenger: "Bruce Wayne", route: "Nairobi - Eldoret", amount: "KES 1500", sacco: "North Rift", reason: "Weather", status: "Pending" },
];

const dummyReallocations: Reallocation[] = [
  { _id: "60d0fe4f5311236168a109f1", passenger: "Charlie Brown", original: "Nairobi - Nakuru (8 AM)", new: "Nairobi - Nakuru (9 AM)", sacco: "Prestige", status: "Completed" },
  { _id: "60d0fe4f5311236168a109f2", passenger: "David Rose", original: "Kisumu - Busia (10 AM)", new: "Kisumu - Busia (11 AM)", sacco: "Western Express", status: "Completed" },
  { _id: "60d0fe4f5311236168a109f3", passenger: "Alexis Rose", original: "Nairobi - Nanyuki (7 AM)", new: "Nairobi - Nanyuki (8 AM)", sacco: "2NK", status: "Pending" },
];

// Column definitions
const cancellationColumns: ColumnDef<Cancellation>[] = [
  { header: "Passenger", accessorKey: "passenger" },
  { header: "Route", accessorKey: "route" },
  { header: "Amount", accessorKey: "amount" },
  { header: "Sacco", accessorKey: "sacco" },
  { header: "Reason", accessorKey: "reason" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.status;
      const type =
        status === "Refunded" ? "success" :
        status === "Pending" ? "warning" :
        "info";
      return <Chip text={status} type={type} />;
    },
  },
];

const reallocationColumns: ColumnDef<Reallocation>[] = [
  { header: "Passenger", accessorKey: "passenger" },
  { header: "Original Trip", accessorKey: "original" },
  { header: "New Trip", accessorKey: "new" },
  { header: "Sacco", accessorKey: "sacco" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.status;
      const type =
        status === "Completed" ? "success" :
        "warning";
      return <Chip text={status} type={type} />;
    },
  },
];


const CancellationsReallocationsPage: NextPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle("Cancellations & Reallocations");
  }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Cancellations Today</h2>
          <p className="text-4xl font-bold text-red-500">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Reallocations Today</h2>
          <p className="text-4xl font-bold text-blue-500">35</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Success Rate</h2>
          <p className="text-4xl font-bold text-green-500">98%</p>
        </div>
      </div>

      {/* Cancellations Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Trip Cancellations</h2>
        <DataTable data={dummyCancellations} columns={cancellationColumns} filterColumn="status" />
      </div>

      {/* Reallocations Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Passenger Reallocations</h2>
        <DataTable data={dummyReallocations} columns={reallocationColumns} filterColumn="status" />
      </div>
    </div>
  );
};

export default CancellationsReallocationsPage;
