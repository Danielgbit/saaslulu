"use client";

import { useAvailability } from "@/hooks/employees/useEmployeeAvailability";
import EmployeeAvailabilityCard from "@/components/employees/EmployeeAvailabilityCard";

export default function AvailabilityDashboard() {
    const { availability, loading, error, refresh } = useAvailability();

    console.log(availability);


    if (loading) {
        return <p className="text-gray-500">Cargando disponibilidad...</p>;
    }

    if (error) {
        return (
            <div className="text-red-600">
                <p>Error: {error}</p>
                <button
                    onClick={refresh}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (availability.length === 0) {
        return <p className="text-gray-500">No hay empleados registrados</p>;
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availability.map(emp => (
                <EmployeeAvailabilityCard
                    key={emp.employee_id}
                    emp={emp}
                />
            ))}
        </div>
    );
}
