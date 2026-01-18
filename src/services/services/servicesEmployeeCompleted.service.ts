/**
 * Service Layer for handling CRUD operations related to
 * "services_completed" in Supabase.
 *
 * This isolates DB logic from UI and hooks.
 */

import { supabaseClient } from "@/lib/supabase-client";

// -----------------------------
// Types
// -----------------------------

export interface CompletedServicePayload {
    employee_id: string;
    appointment_id: string;
    service_name: string;
    service_price: number;
    duration_minutes: number;
    notes?: string | null;
}

export interface CompletedServiceRecord extends CompletedServicePayload {
    id: string;
    completed_at: string;
}

// -----------------------------
// Create: Save completed service
// -----------------------------

/**
 * Inserts a completed service record into Supabase.
 */
export async function saveCompletedService(
    payload: CompletedServicePayload
): Promise<CompletedServiceRecord> {
    const { data, error } = await supabaseClient
        .from("services_completed")
        .insert(payload)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data as CompletedServiceRecord;
}

// -----------------------------
// Read: Get completed services by employee
// -----------------------------

/**
 * Fetch all completed services for a specific employee.
 */
export async function getServicesCompletedByEmployee(
    employeeId: string
): Promise<CompletedServiceRecord[]> {
    const { data, error } = await supabaseClient
        .from("services_completed")
        .select("*")
        .eq("employee_id", employeeId)
        .order("completed_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []) as CompletedServiceRecord[];
}

// -----------------------------
// Read: Get completed services by appointment
// -----------------------------

/**
 * Fetch all completed services tied to a given appointment.
 */
export async function getServicesCompletedByAppointment(
    appointmentId: string
): Promise<CompletedServiceRecord[]> {
    const { data, error } = await supabaseClient
        .from("services_completed")
        .select("*")
        .eq("appointment_id", appointmentId)
        .order("completed_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []) as CompletedServiceRecord[];
}

// -----------------------------
// (Optional) Delete a completed service
// -----------------------------

/**
 * Deletes a completed service record.
 */
export async function deleteCompletedService(id: string): Promise<boolean> {
    const { error } = await supabaseClient
        .from("services_completed")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);

    return true;
}
