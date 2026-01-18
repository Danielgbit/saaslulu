"use client"

import { useState } from "react"
import EmployeeCalendar from "@/components/calendar/EmployeeCalendar"
import { useEmployeeAppointments } from "@/hooks/appointments/useEmployeeAppointments"
import { useEmployees } from "@/hooks/employees/useEmployees"

export default function CalendarPage() {
  const [employeeId, setEmployeeId] = useState("")

  // 🔒 Rango ESTABLE (no cambia en cada render)
  const [range] = useState(() => {
    const start = new Date()
    const end = new Date()
    end.setDate(start.getDate() + 7)

    return { start, end }
  })

  const { employees, loading: loadingEmployees } = useEmployees()

  const { events, loading } = useEmployeeAppointments(
    employeeId,
    range.start,
    range.end
  )

  if (loadingEmployees) {
    return <p className="text-neutral-400">Cargando empleados...</p>
  }

  return (
    <div className="space-y-4">
      <EmployeeCalendar
        employees={employees}
        selectedEmployeeId={employeeId}
        onEmployeeChange={setEmployeeId}
        events={employeeId ? events : []}
      />

      {!employeeId && (
        <p className="text-sm text-neutral-400">
          Selecciona un empleado para ver su agenda.
        </p>
      )}

      {employeeId && loading && (
        <p className="text-sm text-neutral-400">
          Cargando agenda...
        </p>
      )}

      {employeeId && !loading && events.length === 0 && (
        <p className="text-sm text-neutral-400">
          Este empleado no tiene citas en esta semana.
        </p>
      )}
    </div>
  )
}
