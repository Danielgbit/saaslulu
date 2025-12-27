import { NextResponse } from "next/server";
import { logoutWhatsApp } from "@/services/whatsapp/whatsapp.service";

export async function POST() {
    try {
        await logoutWhatsApp();
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json(
            { error: "Logout error" },
            { status: 500 }
        );
    }
}
