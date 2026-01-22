"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import EmployeeCalendar from "@/components/calendar/EmployeeCalendar"
import AppointmentFormModal from "@/components/calendar/AppointmentFormModal"

import { useEmployees } from "@/hooks/employees/useEmployees/useEmployees"
import { useAppointments } from "@/hooks/appointments/useAppointments"
import { useServices } from "@/hooks/services/useServices"

import type { CalendarEvent } from "@/types/calendar.types"
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
    services,
    loading: servicesLoading,
  } = useServices()

  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    create,
    update,
    remove,
  } = useAppointments(selectedEmployeeId, range, services)

  useEffect(() => {
    console.log("📅 appointments:", appointments)
  }, [appointments])
  

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
          client_phone: a.client_phone, // ✅ PROPAGADO
          serviceName: a.services?.[0]?.name ?? "Servicio",
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
      client_phone: event.extendedProps.client_phone ?? "",
      status: event.extendedProps.status,
      employee_id: event.extendedProps.employee_id,
      service_id: event.extendedProps.service_id,
      start_at: event.start.toISOString(),
      end_at: event.end.toISOString(),
    })
  }

  const handleCreate = (info: any) => {
    if (!selectedEmployeeId) {
      toast.warning("Selecciona un empleado primero")
      return
    }

    setEditingAppointment({
      id: "",
      client_name: "",
      client_phone: "",
      status: "scheduled",
      employee_id: selectedEmployeeId,
      service_id: null,
      start_at: info.start.toISOString(),
      end_at: info.end.toISOString(),
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
        onCreate={handleCreate}
      />

      <AppointmentFormModal
        appointment={editingAppointment}
        employees={employees}
        services={services}
        onClose={() => setEditingAppointment(null)}
        onSave={async (data) => {
          try {
            if (data.id) {
              await update(data)
              toast.success("Cita actualizada correctamente")
            } else {
              await create(data)
              toast.success("Cita creada correctamente")
            }

            setEditingAppointment(null)
          } catch (err) {
            console.error("❌ Error guardando cita:", err)
            toast.error("No se pudo guardar la cita")
          }
        }}
      />
    </>
  )
}
