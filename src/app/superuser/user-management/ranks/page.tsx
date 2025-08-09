"use client";

import { NextPage } from "next";

const RanksPage: NextPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rank Management</h1>
      <p className="mb-4">This page will be used to update user ranks.</p>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Update User Rank</h2>
        <p>A form will be provided here to select a user and update their rank.</p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">Update Rank</button>
      </div>
    </div>
  );
};

export default RanksPage;
