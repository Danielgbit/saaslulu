"use client"

import { useMemo, useState, useEffect } from "react"
import { toast } from "sonner"

import EmployeeCalendar from "@/components/calendar/EmployeeCalendar"
import EditAppointmentModal from "@/components/calendar/EditAppointmentModal"

import { useEmployees } from "@/hooks/employees/useEmployees/useEmployees"
import { useAppointments } from "@/hooks/appointments/useAppointments"
import { useServices } from "@/hooks/services/useServices"

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

  const {
    services,
    loading: servicesLoading,
  } = useServices()

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
          employee_id: a.employee_id,
          service_id: a.service_id,
          // 🔥 CLAVE: relación 1 cita → 1 servicio
          serviceName: a.service?.name ?? "Servicio",
        },
      })),
    [appointments]
  )

  /* ================================
     Handlers
  ================================= */
  const handleDelete = (appointment: { id: string }) => {
    toast.warning("¿Eliminar esta cita?", {
      description: "Esta acción no se puede deshacer",
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            await remove(appointment.id)
            toast.success("Cita eliminada correctamente")
          } catch (err) {
            console.error("❌ Error eliminando cita:", err)
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
      employee_id: event.extendedProps.employee_id,
      service_id: event.extendedProps.service_id,
      start_at: event.start.toISOString(),
      end_at: event.end.toISOString(),
    })
  }

  /* ================================
     UI States
  ================================= */
  if (employeesLoading || appointmentsLoading || servicesLoading) {
    return (
      <div className="p-6 text-sm text-neutral-400">
        Cargando datos...
      </div>
    )
  }

  if (employeesError || appointmentsError) {
    return (
      <div className="p-6 text-sm text-red-400">
        {employeesError || appointmentsError}
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
        employees={employees}
        services={services}
        onClose={() => setEditingAppointment(null)}
        onSave={async (data) => {
          try {
            await update(data)
            toast.success("Cita actualizada correctamente")
            setEditingAppointment(null)
          } catch (err) {
            console.error("❌ Error actualizando cita:", err)
            toast.error("No se pudo actualizar la cita")
          }
        }}
      />
    </>
  )
}
