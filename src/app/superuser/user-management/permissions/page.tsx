"use client";

import { NextPage } from "next";

const PermissionsPage: NextPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permission Management</h1>
      <p className="mb-4">This page will be used to manage user permissions. Admins can add permissions individually or in bulk.</p>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Assign Permissions</h2>
        <p>A form will be provided here to assign permissions to users or roles.</p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">Add Permission</button>
      </div>
    </div>
  );
};

export default PermissionsPage;
