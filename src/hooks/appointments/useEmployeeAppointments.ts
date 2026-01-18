import { fetchEmployeeAppointments } from "@/services/appointments/appointments.service"
import { useEffect, useState } from "react"

export function useEmployeeAppointments(
    employeeId: string,
    start: Date,
    end: Date
  ) {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if (!employeeId) return
  
      setLoading(true)
  
      fetchEmployeeAppointments(
        employeeId,
        start.toISOString(),
        end.toISOString()
      )
        .then(setEvents)
        .finally(() => setLoading(false))
    }, [employeeId, start, end])
  
    return { events, loading }
  }
  