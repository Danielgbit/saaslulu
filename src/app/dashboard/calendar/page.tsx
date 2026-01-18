"use client"

import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"
import { Pencil, Trash2 } from "lucide-react"

type Employee = {
  id: string
  full_name: string
}

type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  extendedProps: {
    status?: string
    serviceName?: string
  }
}

type Props = {
  events: CalendarEvent[]
  employees: Employee[]
  selectedEmployeeId: string
  onEmployeeChange: (id: string) => void
  onEdit: (appointment: any) => void
  onDelete: (appointment: any) => void
}

export default function EmployeeCalendar({
  events,
  employees = [], // 🛡️ fallback extra
  selectedEmployeeId,
  onEmployeeChange,
  onEdit,
  onDelete,
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
          onChange={(e) =>
            onEmployeeChange(e.target.value)
          }
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

      {/* Calendario */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
        <FullCalendar
          locale={esLocale}
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
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          eventContent={(arg) => {
            const serviceName =
              arg.event.extendedProps?.serviceName

            return (
              <div className="group flex h-full flex-col justify-between px-2 py-1 text-[11px] text-white">
                {/* Info */}
                <div className="space-y-0.5">
                  <p className="font-semibold truncate">
                    {arg.event.title}
                  </p>

                  {serviceName && (
                    <p className="opacity-80 truncate">
                      {serviceName}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="text-[10px] opacity-70">
                    {arg.timeText}
                  </p>

                  <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                    {/* Edit */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit({
                          id: arg.event.id,
                          client_name: arg.event.title,
                          start: arg.event.start,
                          end: arg.event.end,
                          status:
                            arg.event.extendedProps?.status,
                        })
                      }}
                      className="rounded p-1 hover:bg-white/20"
                    >
                      <Pencil size={12} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete({
                          id: arg.event.id,
                          client_name: arg.event.title,
                        })
                      }}
                      className="rounded p-1 hover:bg-white/20 text-red-300"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
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
