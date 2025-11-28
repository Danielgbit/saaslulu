"use client";

import { motion } from "framer-motion";
import { useEmployeeSelector } from "@/hooks/employees/useEmployeeSelector";
import { UserCheck } from "lucide-react";

export function EmployeeSelector() {
    const {
        employees,
        loading,
        query,
        setQuery,
        selected,
        setSelected,
        handleSave,
    } = useEmployeeSelector();

    return (
        <div className="max-w-xl mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold mb-4 text-center">Selecciona tu empleado</h1>
            <p className="text-gray-500 text-center mb-6">
                Conecta tu usuario con tu perfil interno del SPA
            </p>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Buscar empleado..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* EMPLOYEE CARDS */}
            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-2">
                {employees.map((emp) => (
                    <motion.div
                        key={emp.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelected(emp.id)}
                        className={`cursor-pointer p-4 rounded-xl border flex items-center gap-3 transition ${selected === emp.id
                            ? "bg-blue-600 text-white border-blue-700"
                            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
                            }`}
                    >
                        <UserCheck />
                        <div>
                            <h3 className="font-semibold">{emp.full_name}</h3>
                            <p className="text-sm opacity-80">{emp.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* SAVE BUTTON */}
            <button
                onClick={handleSave}
                disabled={!selected || loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl font-semibold transition"
            >
                {loading ? "Guardando..." : "Confirmar selección"}
            </button>
        </div>
    );
}
