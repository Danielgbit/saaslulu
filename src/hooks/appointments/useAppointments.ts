import { useEffect, useState } from "react"
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "@/services/appointments/appointments.service"

type DateRange = {
  start: Date
  end: Date
}

export function useAppointments(
  employeeId: string,
  range?: DateRange
) {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* =========================
     FETCH
     ========================= */
  useEffect(() => {
    if (!employeeId || !range?.start || !range?.end) {
      setAppointments([]) // 🧹 limpiar estado
      return
    }

    let cancelled = false

    async function fetchAppointments() {
      try {
        setLoading(true)
        setError(null)

        const data = await getAppointments({
          employeeId,
          start: range?.start.toISOString(),
          end: range?.end.toISOString(),
        })

        if (!cancelled) {
          setAppointments(data)
        }
      } catch (err) {
        if (!cancelled) {
          console.error("❌ Error loading appointments:", err)
          setError("No se pudieron cargar las citas")
          setAppointments([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchAppointments()

    return () => {
      cancelled = true
    }
  }, [employeeId, range?.start, range?.end])

  /* =========================
     CREATE
     ========================= */
  async function create(data: any) {
    const created = await createAppointment(data)

    setAppointments((prev) => [...prev, created])

    return created
  }

  /* =========================
     UPDATE (🔥 FIX IMPORTANTE)
     ========================= */
  async function update(data: any) {
    const updated = await updateAppointment(data)

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === updated.id
          ? {
              ...a,              // 🔒 mantenemos datos previos
              ...updated,        // 🆕 nuevos campos
              services:
                updated.services ??
                a.services ??
                [],               // ✅ NO perder servicio
            }
          : a
      )
    )

    return updated
  }

  /* =========================
     DELETE
     ========================= */
  async function remove(id: string) {
    await deleteAppointment(id)

    setAppointments((prev) =>
      prev.filter((a) => a.id !== id)
    )
  }

  return {
    appointments,
    loading,
    error,
    create,
    update,
    remove,
  }
}
