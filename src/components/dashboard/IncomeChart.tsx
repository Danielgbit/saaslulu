"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export function IncomeChart() {
    const mockData = Array.from({ length: 6 }).map((_, i) => ({
        month: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"][i],
        income: Math.floor(Math.random() * 800) + 200,
    }));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-10">
            <h2 className="text-xl font-semibold mb-4">Ingresos últimos meses</h2>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData}>
                        <XAxis dataKey="month" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip />
                        <Bar dataKey="income" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
