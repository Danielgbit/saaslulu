"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useConfirmAppointment } from "@/hooks/confirmations/useConfirmAppointment";

export default function ConfirmPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const {
        confirm,
        loading,
        success,
        error
    } = useConfirmAppointment();

    useEffect(() => {
        if (token) {
            confirm(token);
        }
    }, [token]);

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {loading && (
                    <>
                        <h1 className="text-xl font-semibold">
                            Confirmando tu cita…
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Un momento por favor 🙏
                        </p>
                    </>
                )}

                {success && (
                    <>
                        <h1 className="text-2xl font-semibold text-green-600">
                            ¡Tu cita ha sido confirmada! ✅
                        </h1>
                        <p className="mt-3 text-gray-700">
                            Te esperamos en la fecha y hora programada.
                        </p>
                        <p className="mt-2 text-gray-500">
                            Gracias por confiar en nosotros 💚
                        </p>
                    </>
                )}

                {error && (
                    <>
                        <h1 className="text-xl font-semibold text-red-600">
                            No se pudo confirmar la cita
                        </h1>
                        <p className="mt-3 text-gray-700">
                            {error}
                        </p>
                        <p className="mt-2 text-gray-500">
                            Si tienes dudas, contáctanos por WhatsApp.
                        </p>
                    </>
                )}

                {!token && !loading && (
                    <>
                        <h1 className="text-xl font-semibold">
                            Enlace inválido
                        </h1>
                        <p className="mt-2 text-gray-600">
                            El enlace de confirmación no es válido.
                        </p>
                    </>
                )}
            </div>
        </main>
    );
}
