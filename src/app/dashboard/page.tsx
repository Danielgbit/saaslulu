"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { ServicesList } from "@/components/dashboard/ServiceList";
import { IncomeSummary } from "@/components/dashboard/IncomeSummary";

export default function DashboardPage() {
    const { loading, employee, completedServices, totalIncome, monthlyIncome } = useDashboard();

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center">
                Cargando dashboard...
            </div>
        );

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
            <DashboardHeader employee={employee} />
            <IncomeSummary completedServices={completedServices} />
            <StatsCards completedServices={completedServices} totalIncome={totalIncome} />
            <IncomeChart data={monthlyIncome} />
            <ServicesList completedServices={completedServices} />
        </div>
    );
}
