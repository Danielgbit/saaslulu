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
import { getOrCreateConfirmationToken } from "@/services/confirmations/confirmationToken.service";

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

        // 4️⃣ Enviar mensajes (tolerante a errores por cliente)
        for (const client of clients) {
            try {
                // 👉 Tomamos una cita por cliente (regla actual)
                const appointment = client.appointments[0];

                // 🛡️ SOLO citas pendientes de confirmar
                if (appointment.status !== "scheduled") {
                    console.log(
                        "⏭️ Skipping appointment (status != scheduled)",
                        appointment.id,
                        appointment.status
                    );
                    continue;
                }

                // 🔐 Obtener o crear token (idempotente)
                const token = await getOrCreateConfirmationToken(
                    appointment.id
                );

                const confirmationUrl =
                    `${process.env.APP_URL}/confirmar?token=${token}`;

                // 📝 Construir mensaje
                const baseMessage = buildMessage(
                    client,
                    confirmationUrl
                );

                const finalMessage = await stylizeMessage(baseMessage);

                // 🛡️ Defensa final
                if (
                    typeof finalMessage !== "string" ||
                    finalMessage.trim().length === 0 ||
                    finalMessage.includes("undefined")
                ) {
                    throw new Error("Mensaje inválido generado");
                }

                // 📤 Enviar WhatsApp
                await sendWhatsApp(
                    client.client_phone,
                    finalMessage
                );

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
        console.error(
            "❌ Error general en confirmations/send",
            err
        );

        return NextResponse.json(
            { error: "Error interno enviando confirmaciones" },
            { status: 500 }
        );
    }
}
