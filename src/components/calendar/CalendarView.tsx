"use client"

import FullCalendar from "@fullcalendar/react"
import { CALENDAR_CONFIG, CALENDAR_PLUGINS } from "./calendar.constants"
import { CalendarEvent } from "./calendar.types"
import { CalendarEventItem } from "./CalendarEventItem"

type Props = {
  events: CalendarEvent[]
  onEdit: (payload: any) => void
  onDelete: (payload: any) => void
}


export function CalendarView({
  events,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-2">
      <FullCalendar
        {...CALENDAR_CONFIG}
        plugins={CALENDAR_PLUGINS}
        events={events}
        eventContent={(arg) => (
          <CalendarEventItem
            event={arg.event}
            timeText={arg.timeText}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        dayHeaderClassNames="text-neutral-400 text-xs uppercase"
        slotLabelClassNames="text-neutral-500 text-xs"
        nowIndicatorClassNames="bg-emerald-500"
      />
    </div>
  )
}
