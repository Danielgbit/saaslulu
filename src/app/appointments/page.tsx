// File: app/appointments/page.tsx
// Description: Appointments page with automatic completion modal.
// All comments are written in English.

"use client";

import { useTodayAppointments } from "@/hooks/employees/useTodayAppointments";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import ConfirmationModal from "@/components/appointments/ConfirmationModal";

/**
 * AppointmentsPage Component
 * Displays today's appointments and triggers a modal when an appointment
 * automatically switches to "completed".
 */
export default function AppointmentsPage() {
    // Retrieve appointments, loading state and completion detection
    const { appointments, loading, justCompleted, setJustCompleted } =
        useTodayAppointments();

    // Show loading state
    if (loading) {
        return (
            <div className="p-8">
                <p className="text-gray-500 animate-pulse text-lg">Cargando...</p>
            </div>
        );
    }

    /** Handler: Close modal */
    const handleCloseModal = () => {
        setJustCompleted(null);
    };

    /** Handler: Confirm completion */
    const handleConfirmCompletion = () => {
        // TODO: You can add logic here (ex: send confirmation to database)
        setJustCompleted(null);
    };

    /** Handler: Add extra service */
    const handleAddExtraService = () => {
        // TODO: redirect or open another modal
        setJustCompleted(null);
    };

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

            {/* Fullscreen confirmation modal */}
            <ConfirmationModal
                appointment={justCompleted}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCompletion}
                onAddExtraService={handleAddExtraService}
            />
        </div>
    );
}
