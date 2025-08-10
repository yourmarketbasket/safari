"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Chip } from "@/app/components/Chip";
import { Button } from "@/app/components/ui/Button";

// Type for Escalation data
type Escalation = {
  _id: string;
  issue: string;
  escalatedBy: string;
  department: "Technical" | "Payments" | "Operations";
  date: string;
  status: "Pending" | "In Review" | "Resolved";
};

// Dummy data for escalations
const dummyEscalations: Escalation[] = [
  { _id: "60d0fe4f5311236168a10e01", issue: "Repeated Cancellations on Route 5", escalatedBy: "Jane Doe", department: "Operations", date: "2023-10-26", status: "In Review" },
  { _id: "60d0fe4f5311236168a10e02", issue: "Large Refund Request #F999", escalatedBy: "John Smith", department: "Payments", date: "2023-10-25", status: "Resolved" },
  { _id: "60d0fe4f5311236168a10e03", issue: "System-wide login failures", escalatedBy: "Tech Team", department: "Technical", date: "2023-10-27", status: "Pending" },
];

// Column definitions for the escalation table
const columns: ColumnDef<Escalation>[] = [
  { header: "Issue", accessorKey: "issue" },
  { header: "Escalated By", accessorKey: "escalatedBy" },
  { header: "Department", accessorKey: "department" },
  { header: "Date", accessorKey: "date" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.status;
      const type =
        status === "Resolved" ? "success" :
        status === "In Review" ? "warning" :
        "error";
      return <Chip text={status} type={type} />;
    },
  },
   {
      header: "Actions",
      accessorKey: "_id",
      cell: () => <Button size="sm">Review</Button>
  }
];

const EscalationsPage: NextPage = () => {
    const { setTitle } = usePageTitleStore();

    useEffect(() => {
        setTitle("Escalation Management");
    }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escalation Queue</h2>
        <DataTable data={dummyEscalations} columns={columns} filterColumn="department" />
      </div>
    </div>
  );
};

export default EscalationsPage;
