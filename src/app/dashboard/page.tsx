"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { ServicesList } from "@/components/dashboard/ServiceList";

export default function DashboardPage() {
    const { loading, employee, appointments, totalIncome } = useDashboard();

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center">
                Cargando dashboard...
            </div>
        );

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
            <DashboardHeader employee={employee} />
            <StatsCards appointments={appointments} totalIncome={totalIncome} />
            <IncomeChart />
            <ServicesList appointments={appointments} />
        </div>
    );
}
