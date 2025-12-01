"use client";

import type { Appointment } from "@/types/appointments";
import StatusBadge from "./StatusBadge";

type Props = {
    appointment: Appointment;
    onClick?: (appointment: Appointment) => void;
};

export default function AppointmentCard({ appointment, onClick }: Props) {
    // --- Normalización segura ---
    const rawServices = appointment.services;
    const rawCompleted = appointment.services_completed;

    const scheduled = Array.isArray(rawServices)
        ? rawServices
        : rawServices
            ? [rawServices]
            : [];

    const completed = Array.isArray(rawCompleted)
        ? rawCompleted
        : rawCompleted
            ? [rawCompleted]
            : [];

    // Formato unificado para mostrar
    const services = [
        ...scheduled.map((s) => ({
            id: s.id,
            name: s.name,
            price: Number(s.price),
            duration_minutes: Number(s.duration_minutes),
            isCompleted: false,
        })),
        ...completed.map((s) => ({
            id: s.id,
            name: s.service_name,
            price: Number(s.service_price),
            duration_minutes: Number(s.duration_minutes),
            isCompleted: true,
        })),
    ];

    // Totales
    const totalPrice = services.reduce((sum, s) => sum + (s.price ?? 0), 0);
    const totalDuration = services.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0);

    return (
        <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => onClick?.(appointment)}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-semibold">{appointment.client_name ?? "Cliente"}</p>
                    <p className="text-sm text-gray-600">{appointment.client_phone}</p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">
                        {new Date(appointment.start_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    <StatusBadge status={appointment.status} />
                </div>
            </div>

            <div className="mt-3">
                <p className="text-sm font-medium">Servicios:</p>
                <ul className="mt-1 list-disc list-inside text-sm">
                    {services.length === 0 ? (
                        <li className="text-gray-500">Sin servicios asignados</li>
                    ) : (
                        services.map((s) => (
                            <li
                                key={s.id}
                                className={`flex justify-between ${s.isCompleted ? "text-green-600" : ""
                                    }`}
                            >
                                <span>
                                    {s.name}{" "}
                                    {s.isCompleted && (
                                        <span className="text-xs text-green-700">(completado)</span>
                                    )}
                                </span>
                                <span className="ml-4">${s.price}</span>
                            </li>
                        ))
                    )}
                </ul>

                <div className="mt-2 flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                </div>

                <div className="mt-1 text-xs text-gray-500">
                    Duración total: {totalDuration} min
                </div>
            </div>
        </div>
    );
}
