"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { Button } from "@/app/components/ui/Button";
import Pagination from "@/app/components/Pagination";

// Type for Policy data
type Policy = {
  _id: string;
  name: string;
  category: "Cancellations" | "Data Privacy" | "Driver Conduct";
  version: string;
  status: "Active" | "Draft" | "Archived";
};

// Dummy data for policies
const dummyPolicies: Policy[] = [
  { _id: "60d0fe4f5311236168a11101", name: "Refund Policy for Trip Cancellations", category: "Cancellations", version: "v2.1", status: "Active" },
  { _id: "60d0fe4f5311236168a11102", name: "GDPR Data Handling", category: "Data Privacy", version: "v1.5", status: "Active" },
  { _id: "60d0fe4f5311236168a11103", name: "Driver Code of Conduct", category: "Driver Conduct", version: "v3.0", status: "Draft" },
  { _id: "60d0fe4f5311236168a11104", name: "Reallocation Procedure", category: "Cancellations", version: "v1.0", status: "Archived" },
];

// Column definitions for the policy table
const columns: ColumnDef<Policy>[] = [
  { header: "Policy Name", accessorKey: "name" },
  { header: "Category", accessorKey: "category" },
  { header: "Version", accessorKey: "version" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.status;
      const type =
        status === "Active" ? "success" :
        status === "Draft" ? "warning" :
        "default";
      return <Chip text={status} type={type} />;
    },
  },
  {
      header: "Actions",
      accessorKey: "_id",
      cell: () => <Button size="sm">Manage</Button>
  }
];

const PolicyCompliancePage: NextPage = () => {
    const { setTitle } = usePageTitleStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        setTitle("Policy & Compliance");
    }, [setTitle]);

    const totalPages = Math.ceil(dummyPolicies.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Policy</h2>
            <Button>New Policy</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">System Policies</h2>
        <DataTable
            data={dummyPolicies}
            columns={columns}
            filterColumn="category"
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

export default PolicyCompliancePage;
