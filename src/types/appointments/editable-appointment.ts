import { Appointment } from "./appointments";

// types/appointments/editable-appointment.ts
export type EditableAppointment = Pick<
  Appointment,
  "id" | "client_name" | "status"
>
