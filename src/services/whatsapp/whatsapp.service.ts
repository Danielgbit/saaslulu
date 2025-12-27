// SOLO USADO EN SERVER (route.ts, server actions)

const BASE_URL = process.env.BAILEYS_API_URL!;
const API_KEY = process.env.BAILEYS_API_KEY;

function authHeaders(): HeadersInit {
    const headers: HeadersInit = {};
    if (API_KEY) {
        headers["Authorization"] = `Bearer ${API_KEY}`;
    }
    return headers;
}

export async function isWhatsAppConnected(): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/health`, {
        headers: authHeaders(),
        cache: "no-store"
    });

    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.whatsappConnected);
}

export async function sendWhatsApp(phone: string, message: string) {
    const res = await fetch(`${BASE_URL}/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify({ phone, message })
    });

    if (!res.ok) {
        throw new Error("Error enviando WhatsApp");
    }
}

export async function logoutWhatsApp() {
    const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: authHeaders()
    });

    if (!res.ok) {
        throw new Error("Logout error");
    }
}

export async function getWhatsAppQR() {
    const res = await fetch(`${BASE_URL}/qr`, {
        headers: authHeaders(),
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("QR error");
    }

    return res.json();
}
