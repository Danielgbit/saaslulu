"use client";

// src/app/dashboard/confirmation/page.tsx
// Page: Confirmation

import { useEffect, useState } from "react";

import { useTomorrowAppointments } from "@/hooks/appointments/useTomorrowAppointments";
import { useStartConfirmation } from "@/hooks/appointments/useStartConfirmation";
import { useWhatsApp } from "@/hooks/whatsapp/useWhatsapp";

import TomorrowAppointmentsCard from "@/components/appointments/TomorrowAppointmentsCard";
import ConfirmationHeader from "@/components/confirmations/ConfirmationHeader";
import ConfirmationActions from "@/components/confirmations/ConfirmationActions";
import ConfirmationResult from "@/components/confirmations/ConfirmationResult";

const ConfirmationPage = () => {
    // 🔹 HOOK DE WHATSAPP
    const { connected } = useWhatsApp();

    // 🔹 HOOK DE CITAS
    const {
        appointments,
        count,
        loading: loadingTomorrow,
        error: errorTomorrow,
        refetch,
    } = useTomorrowAppointments();

    // 🔹 HOOK DE ENVÍO
    const {
        loading: loadingSend,
        result: confirmationResult,
        error: errorSend,
        startConfirmation,
    } = useStartConfirmation();

    // 🔹 ESTADO LOCAL
    const [localAppointments, setLocalAppointments] = useState<any[]>([]);
    const [localCount, setLocalCount] = useState(0);

    useEffect(() => {
        setLocalAppointments(appointments);
        setLocalCount(count);
    }, [appointments, count]);

    const isLoading = loadingTomorrow || loadingSend;
    const hasAppointments = localAppointments.length > 0;

    // 🔹 SOLO SE PUEDE ENVIAR SI HAY CITAS Y WHATSAPP CONECTADO
    const canSendConfirmations = hasAppointments && connected;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <ConfirmationHeader />

                {/* Estado WhatsApp */}
                {!connected && (
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                        <p className="font-semibold">
                            WhatsApp no está conectado
                        </p>
                        <p className="text-sm">
                            Conecta tu WhatsApp escaneando el código QR para poder
                            enviar confirmaciones.
                        </p>
                    </div>
                )}

                {/* Actions */}
                <ConfirmationActions
                    isLoading={isLoading}
                    loadingTomorrow={loadingTomorrow}
                    loadingSend={loadingSend}
                    hasAppointments={canSendConfirmations}
                    onRefetch={refetch}
                    onSend={startConfirmation}
                    onClear={() => {
                        setLocalAppointments([]);
                        setLocalCount(0);
                    }}
                />

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
                        <p className="text-sm">
                            {errorTomorrow || errorSend}
                        </p>
                    </div>
                )}

                {/* Content */}
                <main className="space-y-6">
                    {!loadingTomorrow && hasAppointments && (
                        <TomorrowAppointmentsCard
                            appointments={localAppointments}
                            count={localCount}
                        />
                    )}

                    {!loadingTomorrow &&
                        !hasAppointments &&
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
                        <ConfirmationResult result={confirmationResult} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default ConfirmationPage;
