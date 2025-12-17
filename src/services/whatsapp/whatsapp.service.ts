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
