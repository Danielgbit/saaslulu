import { supabaseClient } from "@/lib/supabase-client";
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



// Service: gets tomorrow's appointments (pending confirmation only)
export async function getTomorrowAppointments() {
  const now = new Date();

  // mañana en UTC (00:00)
  const start = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));

  // mañana en UTC (23:59:59.999)
  const end = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    23, 59, 59, 999
  ));

  const { data, error } = await supabaseClient
    .from("appointments")
    .select(`
      *,
      employee:employee_id (
        id,
        full_name
      ),
      service:service_id (
        id,
        name
      )
    `)
    .gte("start_at", start.toISOString())
    .lte("start_at", end.toISOString())
    .eq("status", "scheduled"); // 🔥 SOLO PENDIENTES

  if (error) throw new Error(error.message);

  return {
    appointments: data ?? [],
    count: data?.length ?? 0
  };
}


// Service: fetches appointments for a specific employee
export async function fetchEmployeeAppointments(
  employeeId: string,
  start: string,
  end: string
) {
  const res = await fetch(
    `/api/appointments?employeeId=${employeeId}&start=${start}&end=${end}`
  )

  if (!res.ok) {
    const error = await res.text()
    console.error("API error:", error)
    throw new Error("Error fetching appointments")
  }

  const data = await res.json()

  return data.map((a: any) => ({
    id: a.id,
    title: a.client_name,
    start: a.start_at,
    end: a.end_at,
    backgroundColor:
      a.status === "cancelled" ? "#ef4444" : "#22c55e",
    extendedProps: {
      serviceName: a.services?.name ?? "Servicio",
      status: a.status,
      employeeId: a.employee_id,
    },
  }))
}

/* =========================
   GET
========================= */
export async function getAppointments(params: {
  employeeId: string
  start?: string
  end?: string
}) {
  const query = new URLSearchParams(params as any).toString()

  const res = await fetch(`/api/appointments?${query}`)
  if (!res.ok) throw new Error("Error fetching appointments")

  return res.json()
}


/* =========================
   CREATE
========================= */
export async function createAppointment(data: any) {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Error creating appointment")
  return res.json()
}

/* =========================
   UPDATE
========================= */
export async function updateAppointment(data: any) {
  const res = await fetch("/api/appointments", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Error updating appointment")
  return res.json()
}

/* =========================
   DELETE
========================= */
export async function deleteAppointment(id: string) {
  const res = await fetch(`/api/appointments?id=${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Error deleting appointment")
  return res.json()
}
