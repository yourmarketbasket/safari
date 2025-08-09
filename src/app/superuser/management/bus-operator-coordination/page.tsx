"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";

// Type for Bus Operator data
type BusOperator = {
  _id: string;
  name: string;
  contact: string;
  activeRoutes: number;
  performance: "Excellent" | "Good" | "Poor";
};

// Dummy data for bus operators
const dummyOperators: BusOperator[] = [
  { _id: "60d0fe4f5311236168a10f01", name: "Modern Coast", contact: "contact@moderncoast.com", activeRoutes: 15, performance: "Good" },
  { _id: "60d0fe4f5311236168a10f02", name: "Easy Coach", contact: "support@easycoach.co.ke", activeRoutes: 25, performance: "Excellent" },
  { _id: "60d0fe4f5311236168a10f03", name: "Prestige Shuttles", contact: "bookings@prestige.com", activeRoutes: 8, performance: "Good" },
  { _id: "60d0fe4f5311236168a10f04", name: "North Rift", contact: "help@northrift.co", activeRoutes: 12, performance: "Poor" },
];

// Column definitions for the bus operator table
const columns: ColumnDef<BusOperator>[] = [
  { header: "Operator Name", accessorKey: "name" },
  { header: "Contact", accessorKey: "contact" },
  { header: "Active Routes", accessorKey: "activeRoutes" },
  {
    header: "Performance",
    accessorKey: "performance",
    cell: (row) => {
      const performance = row.performance;
      const type =
        performance === "Excellent" ? "info" :
        performance === "Good" ? "success" :
        "error";
      return <Chip text={performance} type={type} />;
    },
  },
   {
      header: "Actions",
      accessorKey: "_id",
      cell: (_row) => <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Details</button>
  }
];

const BusOperatorCoordinationPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Bus Operator Coordination");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Onboard New Operator</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Add Operator</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Partner Operators</h2>
        <DataTable data={dummyOperators} columns={columns} filterColumn="performance" />
      </div>
    </div>
  );
};

export default BusOperatorCoordinationPage;
