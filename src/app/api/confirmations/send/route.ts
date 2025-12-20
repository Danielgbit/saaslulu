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

    // 4️⃣ Enviar mensajes
    for (const client of clients) {
        const base = buildMessage(client);
        const final = await stylizeMessage(base);
        await sendWhatsApp(client.client_phone, final);
    }

    // 5️⃣ Respuesta final
    return NextResponse.json({
        ok: true,
        clients: clients.length
    });
}
