export type Employee = {
    id: string
    full_name: string
  }
  
  export type CalendarEvent = {
    id: string
    title: string
    start: Date
    end: Date
    extendedProps?: {
      status?: string
      serviceName?: string
    }
  }
  
  export type CalendarEventActionPayload = {
    id: string
    client_name: string
    start?: Date | null
    end?: Date | null
    status?: string
  }
  