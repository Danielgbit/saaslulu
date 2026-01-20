"use client"

import { Pencil, Trash2 } from "lucide-react"
import { CalendarEventActionPayload } from "./calendar.types"

type Props = {
  event: any
  timeText: string
  onEdit: (payload: CalendarEventActionPayload) => void
  onDelete: (payload: CalendarEventActionPayload) => void
}

export function CalendarEventItem({
  event,
  timeText,
  onEdit,
  onDelete,
}: Props) {
  const serviceName = event.extendedProps?.serviceName

  return (
    <div className="group flex h-full flex-col justify-between px-2 py-1 text-[11px] text-white">
      <div className="space-y-0.5">
        <p className="font-semibold truncate">
          {event.title}
        </p>

        {serviceName && (
          <p className="opacity-80 truncate">
            {serviceName}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[10px] opacity-70">
          {timeText}
        </p>

        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit({
                id: event.id,
                client_name: event.title,
                start: event.start,
                end: event.end,
                status: event.extendedProps?.status,
              })
            }}
            className="rounded p-1 hover:bg-white/20"
          >
            <Pencil size={12} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete({
                id: event.id,
                client_name: event.title,
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
}
