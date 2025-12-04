// src/app/api/appointments/confirmation-response/route.ts

import { NextRequest, NextResponse } from "next/server";

// 🔥 Memoria temporal del servidor (se borra cuando se reinicia)
let confirmationMessages: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);

        // Guardamos el mensaje tal como llega desde n8n
        confirmationMessages.push({
            ...body,
            received_at: new Date().toISOString()
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error receiving confirmation webhook:", error);
        return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
    }
}

// Para permitir que el front consulte los mensajes
export async function GET() {
    return NextResponse.json({
        messages: confirmationMessages
    });
}
