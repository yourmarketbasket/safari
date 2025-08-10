"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { Button } from "@/app/components/ui/Button";
import Pagination from "@/app/components/Pagination";

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
      cell: () => <Button size="sm">Details</Button>
  }
];

const BusOperatorCoordinationPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setTitle("Bus Operator Coordination");
    }, [setTitle]);

    const totalPages = Math.ceil(dummyOperators.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Onboard New Operator</h2>
            <Button>Add Operator</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Partner Operators</h2>
        <DataTable
            data={dummyOperators}
            columns={columns}
            filterColumn="performance"
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
    </div>
  );
};

export default BusOperatorCoordinationPage;
