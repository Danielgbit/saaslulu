// src/services/appointments.api.ts
import { supabaseClient } from "@/lib/supabaseClient";

/**
 * Guarda en services_completed todos los servicios pasados (incluyendo el base)
 * y actualiza el appointment.status='completed'.
 *
 * @param appointmentId - id de la cita
 * @param employeeId - id del empleado que completó
 * @param services - array de servicios completados (name, price, duration_minutes)
 */
export const completeAppointmentWithServices = async (
    appointmentId: string,
    employeeId: string | null,
    services: Array<{
        name: string;
        service_id?: string | null;
        price: number;
        duration_minutes?: number | null;
    }>
) => {
    try {
        // 1) Inserta todos los servicios en services_completed (batch insert)
        const inserts = services.map((s) => ({
            appointment_id: appointmentId,
            employee_id: employeeId,
            service_name: s.name,
            service_price: s.price,
            duration_minutes: s.duration_minutes ?? null,
            completed_at: new Date().toISOString(),
            notes: null,
        }));

        const { error: insertError } = await supabaseClient
            .from("services_completed")
            .insert(inserts);

        if (insertError) {
            console.error("Error inserting services_completed", insertError);
            return { success: false, error: insertError };
        }

        // 2) Marca la cita como completed
        const { error: updateError } = await supabaseClient
            .from("appointments")
            .update({ status: "completed" })
            .eq("id", appointmentId);

        if (updateError) {
            console.error("Error updating appointment status", updateError);
            return { success: false, error: updateError };
        }

        return { success: true };
    } catch (err) {
        console.error("Unexpected error completing appointment", err);
        return { success: false, error: err };
    }
};
