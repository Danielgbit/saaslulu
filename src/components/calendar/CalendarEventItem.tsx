"use client"

import { Pencil, Trash2 } from "lucide-react"
import type { EventApi } from "@fullcalendar/core"

type Props = {
  event: EventApi
  timeText: string
  onEdit: (event: EventApi) => void
  onDelete: (event: EventApi) => void
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
      {/* Info */}
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

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] opacity-70">
          {timeText}
        </p>

        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
          {/* EDIT */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(event) // ✅ EventApi real
            }}
            className="rounded p-1 hover:bg-white/20"
          >
            <Pencil size={12} />
          </button>

          {/* DELETE */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(event) // ✅ EventApi real
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
