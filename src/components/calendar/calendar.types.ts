import type { EditableAppointment } from "@/types/appointments/editable-appointment"
import type { Service } from "@/types/services"

export type Employee = {
  id: string
  full_name: string
}

export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  extendedProps?: {
    status?: string
    serviceName?: string
  }
}

export type CalendarEventActionPayload = {
  id: string
  client_name: string
  start?: Date | null
  end?: Date | null
  status?: string
}

export type CalendarViewProps = {
  events: CalendarEvent[]
  onEdit: (payload: any) => void
  onDelete: (payload: any) => void
  onCreate?: (info: any) => void
}


export type AppointmentFormProps = {
  appointment: EditableAppointment | null
  employees: Employee[]
  services: Service[]
  onClose: () => void
  onSave: (data: EditableAppointment & { client_phone: string }) => Promise<void>
}