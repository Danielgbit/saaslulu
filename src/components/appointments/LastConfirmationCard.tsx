"use client";

import { useState } from "react";
import { useConfirmationResponses } from "@/hooks/appointments/useConfirmationResponses";
import { ClipboardCopy, Check } from "lucide-react"; // Iconos de lucide

const LastConfirmationCard = () => {
    const { messages, loading, error, refetch } = useConfirmationResponses();
    const last = messages.length > 0 ? messages[messages.length - 1] : null;

    // Track which message was copied
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    /**
     * Copies the whole appointment message to clipboard
     */
    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);

            // Reset icon after delay
            setTimeout(() => setCopiedIndex(null), 1500);
        } catch (err) {
            console.error("Clipboard error:", err);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Último Mensaje Recibido
            </h2>

            {loading && <p className="text-gray-600">Cargando mensaje…</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !last && (
                <p className="text-gray-600">Aún no se ha recibido ningún mensaje.</p>
            )}

            {last && (
                <div className="space-y-6">

                    {/* Render each appointment message */}
                    <div className="space-y-5">
                        {last.appointments?.map((a: any, index: number) => (
                            <div
                                key={index}
                                className="p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {a.client_name}
                                        </p>
                                        <p className="text-gray-600">
                                            {a.client_phone}
                                        </p>
                                    </div>

                                    {/* Copy button */}
                                    <button
                                        onClick={() => handleCopy(a.message, index)}
                                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition shadow-sm"
                                        title="Copiar mensaje"
                                    >
                                        {copiedIndex === index ? (
                                            <Check className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <ClipboardCopy className="w-5 h-5 text-gray-700" />
                                        )}
                                    </button>
                                </div>

                                {/* Message box */}
                                <textarea
                                    className="w-full mt-3 p-4 bg-white border border-gray-300 rounded-lg text-gray-800 shadow-inner"
                                    rows={6}
                                    readOnly
                                    value={a.message}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Timestamp */}
                    <p className="text-sm text-gray-500">
                        Recibido: {new Date(last.received_at).toLocaleString()}
                    </p>

                    {/* Refresh button */}
                    <button
                        onClick={refetch}
                        className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Actualizar mensaje
                    </button>
                </div>
            )}
        </div>
    );
};

export default LastConfirmationCard;
