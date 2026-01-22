"use client"

import FullCalendar from "@fullcalendar/react"
import { CALENDAR_CONFIG, CALENDAR_PLUGINS } from "./calendar.constants"
import { CalendarEventItem } from "./CalendarEventItem"
import type { CalendarEvent } from "../../types/calendar.types"

type Props = {
  events: CalendarEvent[]
  onEdit: (payload: any) => void
  onDelete: (payload: any) => void
  onCreate: (info: any) => void
}

export function CalendarView({
  events,
  onEdit,
  onDelete,
  onCreate,
}: Props) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
      <FullCalendar
        {...CALENDAR_CONFIG}
        plugins={CALENDAR_PLUGINS}
        events={events}
        selectable
        selectMirror
        select={(info) => onCreate(info)}
        eventContent={(arg) => (
          <CalendarEventItem
            event={arg.event}
            timeText={arg.timeText}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      />
    </div>
  )
}
