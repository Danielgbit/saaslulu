/**
 * Appointments Service
 * Handles all database queries related to appointments.
 */

import { supabaseClient } from "@/lib/supabaseClient";
import type { AppointmentRow } from "@/types/appointmentRow ";

export const getTodayAppointments = async (): Promise<AppointmentRow[]> => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabaseClient
        .from("appointments")
        .select(`
      id,
      client_name,
      client_phone,
      status,
      appointment_date,
      start_time,
      end_time,
      services (
        name,
        duration_minutes
      )
    `)
        .eq("appointment_date", today)
        .order("start_time", { ascending: true });

    if (error) {
        console.error("❌ Error loading today's appointments", error);
        return [];
    }

    return data as AppointmentRow[];
};
