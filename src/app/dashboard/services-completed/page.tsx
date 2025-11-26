"use client";

import { ServicesList } from "@/components/dashboard/ServiceList";
import { useDashboard } from "@/hooks/useDashboard";

export default function ServicesCompletedPage() {

    const { completedServices } = useDashboard();

    return (
        <div>
            <ServicesList completedServices={completedServices} />
        </div>
    );
};