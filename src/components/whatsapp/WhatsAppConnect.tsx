"use client"

import { useWhatsApp } from "@/hooks/whatsapp/useWhatsapp"
import { Loader2, LogOut, CheckCircle } from "lucide-react"

export default function WhatsAppConnect() {
    const { qr, connected, logout } = useWhatsApp()

    return (
        <div className="max-w-md rounded-xl border bg-gray-800 p-6 shadow-sm">
            <header className="mb-4">
                <h2 className="text-lg font-semibold">WhatsApp</h2>
                <p className="text-sm text-gray-500">
                    Conecta tu cuenta de WhatsApp para enviar mensajes automáticos
                </p>
            </header>

            {/* CONECTADO */}
            {connected && (
                <div className="flex flex-col items-center gap-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />

                    <p className="text-sm text-green-600 font-medium">
                        WhatsApp conectado correctamente
                    </p>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
                    >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                    </button>
                </div>
            )}

            {/* NO CONECTADO */}
            {!connected && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-gray-600 text-center">
                        Escanea el código QR con la app de WhatsApp para vincular tu cuenta
                    </p>

                    <div className="flex h-[260px] w-[260px] items-center justify-center rounded-lg border bg-gray-50">
                        {qr ? (
                            <img
                                src={qr}
                                alt="QR WhatsApp"
                                className="h-[220px] w-[220px]"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <Loader2 className="h-6 w-6 animate-spin" />
                                <span className="text-xs">Generando QR…</span>
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-gray-400 text-center">
                        El código se actualiza automáticamente
                    </p>
                </div>
            )}
        </div>
    )
}
