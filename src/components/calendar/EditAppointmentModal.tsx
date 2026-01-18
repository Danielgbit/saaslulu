"use client"

import { X } from "lucide-react"
import { useState } from "react"

type Appointment = {
  id: string
  client_name: string
  start: string
  end: string
  status: string
}

type Props = {
  appointment: Appointment | null
  onClose: () => void
  onSave: (data: Partial<Appointment>) => Promise<void>
}

export default function EditAppointmentModal({
  appointment,
  onClose,
  onSave,
}: Props) {
  if (!appointment) return null

  const [clientName, setClientName] = useState(
    appointment.client_name
  )
  const [status, setStatus] = useState(appointment.status)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await onSave({
      id: appointment?.id,
      client_name: clientName,
      status,
    })
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-neutral-900 p-5 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Editar cita
          </h3>

          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-white/10"
          >
            <X size={18} className="text-neutral-400" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-400">
              Cliente
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-400">
              Estado
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
            >
              <option value="scheduled">Programada</option>
              <option value="confirmed">Confirmada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
