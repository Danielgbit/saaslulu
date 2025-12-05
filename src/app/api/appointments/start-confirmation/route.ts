import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
    try {
        const now = new Date();

        // Calcular inicio y fin del día de mañana
        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(now);
        tomorrowEnd.setDate(now.getDate() + 1);
        tomorrowEnd.setHours(23, 59, 59, 999);

        // Obtener citas del día siguiente
        const { data: appointments, error } = await supabaseClient
            .from("appointments")
            .select("*")
            .gte("start_at", tomorrowStart.toISOString())
            .lte("start_at", tomorrowEnd.toISOString());

        if (error) {
            console.error("Error fetching appointments:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!appointments || appointments.length === 0) {
            return NextResponse.json(
                { message: "No hay citas para mañana" },
                { status: 200 }
            );
        }

        // 🔥 Enviar TODAS las citas en un solo POST a tu webhook
        await fetch("https://centrodeesteticalulu.site/webhook-test/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                total: appointments.length,
                appointments,
                key: Date.now()
            })
        }).catch(err => {
            console.error("Error enviando citas al webhook:", err);
        });

        return NextResponse.json({
            message: `Confirmaciones enviadas para ${appointments.length} citas`,
            total: appointments.length
        });

    } catch (err) {
        console.error("Error en start-confirmation:", err);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
