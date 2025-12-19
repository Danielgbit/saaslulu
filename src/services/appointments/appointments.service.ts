import { supabaseClient } from "@/lib/supabaseClient";
import type { Appointment } from "@/types/appointments";

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


export const getTomorrowAppointments = async () => {
  const now = new Date();

  const tomorrowStart = new Date(now);
  tomorrowStart.setDate(now.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(now);
  tomorrowEnd.setDate(now.getDate() + 1);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const { data, error } = await supabaseClient
    .from("appointments")
    .select("*")
    .gte("start_at", tomorrowStart.toISOString())
    .lte("start_at", tomorrowEnd.toISOString())
    .is("confirmed", null);

  if (error) {
    throw new Error(error.message);
  }

  return {
    appointments: data ?? [],
    count: data?.length ?? 0
  };
};



// Service: initiates the confirmation process for tomorrow's appointments
export const startConfirmationProcess = async () => {
  const res = await fetch(`/api/appointments/start-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to confirm appointments: ${errText}`);
  }

  return res.json();
};