import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"

export const CALENDAR_PLUGINS = [
  timeGridPlugin,
  interactionPlugin,
]

export const CALENDAR_CONFIG = {
  locale: esLocale,
  initialView: "timeGridWeek",
  firstDay: 1,
  nowIndicator: true,
  allDaySlot: false,
  height: "auto",
  slotMinTime: "08:00:00",
  slotMaxTime: "20:00:00",
  slotDuration: "00:30:00",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "",
  },
}
