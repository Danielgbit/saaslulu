// File: app/appointments/page.tsx
// Description: Appointments page, now using the modular AppointmentCard component.
// All comments are written in English.


"use client";


import { useTodayAppointments } from "@/hooks/employees/useTodayAppointments";
import AppointmentCard from "@/components/appointments/AppointmentCard";


/**
* AppointmentsPage Component
* Displays all today's appointments using the reusable AppointmentCard component.
*/
export default function AppointmentsPage() {
    // Retrieve today's appointments
    const { appointments, loading } = useTodayAppointments();


    // Loading state
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


            {/* Appointment cards grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appt) => (
                    <AppointmentCard key={appt.id} appt={appt} />
                ))}
            </div>
        </div>
    );
}