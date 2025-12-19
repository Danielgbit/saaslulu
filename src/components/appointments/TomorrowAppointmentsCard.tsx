"use client";

import { Clock, User, UserIcon } from "lucide-react";

/**
 * UX/UI version of TomorrowAppointmentsCard
 * Scanable, clean, SaaS-ready
 */
const TomorrowAppointmentsCard = ({ appointments, count }: any) => {
    return (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Citas de mañana
                    </h2>
                    <p className="text-sm text-gray-500">
                        Total programadas:{" "}
                        <span className="font-medium text-gray-800">{count}</span>
                    </p>
                </div>
            </header>

            {/* List */}
            <ul className="space-y-3">
                {appointments.map((appointment: any) => (
                    <li
                        key={appointment.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4 hover:bg-white hover:shadow-md transition"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">

                            {/* Hora */}
                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                                <Clock size={16} className="text-gray-500" />
                                {new Date(appointment.start_at).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>

                            {/* Cliente */}
                            <div className="flex items-center gap-2 text-gray-700">
                                <User size={16} className="text-gray-500" />
                                {appointment.client_name || "Cliente sin nombre"}
                            </div>

                            {/* Empleado */}
                            <div className="flex items-center gap-2 text-gray-700">
                                <UserIcon size={16} className="text-gray-500" />
                                {appointment.employee?.full_name || "Empleado no asignado"}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Empty state */}
            {appointments.length === 0 && (
                <div className="py-10 text-center text-gray-500">
                    <p className="font-medium">No hay citas para mañana</p>
                    <p className="text-sm">
                        Cuando existan, aparecerán listadas aquí
                    </p>
                </div>
            )}
        </section>
    );
};

export default TomorrowAppointmentsCard;
