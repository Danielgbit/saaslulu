// src/app/api/confirmations/send/route.ts
// Service: sends confirmation messages to clients

import { NextResponse } from "next/server";
import { getTomorrowAppointments } from "@/services/appointments/appointments.service";
import {
    buildMessage,
    groupByClient,
    sendWhatsApp
} from "@/services/confirmations/confirmations.service";
import { stylizeMessage } from "@/lib/ai/stylizeMessage";
import { isWhatsAppConnected } from "@/services/whatsapp/whatsapp.service";

export async function POST() {
    try {
        // 1️⃣ Verificar conexión WhatsApp (bloqueo duro)
        const connected = await isWhatsAppConnected();

        if (!connected) {
            return NextResponse.json(
                { error: "WhatsApp no conectado. Escanea el QR primero." },
                { status: 400 }
            );
        }

        // 2️⃣ Obtener citas de mañana
        const { appointments } = await getTomorrowAppointments();

        if (!appointments || appointments.length === 0) {
            return NextResponse.json(
                { message: "No hay citas para mañana" },
                { status: 200 }
            );
        }

        // 3️⃣ Agrupar por cliente
        const clients = groupByClient(appointments);

        let sent = 0;
        const failed: string[] = [];

        // 4️⃣ Enviar mensajes (tolerante a errores)
        for (const client of clients) {
            try {
                const base = buildMessage(client);
                const final = await stylizeMessage(base);

                console.log('final', final);
                console.log('client', client);
                console.log('client.client_phone', client.client_phone);


                // 🛡️ DEFENSA OBLIGATORIA
                if (
                    typeof final !== "string" ||
                    final.trim().length === 0 ||
                    final.includes("undefined")
                ) {
                    throw new Error("Mensaje inválido generado");
                }

                await sendWhatsApp(client.client_phone, final);
                sent++;
            } catch (err: any) {
                console.error("❌ WhatsApp send error", {
                    phone: client.client_phone,
                    error: err.message
                });
                failed.push(client.client_phone);
            }

        }

        // 5️⃣ Respuesta final clara
        return NextResponse.json({
            ok: true,
            totalClients: clients.length,
            sent,
            failed
        });

    } catch (err: any) {
        console.error("❌ Error general en confirmations/send", err);

        return NextResponse.json(
            { error: "Error interno enviando confirmaciones" },
            { status: 500 }
        );
    }
}
