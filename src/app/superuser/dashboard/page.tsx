"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";

const SystemOperationsPage: NextPage = () => {
  const { setTitle } = usePageTitleStore();

  useEffect(() => {
    setTitle("System Operations");
  }, [setTitle]);

  return (
    <div className="p-6">
      <p>This is a placeholder for the System Operations page.</p>
      <p>Here, the superuser will monitor real-time system status, including active trips, bus statuses, passenger registrations, seat availability, system alerts, and driver activity.</p>
    </div>
  );
};

export default SystemOperationsPage;
