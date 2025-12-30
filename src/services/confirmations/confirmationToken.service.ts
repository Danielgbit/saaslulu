import crypto from "crypto";
import { supabaseClient } from "@/lib/supabaseClient";

export async function getOrCreateConfirmationToken(
    appointmentId: string
) {
    // 1️⃣ Buscar token activo existente
    const { data: existing } = await supabaseClient
        .from("appointment_confirmations")
        .select("token, expires_at")
        .eq("appointment_id", appointmentId)
        .eq("used", false)
        .maybeSingle();

    if (existing) {
        // si existe y NO ha expirado → reutilizar
        if (new Date(existing.expires_at) > new Date()) {
            return existing.token;
        }

        // si existe pero expiró → marcar como usado
        await supabaseClient
            .from("appointment_confirmations")
            .update({ used: true })
            .eq("appointment_id", appointmentId)
            .eq("used", false);
    }

    // 2️⃣ Crear nuevo token
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
