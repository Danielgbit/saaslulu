"use client"

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { getWhatsAppQR, logoutWhatsApp } from '@/services/whatsapp/whatsapp.service'

export function useWhatsApp() {
    const [qr, setQr] = useState<string | null>(null)
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await getWhatsAppQR()

            if (data.qr) {
                const img = await QRCode.toDataURL(data.qr)
                setQr(img)
                setConnected(false)
            } else {
                setQr(null)
                setConnected(true)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return {
        qr,
        connected,
        logout: logoutWhatsApp
    }
}
