"use client";

/**
 * Earnings Dashboard (Improved UX/UI + COP Formatting)
 * ----------------------------------------------------
 * Clean and modern layout with Colombian currency formatting.
 */

import { useEmployees } from "@/hooks/employees/useEmployees";
import { useEmployeeEarnings } from "@/hooks/employees/useEmployeeEarnings";
import { useState } from "react";

// Helper: Format number as Colombian Peso
const formatCOP = (value: number) =>
    new Intl.NumberFormat("es-CO").format(value);

export default function EarningsDashboard() {
    const [filter, setFilter] = useState<"day" | "week" | "month">("day");
    const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined);

    const { employees } = useEmployees();
    const { loading, earnings, total } = useEmployeeEarnings(filter, selectedEmployee);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight">Ingresos del personal</h1>

            {/* Employee Selector */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Selecciona un empleado</h2>

                <div className="flex gap-3 flex-wrap">
                    {employees.map((emp) => (
                        <button
                            key={emp.id}
                            onClick={() =>
                                setSelectedEmployee(prev => prev === emp.id ? undefined : emp.id)
                            }
                            className={`
                                px-4 py-2 rounded-lg transition-all font-medium
                                border shadow-sm
                                ${selectedEmployee === emp.id
                                    ? "bg-black text-white border-black scale-105"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }
                            `}
                        >
                            {emp.full_name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Rango de tiempo</h2>

                <div className="flex gap-3">
                    {["day", "week", "month"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`
                                px-4 py-2 rounded-lg font-medium transition-all shadow-sm
                                ${filter === f
                                    ? "bg-black text-white scale-105"
                                    : "bg-gray-300 hover:bg-gray-400"
                                }
                            `}
                        >
                            {f === "day" && "Hoy"}
                            {f === "week" && "Semana"}
                            {f === "month" && "Mes"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Total Earnings */}
            {!loading && (
                <div className="bg-black text-white p-5 rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold">Total generado</h2>
                    <p className="text-3xl font-bold mt-1">
                        $ {formatCOP(total)} COP
                    </p>
                </div>
            )}

            {/* Earnings List */}
            {!loading && earnings.length > 0 && (
                <div className="space-y-6">
                    {earnings.map((emp: any) => (
                        <div
                            key={emp.employee_id}
                            className="bg-white border rounded-xl p-5 shadow-md"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-bold">{emp.employee_name}</h3>

                                <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-lg">
                                    $ {formatCOP(emp.total)}
                                </span>
                            </div>

                            {/* Services */}
                            <div className="space-y-3">
                                {emp.services.map((srv: any) => (
                                    <div
                                        key={srv.id}
                                        className="border p-4 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition-all"
                                    >
                                        <p className="font-semibold text-lg">{srv.service_name}</p>

                                        <p className="text-gray-700 font-medium">
                                            Precio: $ {formatCOP(srv.service_price)}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            {new Date(srv.completed_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && earnings.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                    No hay registros para este empleado o este rango.
                </p>
            )}
        </div>
    );
}
