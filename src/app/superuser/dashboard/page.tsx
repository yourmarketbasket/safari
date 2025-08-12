"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";
import { useSuperuserAuth } from "@/app/lib/SuperuserAuthContext";
import Message from "@/app/components/Message";

const SystemOperationsPage: NextPage = () => {
  const { setTitle } = usePageTitleStore();
  const { user, token, isInitialized } = useSuperuserAuth();

  useEffect(() => {
    setTitle("System Operations");
  }, [setTitle]);

  return (
    <div className="p-6">
      <Message
        message={`Auth State: isInitialized=${isInitialized}, token=${!!token}, user=${!!user}, role=${user?.role}`}
        type="info"
      />
      <p>This is a placeholder for the System Operations page.</p>
      <p>Here, the superuser will monitor real-time system status, including active trips, bus statuses, passenger registrations, seat availability, system alerts, and driver activity.</p>
    </div>
  );
};

export default SystemOperationsPage;
