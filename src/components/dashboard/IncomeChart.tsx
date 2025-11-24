"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export function IncomeChart({ data }: { data: any[] }) {

    const moneyFormatter = (value: number) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(value);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-10">
            <h2 className="text-xl font-semibold mb-4">Ingresos últimos meses</h2>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="month" stroke="#aaa" />

                        {/* Formatea valores del eje Y */}
                        <YAxis
                            stroke="#430f64ff"
                            tickFormatter={moneyFormatter}
                        />

                        {/* Formatea tooltip con COP */}
                        <Tooltip
                            formatter={(value) => moneyFormatter(Number(value))}
                            labelFormatter={(label) => `Mes: ${label}`}
                        />

                        <Bar dataKey="income" fill="#890de7ff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
