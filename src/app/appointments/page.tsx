"use client";

/**
 * Enhanced AppointmentsPage component with improved UX/UI.
 * - Uses cleaner layout structure and card components.
 * - Adds subtle hover effects, spacing, and typography improvements.
 * - Displays appointment info in a more visually appealing way.
 * All comments are in English following user preferences.
 */

import { useTodayAppointments } from "@/hooks/employees/useTodayAppointments";
import { combineDateTime } from "@/lib/dateUtils";
import StatusBadge from "@/components/ui/StatusBadge";


export default function AppointmentsPage() {
    // Retrieve today's appointments and loading state
    const { appointments, loading } = useTodayAppointments();

    // Show loading state
    if (loading) {
        return (
            <div className="p-8">
                <p className="text-gray-500 animate-pulse text-lg">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6">
            {/* Page title */}
            <h1 className="text-3xl font-bold tracking-tight mb-4">Citas de Hoy</h1>

            {/* No appointments message */}
            {appointments.length === 0 && (
                <p className="text-gray-500 text-lg">No hay citas hoy.</p>
            )}

            {/* Appointment list */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appt) => {
                    // Combine dates with times for proper display
                    const start = combineDateTime(
                        appt.appointment_date,
                        appt.start_time
                    );
                    const end = combineDateTime(appt.appointment_date, appt.end_time);

                    return (
                        <div
                            key={appt.id}
                            className="bg-violet-200 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="flex items-start justify-between mb-3">
                                {/* Appointment time range */}
                                <p className="font-semibold text-black text-lg">
                                    {start.toLocaleTimeString("es-CO", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                    {" "}—{" "}
                                    {end.toLocaleTimeString("es-CO", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>

                                {/* Status badge */}
                                <StatusBadge status={appt.status} />
                            </div>

                            {/* Client info */}
                            <div className="space-y-1">
                                <p className="text-gray-800 font-medium">
                                    {appt.client_name ?? "Sin nombre"}
                                </p>
                                <p className="text-gray-500 text-sm">Tel: {appt.client_phone}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
