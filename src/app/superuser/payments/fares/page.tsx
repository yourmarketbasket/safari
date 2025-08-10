"use client";

import { Button } from "@/app/components/ui/Button";
import { NextPage } from "next";

const FaresPage: NextPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fare Management</h1>
      <p className="mb-4">This page will be used to set and adjust fare charges.</p>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Set Fare Charges</h2>
        <p>A form will be provided here to manage fare prices for different routes or times.</p>
        <Button className="mt-4">Update Fares</Button>
      </div>
    </div>
  );
};

export default FaresPage;
