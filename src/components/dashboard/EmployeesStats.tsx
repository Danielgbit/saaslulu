"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { EmployeeStats } from "@/types/EmployeeStats";


export default function EmployeesStats() {
    const [employees, setEmployees] = useState<EmployeeStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const { data, error } = await supabaseClient.rpc("get_employee_stats");

            if (!error) setEmployees(data);
            setLoading(false);
        }

        fetchStats();
    }, []);

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp) => (
                <div
                    key={emp.employee_id}
                    className="bg-white rounded-xl p-5 shadow border"
                >
                    <h2 className="font-semibold text-lg mb-3">
                        {emp.full_name}
                    </h2>

                    <div className="space-y-2">
                        <p>
                            <span className="font-medium">Hoy:</span> ${emp.total_day}
                        </p>
                        <p>
                            <span className="font-medium">Semana:</span> ${emp.total_week}
                        </p>
                        <p>
                            <span className="font-medium">Mes:</span> ${emp.total_month}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
