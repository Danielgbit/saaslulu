// src/validators/appointment.schema.ts
import { z } from "zod"

/* ================================
   Helpers
================================ */
const isValidDate = (value: string) => {
  const date = new Date(value)
  return !isNaN(date.getTime())
}

export const appointmentSchema = z
  .object({
    id: z.string(),

    client_name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres"),

    client_phone: z
      .string()
      .min(7, "Teléfono muy corto")
      .regex(/^[0-9+\s()-]+$/, "Formato de teléfono inválido"),

    employee_id: z.string().nullable(),

    service_id: z.string().nullable(),

    start_at: z
      .string()
      .refine(isValidDate, "Fecha de inicio inválida"),

    end_at: z
      .string()
      .refine(isValidDate, "Fecha de fin inválida"),

    status: z.enum([
      "scheduled",
      "confirmed",
      "in-progress",
      "completed",
    ]),
  })
  .refine(
    (data) =>
      new Date(data.end_at).getTime() >
      new Date(data.start_at).getTime(),
    {
      path: ["end_at"],
      message: "La hora de fin debe ser posterior al inicio",
    }
  )

export type AppointmentFormSchema = z.infer<
  typeof appointmentSchema
>
