'use client'

import { useState } from 'react';

const ConfirmationPage = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSendConfirmations = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/appointments/start-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar confirmaciones');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para ver las citas de mañana primero
    const handleViewTomorrowAppointments = async () => {
        try {
            const response = await fetch('/api/appointments/start-confirmation', {
                method: 'GET',
            });

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen p-4">
            <h1 className="text-2xl font-bold mb-8">Envío de Confirmaciones</h1>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={handleViewTomorrowAppointments}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                >
                    Ver Citas de Mañana
                </button>

                <button
                    onClick={handleSendConfirmations}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar Confirmaciones'}
                </button>
            </div>

            {loading && (
                <div className="mb-4">
                    <p className="text-gray-600">Procesando citas...</p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-8 w-full max-w-2xl">
                    <div className="bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Resultado:</h2>

                        {result.appointments ? (
                            // Resultado de GET (ver citas)
                            <div>
                                <p className="mb-2">
                                    <span className="font-semibold">Total de citas:</span> {result.count}
                                </p>
                                {result.appointments.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-bold mb-2">Citas:</h3>
                                        <ul className="space-y-2">
                                            {result.appointments.map((appointment: any) => (
                                                <li key={appointment.id} className="p-3 bg-black rounded border">
                                                    <p><strong>ID:</strong> {appointment.id}</p>
                                                    <p><strong>Hora:</strong> {new Date(appointment.start_at).toLocaleString()}</p>
                                                    <p><strong>Cliente:</strong> {appointment.client_name || 'Sin nombre'}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Resultado de POST (enviar confirmaciones)
                            <div>
                                <p className="mb-2">
                                    <span className="font-semibold">Mensaje:</span> {result.message}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Total procesadas:</span> {result.total}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Exitosas:</span> {result.successful}
                                </p>
                                <p className="mb-4">
                                    <span className="font-semibold">Fallidas:</span> {result.failed}
                                </p>

                                {result.details && result.details.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-bold mb-2">Detalles por cita:</h3>
                                        <ul className="space-y-2">
                                            {result.details.map((detail: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className={`p-3 rounded border ${detail.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                                        }`}
                                                >
                                                    <p><strong>Cita ID:</strong> {detail.appointment_id}</p>
                                                    <p><strong>Estado:</strong> {detail.success ? '✅ Enviada' : '❌ Falló'}</p>
                                                    {detail.error && <p><strong>Error:</strong> {detail.error}</p>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmationPage;