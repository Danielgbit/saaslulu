import { supabaseClient } from "@/lib/supabase-client";
import { useEffect, useState } from "react";

/**
 * Type: EarningsFilter
 * ------------------------------
 * Represents filter modes for earnings:
 * - day: earnings of today
 * - week: earnings of current week
 * - month: earnings of current month
 */
export type EarningsFilter = "day" | "week" | "month";


export function useEmployeeEarnings(filter: EarningsFilter, employeeId?: string) {
    const [loading, setLoading] = useState(true);
    const [earnings, setEarnings] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    const getDateRange = () => {
        const now = new Date();
        let start: Date;

        if (filter === "day") {
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (filter === "week") {
            const day = now.getDay();
            const mondayOffset = day === 0 ? 6 : day - 1;
            start = new Date(now);
            start.setDate(now.getDate() - mondayOffset);
            start.setHours(0, 0, 0, 0);
        } else {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        return start.toISOString();
    };

    const loadEarnings = async () => {
        setLoading(true);

        const start = getDateRange();

        const { data, error } = await supabaseClient
            .from("services_completed")
            .select("*, employee:employee_id(full_name)")
            .gte("completed_at", start)
            .match(employeeId ? { employee_id: employeeId } : {})
            .order("completed_at", { ascending: false });

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        const grouped: Record<string, any> = {};

        data?.forEach((item) => {
            if (!grouped[item.employee_id]) {
                grouped[item.employee_id] = {
                    employee_id: item.employee_id,
                    employee_name: item.employee.full_name,
                    total: 0,
                    services: []
                };
            }

            grouped[item.employee_id].services.push(item);
            grouped[item.employee_id].total += item.service_price;
        });

        const arrayData = Object.values(grouped);

        const globalTotal = arrayData.reduce(
            (sum: number, emp: any) => sum + emp.total,
            0
        );

        setEarnings(arrayData);
        setTotal(globalTotal);
        setLoading(false);
    };

    useEffect(() => {
        loadEarnings();
    }, [filter, employeeId]);

    return { loading, earnings, total };
}
