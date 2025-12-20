// src/services/whatsapp.service.ts
export async function getWhatsAppQR() {
    const res = await fetch('/api/whatsapp/qr')
    if (!res.ok) throw new Error('QR error')
    return res.json()
}

export async function logoutWhatsApp() {
    const res = await fetch('/api/whatsapp/logout', {
        method: 'POST'
    })
    if (!res.ok) throw new Error('Logout error')
}


export async function isWhatsAppConnected(): Promise<boolean> {
    const res = await fetch(
        `${process.env.BAILEYS_API_URL}/health`,
        {
            headers: {
                Authorization: `Bearer ${process.env.BAILEYS_API_KEY}`
            },
            cache: "no-store"
        }
    );

    if (!res.ok) return false;

    const data = await res.json();
    return Boolean(data.whatsappConnected);
}
