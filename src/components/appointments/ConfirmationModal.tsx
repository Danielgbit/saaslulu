// src/components/ConfirmationModal.tsx
"use client";

import type { Appointment, Service } from "@/types/appointments";
import { useMemo } from "react";

interface Props {
    appointment: Appointment | null;
    onClose: () => void;
    onConfirm: (servicesToConfirm: Service[]) => void;
    onAddExtraService: (addFn: (extra: Service) => void) => void;
}

/**
 * Muestra los servicios actuales y permite confirmar.
 * onConfirm recibe el array definitivo de servicios a marcar como completados.
 */
export default function ConfirmationModal({ appointment, onClose, onConfirm, onAddExtraService }: Props) {
    if (!appointment) return null;

    const services = appointment.services ?? [];

    const total = useMemo(() => {
        return services.reduce((s, item) => s + (item.price ?? 0), 0);
    }, [services]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-2">Servicio terminado</h2>

                <p className="mb-3 text-sm">
                    ¿El servicio de <strong>{appointment.client_name}</strong> fue finalizado correctamente?
                </p>

                <div className="mb-3">
                    <p className="text-sm font-medium">Servicios que se cobrarán:</p>
                    <ul className="mt-2 list-disc list-inside text-sm">
                        {services.length === 0 ? (
                            <li className="text-gray-500">Sin servicios</li>
                        ) : (
                            services.map((s) => (
                                <li key={s.id} className="flex justify-between">
                                    <span>{s.name}</span>
                                    <span>${s.price}</span>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="mt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    <button
                        className="bg-green-600 text-white py-2 rounded-md font-semibold"
                        onClick={() => onConfirm(services)}
                    >
                        Confirmar finalización
                    </button>

                    <button
                        className="bg-blue-500 text-white py-2 rounded-md font-semibold"
                        onClick={() => onAddExtraService((extra) => {
                            // onAddExtraService recibe una función en la page para mutar el estado de los servicios
                            // aquí solo abrimos el flujo — la page hará el push del extra al appointment mostrado.
                        })}
                    >
                        Agregar servicio adicional
                    </button>

                    <button
                        className="text-gray-600 py-2 rounded-md font-semibold"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
