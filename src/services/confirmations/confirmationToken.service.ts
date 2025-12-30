// src/services/confirmations/confirmationToken.service.ts
import crypto from "crypto";
import { supabaseClient } from "@/lib/supabaseClient";

export async function createConfirmationToken(appointmentId: string) {
    const token = crypto.randomBytes(32).toString("hex");

    const { error } = await supabaseClient
        .from("appointment_confirmations")
        .insert({
            appointment_id: appointmentId,
            token,
            used: false,
            expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
        });

    if (error) {
        console.error("❌ Error creating confirmation token", error);
        throw new Error("No se pudo generar el token de confirmación");
    }

    return token;
}
