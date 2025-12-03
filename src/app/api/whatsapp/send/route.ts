import { NextRequest, NextResponse } from "next/server";
import { createWhatsAppClient } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
    const { phone, message } = await req.json();

    const sock = createWhatsAppClient();
    const jid = phone.replace(/\D/g, "") + "@s.whatsapp.net";

    await sock.sendMessage(jid, { text: message });

    return NextResponse.json({ success: true });
}
