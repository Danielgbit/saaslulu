"use client"

import { Employee } from "./calendar.types"

type Props = {
  employees: Employee[]
  selectedEmployeeId: string
  onEmployeeChange: (id: string) => void
}

export function CalendarHeader({
  employees,
  selectedEmployeeId,
  onEmployeeChange,
}: Props) {
  const selectedEmployee = employees.find(
    (e) => e.id === selectedEmployeeId
  )

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white">
          📅 Agenda
        </h2>

        {selectedEmployee && (
          <p className="text-sm text-neutral-400">
            {selectedEmployee.full_name}
          </p>
        )}
      </div>

      <select
        value={selectedEmployeeId}
        onChange={(e) => onEmployeeChange(e.target.value)}
        className="w-full md:w-64 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
      >
        <option value="">Seleccionar empleado</option>

        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.full_name}
          </option>
        ))}
      </select>
    </div>
  )
}
