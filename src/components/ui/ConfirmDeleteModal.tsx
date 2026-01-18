"use client"

import { Trash2, X } from "lucide-react"

type Props = {
  open: boolean
  title?: string
  description?: string
  onCancel: () => void
  onConfirm: () => Promise<void>
}

export default function ConfirmDeleteModal({
  open,
  title = "Eliminar cita",
  description = "Esta acción no se puede deshacer.",
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-neutral-900 p-5 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-400">
            <Trash2 size={18} />
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
          </div>

          <button
            onClick={onCancel}
            className="rounded p-1 hover:bg-white/10"
          >
            <X size={18} className="text-neutral-400" />
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-neutral-400">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
