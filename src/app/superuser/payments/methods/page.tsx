"use client";

import { Button } from "@/app/components/ui/Button";
import { NextPage } from "next";

const PaymentMethodsPage: NextPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <p className="mb-4">This page will be used to add and manage payment methods and their credentials.</p>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Manage Payment Methods</h2>
        <p>A form and list will be provided here to manage payment gateways and credentials.</p>
        <Button className="mt-4">Add New Method</Button>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
