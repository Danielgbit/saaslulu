"use client";

import { useState, useMemo } from "react";

export function IncomeSummary({ completedServices }: { completedServices: any[] }) {
    const [filter, setFilter] = useState<"day" | "week" | "month">("month");

    const money = (v: number) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(v);

    const filtered = useMemo(() => {
        const now = new Date();

        return completedServices.filter((s) => {
            const date = new Date(s.completed_at);

            switch (filter) {
                case "day":
                    return (
                        date.getDate() === now.getDate() &&
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                    );
                case "week": {
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - now.getDay());

                    return date >= startOfWeek && date <= now;
                }
                case "month":
                    return (
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                    );
            }
        });
    }, [filter, completedServices]);

    const total = filtered.reduce((acc, s) => acc + s.service_price, 0);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Total ingresos</h2>

                {/* Filtros */}
                <div className="flex gap-2">
                    {["day", "week", "month"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-3 py-1 rounded-lg text-sm border transition 
                                ${filter === f
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-gray-300"
                                }`}
                        >
                            {f === "day" && "Hoy"}
                            {f === "week" && "Semana"}
                            {f === "month" && "Mes"}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {money(total)}
            </p>

            <p className="text-sm text-gray-500 mt-2">
                {filtered.length} servicios registrados
            </p>
        </div>
    );
}
