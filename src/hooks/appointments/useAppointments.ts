import { useEffect, useState } from "react"
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "@/services/appointments/appointments.service"
import type { Service } from "@/types/services"

type DateRange = {
  start: Date
  end: Date
}

export function useAppointments(
  employeeId: string,
  range?: DateRange,
  services?: Service[] // 👈 IMPORTANTE
) {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* =========================
     FETCH
     ========================= */
  useEffect(() => {
    if (!employeeId || !range?.start || !range?.end) {
      setAppointments([])
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
          console.error("❌ Error loading appointments", err)
          setError("No se pudieron cargar las citas")
          setAppointments([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAppointments()
    return () => {
      cancelled = true
    }
  }, [employeeId, range?.start, range?.end])

  /* =========================
     UPDATE (🔥 FIX AQUÍ)
     ========================= */
  async function update(data: any) {
    const updated = await updateAppointment(data)

    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id !== updated.id) return a

        const service =
          services?.find((s) => s.id === updated.service_id) ?? null

        return {
          ...updated,
          // 🔥 REHIDRATAR RELACIÓN
          services: service ? [service] : a.services,
        }
      })
    )

    return updated
  }

  /* =========================
     CREATE
     ========================= */
  async function create(data: any) {
    const created = await createAppointment(data)
    setAppointments((prev) => [...prev, created])
    return created
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
