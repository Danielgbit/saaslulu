//src/app/api/confirmations/confirm/route.ts

import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: "Token requerido" },
                { status: 400 }
            );
        }

        // 1️⃣ Buscar token
        const { data: record, error } = await supabaseClient
            .from("appointment_confirmations")
            .select("*")
            .eq("token", token)
            .eq("used", false)
            .single();

        if (error || !record) {
            return NextResponse.json(
                { error: "Enlace inválido o ya utilizado" },
                { status: 400 }
            );
        }

        // 2️⃣ Verificar expiración
        if (new Date(record.expires_at) < new Date()) {
            return NextResponse.json(
                { error: "Este enlace ha expirado" },
                { status: 400 }
            );
        }

        // 3️⃣ Confirmar cita + marcar token como usado
        const { error: txError } = await supabaseClient.rpc(
            "confirm_appointment_with_token",
            {
                p_appointment_id: record.appointment_id,
                p_token_id: record.id
            }
        );

        if (txError) {
            throw txError;
        }

        return NextResponse.json({ ok: true });

    } catch (err: any) {
        console.error("❌ Error confirmando cita", err);

        return NextResponse.json(
            { error: "No se pudo confirmar la cita" },
            { status: 500 }
        );
    }
}
