import { NextResponse } from "next/server";
import { getWhatsAppQR } from "@/services/whatsapp/whatsapp.service";

export async function GET() {
    try {
        const data = await getWhatsAppQR();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: "QR error" },
            { status: 500 }
        );
    }
}
