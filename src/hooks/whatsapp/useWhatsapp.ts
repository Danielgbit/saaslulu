"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function useWhatsApp() {
    const [qr, setQr] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await fetch("/api/whatsapp/qr");
            if (!res.ok) return;

            const data = await res.json();

            if (data.qr) {
                const img = await QRCode.toDataURL(data.qr);
                setQr(img);
                setConnected(false);
            } else {
                setQr(null);
                setConnected(true);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return {
        qr,
        connected,
        logout: async () => {
            await fetch("/api/whatsapp/logout", { method: "POST" });
        }
    };
}
