// src/components/ConfirmationModal.tsx
"use client";

import type { Appointment } from "@/types/appointments";
import { Service } from "@/types/services";
import { useMemo } from "react";

interface Props {
    appointment: Appointment | null;
    onClose: () => void;
    onConfirm: (servicesToConfirm: Service[]) => void;
    onAddExtraService: () => void;
}

/**
 * Modal showing only completed services to confirm payment.
 */
export default function ConfirmationModal({
    appointment,
    onClose,
    onConfirm,
    onAddExtraService
}: Props) {

    if (!appointment) return null;

    // ✅ Use ONLY completed services
    const completed = appointment.services_completed ?? [];

    // Transform them to match Service type
    const completedAsServices: Service[] = completed.map((item) => ({
        id: item.id,
        name: item.service_name,
        price: item.service_price,
        duration_minutes: item.duration_minutes,

        // Campos que no existen en CompletedService pero son obligatorios en Service
        description: item.notes ?? null,
        created_at: new Date().toISOString(),
    }));


    // Calculate total
    const total = useMemo(() => {
        return completedAsServices.reduce((sum, s) => sum + (s.price ?? 0), 0);
    }, [completedAsServices]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-2">Servicio terminado</h2>

                <p className="mb-3 text-sm">
                    Estos son los servicios finalizados de <strong>{appointment.client_name}</strong>:
                </p>

                <div className="mb-3">
                    <p className="text-sm font-medium">Servicios completados:</p>

                    <ul className="mt-2 list-disc list-inside text-sm">
                        {completedAsServices.length === 0 ? (
                            <li className="text-gray-500">Sin servicios completados</li>
                        ) : (
                            completedAsServices.map((s) => (
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
                        onClick={() => onConfirm(completedAsServices)}
                    >
                        Confirmar finalización
                    </button>

                    <button
                        className="bg-blue-500 text-white py-2 rounded-md font-semibold"
                        onClick={onAddExtraService}
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
