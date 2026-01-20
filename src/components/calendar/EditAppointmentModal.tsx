"use client"

import { X } from "lucide-react"
import { useState } from "react"

import type { EditableAppointment } from "@/types/appointments/editable-appointment"
import type { Employee } from "@/components/calendar/calendar.types"
import type { Service } from "@/types/services"

type Props = {
  appointment: EditableAppointment | null
  employees: Employee[]
  services: Service[]
  onClose: () => void
  onSave: (data: EditableAppointment) => Promise<void>
}

export default function EditAppointmentModal({
  appointment,
  employees,
  services,
  onClose,
  onSave,
}: Props) {
  if (!appointment) return null

  const [form, setForm] = useState<EditableAppointment>({
    ...appointment,
  })

  const [loading, setLoading] = useState(false)

  function updateField<K extends keyof EditableAppointment>(
    key: K,
    value: EditableAppointment[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
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
            Editar cita
          </h3>

          <button onClick={onClose}>
            <X size={18} className="text-neutral-400" />
          </button>
        </div>

        {/* ================= Cliente ================= */}
        <div className="mb-3">
          <label className="block text-sm text-neutral-400">
            Cliente
          </label>
          <input
            value={form.client_name}
            onChange={(e) =>
              updateField("client_name", e.target.value)
            }
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
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
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
