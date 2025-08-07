"use client";

import { useEffect } from "react";
import { usePageTitleStore } from "@/app/store/pageTitle.store";

export default function SuperuserDashboardPage() {
    const { setTitle } = usePageTitleStore();
    useEffect(() => {
        setTitle("Superuser Dashboard");
    }, [setTitle]);

    return (
        <div>
            {/* Content goes here */}
        </div>
    );
}
