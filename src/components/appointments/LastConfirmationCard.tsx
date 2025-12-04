"use client";

import React from "react";
import { useConfirmationResponses } from "@/hooks/appointments/useConfirmationResponses";

const LastConfirmationCard = () => {
    const { messages, loading, error, refetch } = useConfirmationResponses();

    // Tomamos el último mensaje recibido
    const last = messages.length > 0 ? messages[messages.length - 1] : null;

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Último Mensaje Recibido
            </h2>

            {loading && (
                <p className="text-gray-600">Cargando mensaje…</p>
            )}

            {error && (
                <p className="text-red-600">{error}</p>
            )}

            {!loading && !last && (
                <p className="text-gray-600">Aún no se ha recibido ningún mensaje.</p>
            )}

            {last && (
                <div className="space-y-4">
                    <p>
                        <strong>Cliente:</strong> {last.client_name}
                    </p>

                    <p>
                        <strong>Teléfono:</strong> {last.client_phone}
                    </p>

                    <div>
                        <p className="font-semibold">Mensaje:</p>
                        <textarea
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                            rows={7}
                            readOnly
                            value={last.message}
                        />
                    </div>

                    <p className="text-sm text-gray-500">
                        Recibido: {new Date(last.received_at).toLocaleString()}
                    </p>

                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                    >
                        Actualizar mensaje
                    </button>
                </div>
            )}
        </div>
    );
};

export default LastConfirmationCard;
