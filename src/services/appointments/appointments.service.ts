import { supabaseClient } from "@/lib/supabaseClient";
import type { Appointment } from "@/types/appointments/appointments";

export const getTodayAppointments = async (): Promise<Appointment[]> => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");

  const start = `${y}-${m}-${d}T00:00:00+00:00`;
  const end = `${y}-${m}-${d}T23:59:59+00:00`;

  const { data, error } = await supabaseClient
    .from("appointments")
    .select(`
      id,
      client_name,
      client_phone,
      status,
      start_at,
      end_at,
      service_id,
      employee_id,

      services (
        id,
        name,
        price,
        duration_minutes,
        description,
        created_at
      ),

      services_completed:services_completed (
        id,
        service_name,
        service_price,
        duration_minutes,
        completed_at,
        notes
      )
    `)
    .gte("start_at", start)
    .lte("start_at", end)
    .order("start_at", { ascending: true });

  if (error) {
    console.error("❌ Supabase error:", JSON.stringify(error, null, 2));
    return [];
  }

  if (!data) return [];

  // -------------------------------------------------------
  // ✨ Normalizar para evitar undefined y forzar los tipos
  // -------------------------------------------------------
  return data.map((appt: any) => ({
    ...appt,
    services: Array.isArray(appt.services) ? appt.services : [],

    // Muy importante: normalizar services_completed
    services_completed: Array.isArray(appt.services_completed)
      ? appt.services_completed
      : [],
  })) as Appointment[];
};


// Service: initiates the confirmation process for tomorrow's appointments
export const startConfirmationProcess = async () => {
  const res = await fetch(`/api/confirmations/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText);
  }

  return res.json();
};



// Service: gets tomorrow's appointments (with employee name)
export async function getTomorrowAppointments() {
  const now = new Date();

  // Start of tomorrow (00:00)
  const start = new Date(now);
  start.setDate(now.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  // End of tomorrow (23:59:59.999)
  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabaseClient
    .from("appointments")
    .select(`
      *,
      employee:employee_id (
        id,
        full_name
      )
    `)
    .gte("start_at", start.toISOString())
    .lte("start_at", end.toISOString())
    .in("status", ["scheduled", "confirmed"]);

  if (error) throw new Error(error.message);

  return {
    appointments: data ?? [],
    count: data?.length ?? 0
  };
}

