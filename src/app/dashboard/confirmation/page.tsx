"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { useTomorrowAppointments } from "@/hooks/appointments/useTomorrowAppointments";
import { useStartConfirmation } from "@/hooks/appointments/useStartConfirmation";

import TomorrowAppointmentsCard from "@/components/appointments/TomorrowAppointmentsCard";
import LastConfirmationCard from "@/components/appointments/LastConfirmationCard";

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

    // Local state mirrors hook values to allow clearing
    const [localAppointments, setLocalAppointments] = useState<any[]>([]);
    const [localCount, setLocalCount] = useState(0);

    /**
     * Sync local state whenever hook appointments update.
     */
    useEffect(() => {
        setLocalAppointments(appointments);
        setLocalCount(count);
    }, [appointments, count]);

    const isLoading = loadingTomorrow || loadingSend;

    /**
     * Clear tomorrow appointments manually.
     */
    const clearAppointments = () => {
        setLocalAppointments([]);
        setLocalCount(0);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-10">
                Envío de Confirmaciones
            </h1>

            {/* Action buttons */}
            <div className="flex gap-4 mb-8">

                {/* Get tomorrow appointments */}
                <button
                    onClick={refetch}
                    disabled={isLoading}
                    className={`px-5 py-3 rounded-lg font-semibold transition ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gray-700 hover:bg-gray-800 text-white"
                        }`}
                >
                    {loadingTomorrow ? "Cargando..." : "Ver Citas de Mañana"}
                </button>

                {/* Send confirmations */}
                <button
                    onClick={startConfirmation}
                    disabled={isLoading}
                    className={`px-5 py-3 rounded-lg font-semibold transition ${loadingSend
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                >
                    {loadingSend ? "Enviando..." : "Enviar Confirmaciones"}
                </button>

                {/* Clear appointments */}
                <button
                    onClick={clearAppointments}
                    disabled={localAppointments.length === 0}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${localAppointments.length === 0
                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                >
                    <Trash2 size={18} />
                    Limpiar
                </button>
            </div>

            {/* Loading status */}
            {isLoading && (
                <p className="text-gray-600 mb-6 animate-pulse">Procesando…</p>
            )}

            {/* Error alerts */}
            {(errorTomorrow || errorSend) && (
                <div className="w-full max-w-2xl mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                    <p className="font-bold">Error</p>
                    <p>{errorTomorrow || errorSend}</p>
                </div>
            )}

            {/* Main content */}
            <div className="w-full max-w-3xl space-y-8">

                {/* Tomorrow appointments card */}
                {!loadingTomorrow && localAppointments.length > 0 && (
                    <TomorrowAppointmentsCard
                        appointments={localAppointments}
                        count={localCount}
                    />
                )}

                {/* Empty state */}
                {!loadingTomorrow &&
                    localAppointments.length === 0 &&
                    !confirmationResult && (
                        <p className="text-gray-600 text-center">
                            No hay datos para mostrar. Presiona un botón para comenzar.
                        </p>
                    )}

                {/* Confirmation results */}
                {confirmationResult && !loadingSend && (
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Resultado de Envío
                        </h2>

                        <div className="space-y-2 text-gray-700">
                            <p><strong>Mensaje:</strong> {confirmationResult.message}</p>
                            <p><strong>Total:</strong> {confirmationResult.total}</p>
                            <p><strong>Exitosas:</strong> {confirmationResult.successful}</p>
                            <p><strong>Fallidas:</strong> {confirmationResult.failed}</p>
                        </div>

                        {confirmationResult.details && (
                            <ul className="mt-6 space-y-4">
                                {confirmationResult.details.map((detail: any, index: number) => (
                                    <li
                                        key={index}
                                        className={`p-4 rounded-lg border shadow-sm ${detail.success
                                                ? "bg-green-50 border-green-200"
                                                : "bg-red-50 border-red-200"
                                            }`}
                                    >
                                        <p><strong>Cita ID:</strong> {detail.appointment_id}</p>
                                        <p><strong>Estado:</strong> {detail.success ? "✅ Enviada" : "❌ Falló"}</p>
                                        {detail.error && (
                                            <p><strong>Error:</strong> {detail.error}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <LastConfirmationCard />
        </div>
    );
};

export default ConfirmationPage;
