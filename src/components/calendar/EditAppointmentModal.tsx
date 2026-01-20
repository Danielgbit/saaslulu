"use client"

import { X } from "lucide-react"
import { useState } from "react"
import type { EditableAppointment } from "@/types/appointments/editable-appointment"

type Props = {
  appointment: EditableAppointment | null
  onClose: () => void
  onSave: (data: EditableAppointment) => Promise<void>
}

export default function EditAppointmentModal({
  appointment,
  onClose,
  onSave,
}: Props) {
  if (!appointment) return null

  const [clientName, setClientName] = useState(
    appointment.client_name ?? ""
  )
  const [status, setStatus] = useState(appointment.status)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    if (!appointment) return
    try {
      setLoading(true)

      await onSave({
        id: appointment.id,
        client_name: clientName,
        status,
      })

      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-neutral-900 p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Editar cita
          </h3>

          <button onClick={onClose}>
            <X size={18} className="text-neutral-400" />
          </button>
        </div>

        {/* Cliente */}
        <div className="mb-4">
          <label className="block text-sm text-neutral-400">
            Cliente
          </label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white"
          />
        </div>

        {/* Estado */}
        <div className="mb-6">
          <label className="block text-sm text-neutral-400">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as EditableAppointment["status"])
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white"
          >
            <option value="scheduled">Programada</option>
            <option value="confirmed">Confirmada</option>
            <option value="in-progress">En progreso</option>
            <option value="completed">Completada</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm text-neutral-400"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
