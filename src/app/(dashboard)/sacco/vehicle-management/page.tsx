"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { DataTable, ColumnDef } from "@/app/components/DataTable";
import { Vehicle } from "@/app/models/Vehicle.model";
import { Chip } from "@/app/components/Chip";
import { Button } from "@/app/components/ui/Button";

// Dummy data for vehicles
const dummyVehicles: Vehicle[] = [
  { _id: "v-1", licensePlate: "KDA 123A", capacity: 33, routeId: "r-1", saccoId: "s-1", ownerId: "u-1", condition: "Good", class: "economy", createdAt: new Date() },
  { _id: "v-2", licensePlate: "KDB 456B", capacity: 45, routeId: "r-2", saccoId: "s-1", ownerId: "u-2", condition: "Excellent", class: "business", createdAt: new Date() },
  { _id: "v-3", licensePlate: "KDC 789C", capacity: 28, routeId: "r-1", saccoId: "s-2", ownerId: "u-3", condition: "Needs Repair", class: "economy", createdAt: new Date() },
];

// Column definitions for the vehicle table
const columns: ColumnDef<Vehicle>[] = [
  { header: "License Plate", accessorKey: "licensePlate" },
  { header: "Capacity", accessorKey: "capacity" },
  { header: "Class", accessorKey: "class" },
  {
    header: "Condition",
    accessorKey: "condition",
    cell: (row) => {
      const condition = row.condition;
      const type =
        condition === "Excellent" ? "success" :
        condition === "Good" ? "info" :
        "warning";
      return <Chip text={condition} type={type} />;
    }
  },
  {
      header: "Actions",
      accessorKey: "_id",
      cell: () => (
          <div className="flex gap-2">
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="danger">Delete</Button>
          </div>
      )
  }
];

const VehicleManagementPage: NextPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle('Vehicle Management');
  }, [setTitle]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
            <Button>Add Vehicle</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Vehicles</h2>
        <DataTable data={dummyVehicles} columns={columns} filterColumn="class" />
      </div>
    </div>
  );
};

export default VehicleManagementPage;
