"use client";

import { useEffect, useState } from "react";
import { Trash2, CalendarCheck, Send } from "lucide-react";

import { } from "@/hooks/appointments/useTomorrowAppointments";
import { useStartConfirmation } from "@/hooks/appointments/useStartConfirmation";

import TomorrowAppointmentsCard from "@/components/appointments/TomorrowAppointmentsCard";

const ConfirmationPage = () => {
    const {
        appointments,
        count,
        loading: loadingTomorrow,
        error: errorTomorrow,
        refetch
    } = useTomorrowAppointments();

    const {
        loading: loadingSend,
        result: confirmationResult,
        error: errorSend,
        startConfirmation
    } = useStartConfirmation();

    const [localAppointments, setLocalAppointments] = useState<any[]>([]);
    const [localCount, setLocalCount] = useState(0);

    useEffect(() => {
        setLocalAppointments(appointments);
        setLocalCount(count);
    }, [appointments, count]);

    const isLoading = loadingTomorrow || loadingSend;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Confirmación de Citas
                    </h1>
                    <p className="text-gray-600">
                        Revisa las citas de mañana y envía confirmaciones por WhatsApp.
                    </p>
                </header>

                {/* Actions */}
                <section className="flex flex-wrap gap-4">
                    <button
                        onClick={refetch}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-900 disabled:bg-gray-400"
                    >
                        <CalendarCheck size={18} />
                        {loadingTomorrow ? "Cargando citas..." : "Ver citas de mañana"}
                    </button>

                    <button
                        onClick={startConfirmation}
                        disabled={isLoading || localAppointments.length === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        <Send size={18} />
                        {loadingSend ? "Enviando..." : "Enviar confirmaciones"}
                    </button>

                    <button
                        onClick={() => {
                            setLocalAppointments([]);
                            setLocalCount(0);
                        }}
                        disabled={localAppointments.length === 0}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-40"
                    >
                        <Trash2 size={18} />
                        Limpiar lista
                    </button>
                </section>

                {/* Status */}
                {isLoading && (
                    <div className="text-sm text-gray-500 animate-pulse">
                        Procesando información…
                    </div>
                )}

                {/* Errors */}
                {(errorTomorrow || errorSend) && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
                        <p className="font-semibold">Ocurrió un error</p>
                        <p className="text-sm">{errorTomorrow || errorSend}</p>
                    </div>
                )}

                {/* Content */}
                <main className="space-y-6">
                    {!loadingTomorrow && localAppointments.length > 0 && (
                        <TomorrowAppointmentsCard
                            appointments={localAppointments}
                            count={localCount}
                        />
                    )}

                    {!loadingTomorrow &&
                        localAppointments.length === 0 &&
                        !confirmationResult && (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg font-medium">
                                    Aún no hay citas cargadas
                                </p>
                                <p className="text-sm">
                                    Presiona “Ver citas de mañana” para comenzar
                                </p>
                            </div>
                        )}

                    {confirmationResult && !loadingSend && (
                        <section className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Resultado del envío
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <Stat label="Total" value={confirmationResult.total} />
                                <Stat label="Exitosas" value={confirmationResult.successful} success />
                                <Stat label="Fallidas" value={confirmationResult.failed} error />
                            </div>

                            {confirmationResult.details && (
                                <ul className="space-y-3 pt-4">
                                    {confirmationResult.details.map((detail: any, index: number) => (
                                        <li
                                            key={index}
                                            className={`rounded-xl border p-4 text-sm ${detail.success
                                                ? "bg-green-50 border-green-200"
                                                : "bg-red-50 border-red-200"
                                                }`}
                                        >
                                            <p><strong>Cita:</strong> #{detail.appointment_id}</p>
                                            <p>
                                                Estado:{" "}
                                                {detail.success ? "✅ Enviada" : "❌ Error"}
                                            </p>
                                            {detail.error && (
                                                <p className="text-red-600">
                                                    {detail.error}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    )}
                </main>

            </div>
        </div>
    );
};

const Stat = ({
    label,
    value,
    success,
    error
}: {
    label: string;
    value: number;
    success?: boolean;
    error?: boolean;
}) => (
    <div
        className={`rounded-xl p-4 text-center border ${success
            ? "bg-green-50 border-green-200 text-green-700"
            : error
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-gray-50 border-gray-200"
            }`}
    >
        <p className="text-xs uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default ConfirmationPage;
