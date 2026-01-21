"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

import type { EditableAppointment } from "@/types/appointments/editable-appointment"
import type { AppointmentFormProps } from "@/components/calendar/calendar.types"

export default function AppointmentFormModal({
  appointment,
  employees,
  services,
  onClose,
  onSave,
}: AppointmentFormProps) {
  const isOpen = Boolean(appointment)
  const isEdit = Boolean(appointment?.id)

  const [form, setForm] = useState<
    (EditableAppointment & { client_phone: string }) | null
  >(null)

  const [loading, setLoading] = useState(false)

  /* ================================
     Sync form when appointment changes
  ================================= */
  useEffect(() => {
    if (!appointment) {
      setForm(null)
      return
    }

    setForm({
      ...appointment,
      client_phone: "",
    })
  }, [appointment])

  /* ================================
     Guard: modal closed
  ================================= */
  if (!isOpen || !form) return null

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) =>
      prev ? { ...prev, [key]: value } : prev
    )
  }

  async function handleSave() {
    if (!isOpen || !form) return null
    const safeForm = form


    try {
      setLoading(true)
      await onSave(form)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-neutral-900 p-5">
        {/* ================= Header ================= */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {isEdit ? "Editar cita" : "Nueva cita"}
          </h3>

          <button onClick={onClose}>
            <X size={18} className="text-neutral-400" />
          </button>
        </div>

        {/* ================= Cliente ================= */}
        <div className="mb-3">
          <label className="block text-sm text-neutral-400">
            Nombre del cliente
          </label>
          <input
            value={form.client_name ?? ""}
            onChange={(e) =>
              updateField("client_name", e.target.value)
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          />
        </div>

        {/* ================= Teléfono ================= */}
        <div className="mb-3">
          <label className="block text-sm text-neutral-400">
            Teléfono *
          </label>
          <input
            value={form.client_phone}
            onChange={(e) =>
              updateField("client_phone", e.target.value)
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
            placeholder="Ej: 3001234567"
          />
        </div>

        {/* ================= Empleado ================= */}
        <div className="mb-3">
          <label className="block text-sm text-neutral-400">
            Empleado
          </label>
          <select
            value={form.employee_id ?? ""}
            onChange={(e) =>
              updateField(
                "employee_id",
                e.target.value || null
              )
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          >
            <option value="">Seleccionar empleado</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* ================= Servicio ================= */}
        <div className="mb-3">
          <label className="block text-sm text-neutral-400">
            Servicio
          </label>
          <select
            value={form.service_id ?? ""}
            onChange={(e) =>
              updateField(
                "service_id",
                e.target.value || null
              )
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          >
            <option value="">Seleccionar servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* ================= Fecha / Hora ================= */}
        <div className="mb-3">
          <label className="block text-sm text-neutral-400">
            Inicio
          </label>
          <input
            type="datetime-local"
            value={form.start_at.slice(0, 16)}
            onChange={(e) =>
              updateField(
                "start_at",
                new Date(e.target.value).toISOString()
              )
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          />
        </div>

        {/* ================= Estado ================= */}
        <div className="mb-6">
          <label className="block text-sm text-neutral-400">
            Estado
          </label>
          <select
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as EditableAppointment["status"]
              )
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
          >
            <option value="scheduled">Programada</option>
            <option value="confirmed">Confirmada</option>
            <option value="in-progress">En progreso</option>
            <option value="completed">Completada</option>
          </select>
        </div>

        {/* ================= Actions ================= */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-neutral-400"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isEdit ? "Guardar cambios" : "Crear cita"}
          </button>
        </div>
      </div>
    </div>
  )
}
