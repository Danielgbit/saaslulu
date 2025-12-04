'use client';

import { useTomorrowAppointments } from "@/hooks/appointments/useTomorrowAppointments";
import { useStartConfirmation } from "@/hooks/appointments/useStartConfirmation";
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

    const isLoading = loadingTomorrow || loadingSend;

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-10">
                Envío de Confirmaciones
            </h1>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
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
            </div>

            {/* Loading state */}
            {isLoading && (
                <p className="text-gray-600 mb-6 animate-pulse">Procesando…</p>
            )}

            {/* Error message */}
            {(errorTomorrow || errorSend) && (
                <div className="w-full max-w-2xl mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                    <p className="font-bold">Error</p>
                    <p>{errorTomorrow || errorSend}</p>
                </div>
            )}

            {/* Container */}
            <div className="w-full max-w-3xl space-y-8">

                {/* Tomorrow Appointments */}
                {appointments.length > 0 && !loadingTomorrow && (
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Citas de Mañana
                        </h2>

                        <p className="text-gray-700 mb-4">
                            Total: <span className="font-bold">{count}</span>
                        </p>

                        <ul className="space-y-4">
                            {appointments.map((appointment: any) => (
                                <li
                                    key={appointment.id}
                                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                                >
                                    <p><strong>Hora:</strong> {new Date(appointment.start_at).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</p>
                                    <p><strong>Cliente:</strong> {appointment.client_name || "Sin nombre"}</p>
                                    <p><strong>Empleado:</strong> {appointment.employee?.full_name || "Desconocido"}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Confirmation Result */}
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

                        {/* Details */}
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
                                        {detail.error && <p><strong>Error:</strong> {detail.error}</p>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Empty state (no citas and no loading) */}
                {appointments.length === 0 && !loadingTomorrow && !confirmationResult && (
                    <p className="text-gray-600 text-center">
                        No hay datos para mostrar. Presiona un botón para comenzar.
                    </p>
                )}
            </div>
            <LastConfirmationCard />
        </div>
    );
};

export default ConfirmationPage;
