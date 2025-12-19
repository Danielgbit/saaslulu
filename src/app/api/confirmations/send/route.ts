// app/api/confirmations/send/route.ts
import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";
import {
    buildMessage,
    groupByClient,
    sendWhatsApp
} from "@/services/confirmations/confirmations.service";
import { stylizeMessage } from "@/lib/ai/stylizeMessage";

export async function POST() {
    const now = new Date();

    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(now.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const tomorrowEnd = new Date(now);
    tomorrowEnd.setDate(now.getDate() + 1);
    tomorrowEnd.setHours(23, 59, 59, 999);

    const { data: appointments, error } = await supabaseClient
        .from("appointments")
        .select("*")
        .gte("start_at", tomorrowStart.toISOString())
        .lte("start_at", tomorrowEnd.toISOString())
        .is("confirmed", null);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!appointments?.length) {
        return NextResponse.json({ message: "No hay citas para mañana" });
    }

    const clients = groupByClient(appointments);

    for (const client of clients) {
        const baseMessage = buildMessage(client);

        // 🔥 IA SOLO AQUÍ
        const finalMessage = await stylizeMessage(baseMessage);

        await sendWhatsApp(client.client_phone, finalMessage);
    }

    return NextResponse.json({
        ok: true,
        sent: clients.length
    });
}
