"use client"

import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"

type Employee = {
  id: string
  full_name: string
}

type Props = {
  events: any[]
  employees: Employee[]
  selectedEmployeeId: string
  onEmployeeChange: (id: string) => void
}

export default function EmployeeCalendar({
  events,
  employees,
  selectedEmployeeId,
  onEmployeeChange,
}: Props) {
  const selectedEmployee = employees.find(
    (e) => e.id === selectedEmployeeId
  )

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      {/* Header */}
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

        {/* Select empleado */}
        <select
          value={selectedEmployeeId}
          onChange={(e) => onEmployeeChange(e.target.value)}
          className="w-full md:w-64 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-500"
        >
          <option value="">Seleccionar empleado</option>

          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Calendario */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
        <FullCalendar
          locale={esLocale}
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          firstDay={1}
          nowIndicator
          allDaySlot={false}
          height="auto"

          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          slotDuration="00:30:00"

          events={events}

          eventClassNames={() => [
            "rounded-xl",
            "border",
            "border-black/20",
            "shadow-lg",
            "overflow-hidden",
            "transition",
            "hover:brightness-110",
          ]}

          eventDidMount={(info) => {
            const status = info.event.extendedProps.status

            const bg =
              status === "cancelled"
                ? "#7f1d1d"
                : status === "confirmed"
                  ? "#065f46"
                  : "#1e40af"

            info.el.style.backgroundColor = bg
          }}

          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}

          eventContent={(arg) => {
            const serviceName =
              arg.event.extendedProps?.serviceName

            return (
              <div className="flex h-full flex-col justify-between px-2 py-1 text-[11px] text-white">
                <div className="space-y-0.5">
                  <p className="font-semibold leading-tight truncate">
                    {arg.event.title}
                  </p>

                  {serviceName && (
                    <p className="opacity-80 truncate">
                      {serviceName}
                    </p>
                  )}
                </div>

                <p className="text-[10px] opacity-70">
                  {arg.timeText}
                </p>
              </div>
            )
          }}

          dayHeaderClassNames="text-neutral-400 text-xs uppercase"
          slotLabelClassNames="text-neutral-500 text-xs"
          nowIndicatorClassNames="bg-emerald-500"
        />
      </div>
    </div>
  )
}
