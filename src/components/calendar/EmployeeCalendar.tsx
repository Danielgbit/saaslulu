"use client"

import { Employee, CalendarEvent } from "../../types/calendar.types"
import { CalendarHeader } from "./CalendarHeader"
import { CalendarView } from "./CalendarView"

type Props = {
  events: CalendarEvent[]
  employees: Employee[]
  selectedEmployeeId: string
  onEmployeeChange: (id: string) => void
  onEdit: (appointment: any) => void
  onDelete: (appointment: any) => void
  onCreate: (info: any) => void

  // 🆕 estados de data (opcional, por ahora no usados)
  loading?: boolean
  error?: string | null
}

export default function EmployeeCalendar({
  events,
  employees = [],
  selectedEmployeeId,
  onEmployeeChange,
  onEdit,
  onDelete,
  onCreate,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      <CalendarHeader
        employees={employees}
        selectedEmployeeId={selectedEmployeeId}
        onEmployeeChange={onEmployeeChange}
      />

      <CalendarView
        events={events}
        onEdit={onEdit}
        onDelete={onDelete}
        onCreate={onCreate}
      />
    </div>
  )
}
