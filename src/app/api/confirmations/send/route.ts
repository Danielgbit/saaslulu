import { NextResponse } from "next/server";
import { getTomorrowAppointments } from "@/services/appointments/appointments.service";
import {
    buildMessage,
    groupByClient,
    sendWhatsApp
} from "@/services/confirmations/confirmations.service";
import { stylizeMessage } from "@/lib/ai/stylizeMessage";

export async function POST() {
    const { appointments } = await getTomorrowAppointments();

    if (!appointments.length) {
        return NextResponse.json({ message: "No hay citas para mañana" });
    }

    const clients = groupByClient(appointments);

    for (const client of clients) {
        const base = buildMessage(client);
        const final = await stylizeMessage(base);
        await sendWhatsApp(client.client_phone, final);
    }

    return NextResponse.json({ ok: true, sent: clients.length });
}
