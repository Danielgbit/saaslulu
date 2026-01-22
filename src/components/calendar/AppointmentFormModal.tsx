"use client"

import { X, CalendarDays, User, Phone, Info, Check } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  appointmentSchema,
  AppointmentFormSchema,
} from "@/validators/appointment.schema"

import type { AppointmentFormProps } from "@/types/calendar.types"

/* ================================
   Utils
================================ */
function toDatetimeLocal(value: string) {
  const date = new Date(value)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60 * 1000)
  return local.toISOString().slice(0, 16)
}

export default function AppointmentFormModal({
  appointment,
  employees,
  services,
  onClose,
  onSave,
}: AppointmentFormProps) {
  const isOpen = Boolean(appointment)
  const isEdit = Boolean(appointment?.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      dirtyFields, // 🔥 CLAVE
    },
  } = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentSchema),
  })

  /* ================================
     Sync form (EDIT / CREATE)
  ================================ */
  useEffect(() => {
    if (!appointment) return

    reset(
      {
        ...appointment,
        client_phone: appointment.client_phone ?? "",
        start_at: toDatetimeLocal(appointment.start_at),
        end_at: appointment.end_at
          ? toDatetimeLocal(appointment.end_at)
          : undefined,
      },
      { keepDirty: false }
    )
  }, [appointment, reset])

  if (!isOpen) return null

  async function onSubmit(data: AppointmentFormSchema) {
    if (isEdit && !isDirty) {
      toast.info("No hiciste ningún cambio", {
        description:
          "Modifica al menos un campo para poder guardar.",
      })
      return
    }

    await onSave(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
        {/* ================= Header ================= */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-800 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <CalendarDays size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                {isEdit ? "Editar cita" : "Nueva cita"}
              </h3>
              <p className="text-sm text-neutral-400">
                {isEdit
                  ? "Actualiza la información de la cita"
                  : "Registra una nueva cita en la agenda"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= Body ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-6 py-6"
        >
          {/* ================= Cliente ================= */}
          <Section title="Cliente" description="Información del cliente">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="Nombre"
                icon={<User size={14} />}
                error={errors.client_name?.message}
                dirty={!!dirtyFields.client_name}
              >
                <input
                  {...register("client_name")}
                  placeholder="Juan Pérez"
                  className={input(dirtyFields.client_name)}
                />
              </Field>

              <Field
                label="Teléfono"
                icon={<Phone size={14} />}
                error={errors.client_phone?.message}
                dirty={!!dirtyFields.client_phone}
              >
                <input
                  {...register("client_phone")}
                  placeholder="300 123 4567"
                  className={input(dirtyFields.client_phone)}
                />
              </Field>
            </div>
          </Section>

          {/* ================= Asignación ================= */}
          <Section title="Asignación" description="Empleado y servicio">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Empleado" dirty={!!dirtyFields.employee_id}>
                <select
                  {...register("employee_id")}
                  className={input(dirtyFields.employee_id)}
                >
                  <option value="">Seleccionar empleado</option>
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.full_name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Servicio" dirty={!!dirtyFields.service_id}>
                <select
                  {...register("service_id")}
                  className={input(dirtyFields.service_id)}
                >
                  <option value="">Seleccionar servicio</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* ================= Programación ================= */}
          <Section title="Programación" description="Fecha y estado">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                label="Inicio"
                error={errors.start_at?.message}
                dirty={!!dirtyFields.start_at}
              >
                <input
                  type="datetime-local"
                  {...register("start_at")}
                  className={input(dirtyFields.start_at)}
                />
              </Field>

              <Field label="Estado" dirty={!!dirtyFields.status}>
                <select
                  {...register("status")}
                  className={input(dirtyFields.status)}
                >
                  <option value="scheduled">Programada</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="in-progress">En progreso</option>
                  <option value="completed">Completada</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* ================= No changes hint ================= */}
          {isEdit && !isDirty && (
            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-neutral-400">
              <Info size={14} />
              No hay cambios pendientes por guardar
            </div>
          )}

          {/* ================= Footer ================= */}
          <div className="flex items-center justify-end gap-3 border-t border-neutral-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting || (isEdit && !isDirty)}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ================================
   UI Helpers
================================ */

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-white">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  icon,
  error,
  dirty,
  children,
}: {
  label: string
  icon?: React.ReactNode
  error?: string
  dirty?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="flex items-center justify-between text-xs font-medium text-neutral-400">
        <span className="flex items-center gap-1">
          {icon}
          {label}
        </span>

        {dirty && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
            <Check size={10} />
            Modificado
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}

/* ================================
   Input styles
================================ */
const input = (dirty?: boolean) =>
  [
    "w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none transition",
    "bg-neutral-800 border",
    dirty
      ? "border-emerald-500 ring-2 ring-emerald-500/20"
      : "border-neutral-700",
    "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
  ].join(" ")
