"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import EmployeeCalendar from "@/components/calendar/EmployeeCalendar"
import EditAppointmentModal from "@/components/calendar/EditAppointmentModal"

import { useEmployees } from "@/hooks/employees/useEmployees/useEmployees"
import { useAppointments } from "@/hooks/appointments/useAppointments"

import type { CalendarEvent } from "@/components/calendar/calendar.types"
import type { EditableAppointment } from "@/types/appointments/editable-appointment"

/* ================================
   Helpers
================================= */
function getWeekRange() {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay() + 1)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(start.getDate() + 7)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

export default function CalendarPage() {
  /* ================================
     State
  ================================= */
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [editingAppointment, setEditingAppointment] =
    useState<EditableAppointment | null>(null)

  const range = useMemo(() => getWeekRange(), [])

  /* ================================
     Data
  ================================= */
  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useEmployees()

  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    update,
    remove,
  } = useAppointments(selectedEmployeeId, range)

  /* ================================
     Transform → FullCalendar
  ================================= */
  const events: CalendarEvent[] = useMemo(
    () =>
      appointments.map((a) => ({
        id: a.id,
        title: a.client_name ?? "Sin nombre",
        start: new Date(a.start_at),
        end: new Date(a.end_at),
        extendedProps: {
          status: a.status,
          serviceName: a.services?.[0]?.name,
        },
      })),
    [appointments]
  )

  /* ================================
     Handlers
  ================================= */
  const handleDelete = (appointment: any) => {
    toast.warning("¿Eliminar esta cita?", {
      description: "Esta acción no se puede deshacer",
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            await remove(appointment.id)
            toast.success("Cita eliminada correctamente")
          } catch {
            toast.error("No se pudo eliminar la cita")
          }
        },
      },
    })
  }

  const handleEdit = (event: any) => {
    setEditingAppointment({
      id: event.id,
      client_name: event.title,
      status: event.extendedProps.status,
    })
  }

  /* ================================
     UI States
  ================================= */
  if (employeesLoading) {
    return (
      <div className="p-6 text-sm text-neutral-400">
        Cargando empleados...
      </div>
    )
  }

  if (employeesError) {
    return (
      <div className="p-6 text-sm text-red-400">
        {employeesError}
      </div>
    )
  }


  if (appointmentsLoading) {
    return (
      <div className="p-6 text-sm text-neutral-400">
        Cargando citas...
      </div>
    )
  }

  if (appointmentsError) {
    return (
      <div className="p-6 text-sm text-red-400">
        {appointmentsError}
      </div>
    )
  }

  /* ================================
     Render
  ================================= */
  return (
    <>
      <EmployeeCalendar
        events={events}
        employees={employees}
        selectedEmployeeId={selectedEmployeeId}
        onEmployeeChange={setSelectedEmployeeId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditAppointmentModal
        appointment={editingAppointment}
        onClose={() => setEditingAppointment(null)}
        onSave={async (data) => {
          await update(data)
          toast.success("Cita actualizada correctamente")
        }}
      />
    </>
  )
}
