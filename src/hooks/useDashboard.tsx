"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { getEmployeeByUserId } from "@/services/dashboard.service";
import { useEmployeeCompletedServices } from "@/hooks/employees/useEmployeeCompletedServices";

export function useDashboard() {
    const [employee, setEmployee] = useState<any>(null);
    const [userLoading, setUserLoading] = useState(true);

    // 1. Obtener usuario y empleado al montar
    useEffect(() => {
        async function loadUserAndEmployee() {
            try {
                const { data: { user } } = await supabaseClient.auth.getUser();
                if (!user) {
                    setUserLoading(false);
                    return;
                }

                const emp = await getEmployeeByUserId(user.id);
                setEmployee(emp);
            } catch (error) {
                console.error("Error loading dashboard user:", error);
            } finally {
                setUserLoading(false);
            }
        }
        loadUserAndEmployee();
    }, []);

    // 2. Hook llamado siempre en el top level
    // Pasamos employee?.id. Si es undefined, el hook manejará eso (o retornará array vacío)
    const { services, loading: servicesLoading, refetch } = useEmployeeCompletedServices(employee?.id);

    const [monthlyIncome, setMonthlyIncome] = useState<any[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);

    // 3. Calcular estadísticas cuando cambian los servicios
    useEffect(() => {
        if (!services || services.length === 0) {
            setTotalIncome(0);
            setMonthlyIncome([]);
            return;
        }

        // Calcular ingresos totales
        const total = services.reduce(
            (sum: number, s: any) => sum + Number(s.service_price),
            0
        );
        setTotalIncome(total);

        // Agrupar ingresos por mes
        const byMonth: Record<string, number> = {};

        services.forEach((s: any) => {
            const date = new Date(s.completed_at);
            // Asegurarse de que la fecha es válida
            if (isNaN(date.getTime())) return;

            const month = date.toLocaleString("es-ES", {
                month: "short",
            });

            if (!byMonth[month]) byMonth[month] = 0;
            byMonth[month] += Number(s.service_price);
        });

        const chartData = Object.keys(byMonth).map((m) => ({
            month: m,
            income: byMonth[m],
        }));

        setMonthlyIncome(chartData);

    }, [services]);

    return {
        loading: userLoading || servicesLoading,
        employee,
        completedServices: services,
        totalIncome,
        monthlyIncome,
        refetch
    };
}
