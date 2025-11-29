import { supabaseClient } from "@/lib/supabaseClient";
import type { AppointmentRow } from "@/types/appointmentRow ";

export const getTodayAppointments = async (): Promise<AppointmentRow[]> => {
  // Create start and end of day in UTC
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  const startOfDayUTC = `${year}-${month}-${day}T00:00:00+00:00`;
  const endOfDayUTC = `${year}-${month}-${day}T23:59:59+00:00`;

  const { data, error } = await supabaseClient
    .from("appointments")
    .select(
      `
      id,
      client_name,
      client_phone,
      status,
      start_at,
      end_at,
      services (
        name,
        duration_minutes
      )
    `
    )
    .gte("start_at", startOfDayUTC)
    .lte("start_at", endOfDayUTC)
    .order("start_at", { ascending: true });

  if (error) {
    console.error("❌ Error loading today's appointments", error);
    return [];
  }

  return data as AppointmentRow[];
};
