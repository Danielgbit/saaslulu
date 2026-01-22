// src/types/appointments/editable-appointment.ts
export type EditableAppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in-progress"
  | "completed"

export interface EditableAppointment {
  id: string
  client_name: string
  client_phone?: string
  status: EditableAppointmentStatus
  employee_id: string | null
  service_id: string | null
  start_at: string
  end_at: string
}
