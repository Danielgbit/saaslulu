"use client";

import type { Appointment } from "@/types/appointments/appointments";
import { Service } from "@/types/services";
import { useMemo, useState, useEffect } from "react";
import { deleteCompletedService } from "@/services/services/deleteCompleted.service";

interface Props {
    appointment: Appointment | null;
    onClose: () => void;
    onConfirm: (servicesToConfirm: Service[]) => void;
    onAddExtraService: () => void;
    selectedServices?: Service[];
    onServiceDeleted?: () => void; // no usado aún, pero queda para expansión
}

export default function ConfirmationModal({
    appointment,
    onClose,
    onConfirm,
    onAddExtraService,
    selectedServices = [],
}: Props) {

    if (!appointment) return null;

    // ---------------------------------
    // Local editable state
    // ---------------------------------
    const [completedLocal, setCompletedLocal] = useState(
        appointment.services_completed ?? []
    );

    // Sync completed services ONLY when appointment changes
    useEffect(() => {
        setCompletedLocal(appointment.services_completed ?? []);
    }, [appointment.services_completed]);

    // Convert DB completed services -> Service[]
    const completedAsServices: Service[] = completedLocal.map((item) => ({
        id: item.id,
        name: item.service_name,
        price: item.service_price,
        duration_minutes: item.duration_minutes,
        description: item.notes ?? null,
        created_at: new Date().toISOString(),
    }));

    // Merge DB completed + extra (local)
    const finalServices: Service[] = [...completedAsServices, ...selectedServices];

    // Total price
    const total = useMemo(() => {
        return finalServices.reduce((sum, s) => sum + (s.price ?? 0), 0);
    }, [finalServices]);

    // ---------------------------------
    // Delete completed service
    // ---------------------------------
    const handleDelete = async (serviceId: string) => {
        const res = await deleteCompletedService(serviceId);

        if (res.success) {
            setCompletedLocal((prev) => prev.filter((s) => s.id !== serviceId));
        } else {
            alert("No se pudo eliminar el servicio.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-700/40 animate-fadeIn">

                <h2 className="text-2xl font-bold text-white text-center mb-1">
                    ¡Servicio finalizado!
                </h2>

                <p className="text-gray-400 text-sm text-center mb-4">
                    Detalles del servicio de{" "}
                    <span className="font-semibold text-gray-200">
                        {appointment.client_name}
                    </span>
                </p>

                <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 max-h-64 overflow-y-auto">
                    <p className="text-sm font-semibold text-gray-300 mb-2">
                        Servicios completados
                    </p>

                    {/* ⬇️ NUEVO BLOQUE SOLICITADO */}
                    {finalServices.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-gray-400 text-sm font-medium">
                                Esta cita está completada pero no tiene servicios registrados.
                            </p>

                            <button
                                onClick={onAddExtraService}
                                className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                Agregar servicio
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {finalServices.map((s) => (
                                <li
                                    key={s.id}
                                    className="flex justify-between items-center bg-gray-900/40 rounded-lg px-3 py-2 border border-gray-700/60"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-gray-200 text-sm font-medium">{s.name}</span>
                                        <span className="text-blue-400 font-semibold text-sm">
                                            ${s.price}
                                        </span>
                                    </div>

                                    {/* ocultar eliminar si el servicio es añadido (local) */}
                                    {!selectedServices.some(ss => ss.id === s.id) && (
                                        <button
                                            className="text-red-400 text-xs hover:text-red-300 hover:underline transition"
                                            onClick={() => handleDelete(s.id)}
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Total */}
                <div className="mt-4 bg-gray-900 border border-gray-700 rounded-xl p-4 flex justify-between items-center shadow-inner">
                    <span className="font-semibold text-gray-300 text-sm">Total a cobrar</span>
                    <span className="text-xl font-bold text-green-400">${total}</span>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3 mt-6">

                    <button
                        className="w-full cursor-pointer py-2.5 bg-green-600 hover:bg-green-500 transition rounded-xl text-white font-semibold shadow-lg active:scale-[0.98]"
                        onClick={() => onConfirm(finalServices)}
                    >
                        Confirmar pago
                    </button>

                    <button
                        className="w-full cursor-pointer py-2.5 bg-blue-600/90 hover:bg-blue-500 transition rounded-xl text-white font-semibold shadow-md active:scale-[0.98]"
                        onClick={onAddExtraService}
                    >
                        Agregar servicio adicional
                    </button>

                    <button
                        className="w-full cursor-pointer py-2.5 text-gray-400 hover:text-white transition rounded-xl font-medium active:scale-[0.98]"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>

            </div>
        </div>
    );
}
