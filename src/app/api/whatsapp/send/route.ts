import { NextRequest, NextResponse } from "next/server";
import { createWhatsAppClient } from "@/lib/whatsapp";

export const runtime = "nodejs"; // importante para permitir fs interno

export async function POST(req: NextRequest) {
    const { phone, message } = await req.json();

    const sock = await createWhatsAppClient(); // ← NECESARIO

    const jid = phone.replace(/\D/g, "") + "@s.whatsapp.net";

    await sock.sendMessage(jid, { text: message });

    return NextResponse.json({ success: true });
}
